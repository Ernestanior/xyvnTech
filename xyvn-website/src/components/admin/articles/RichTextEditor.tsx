'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const addImage = useCallback(() => {
    const url = window.prompt('图片 URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('链接 URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      {/* 工具栏 */}
      <div className="bg-gray-900 border-b border-gray-700 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          <s>S</s>
        </button>
        <div className="w-px bg-gray-600 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          H3
        </button>
        <div className="w-px bg-gray-600 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          • 列表
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          1. 列表
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          引用
        </button>
        <div className="w-px bg-gray-600 mx-1" />
        <button
          onClick={addImage}
          className="px-3 py-1 rounded text-gray-300 hover:bg-gray-700 transition-colors"
          type="button"
        >
          🖼️ 图片
        </button>
        <button
          onClick={addLink}
          className={`px-3 py-1 rounded transition-colors ${editor.isActive('link') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          type="button"
        >
          🔗 链接
        </button>
        <div className="w-px bg-gray-600 mx-1" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
          type="button"
        >
          ↶ 撤销
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
          type="button"
        >
          ↷ 重做
        </button>
      </div>

      {/* 编辑器内容 - 点击整个区域都能聚焦 */}
      <div 
        onClick={() => editor.chain().focus().run()}
        className="cursor-text"
      >
        <EditorContent
          editor={editor}
          className="prose prose-invert max-w-none p-4 min-h-[400px] focus:outline-none text-gray-200"
        />
      </div>
    </div>
  );
}
