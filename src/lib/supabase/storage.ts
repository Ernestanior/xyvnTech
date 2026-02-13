// Supabase Storage 操作工具
import { createClient } from './client';

export const BUCKETS = {
  ARTICLE_IMAGES: 'article-images',
  MEDIA_LIBRARY: 'media-library',
  AVATARS: 'avatars',
} as const;

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string; path: string } | null> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    return false;
  }

  return true;
}

export async function listFiles(bucket: string, folder?: string) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('List error:', error);
    return [];
  }

  return data;
}

export function getPublicUrl(bucket: string, path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// 生成唯一文件名
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(`.${extension}`, '');
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 50);
  
  return `${sanitizedName}-${timestamp}-${random}.${extension}`;
}
