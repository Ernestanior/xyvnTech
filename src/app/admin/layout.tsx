// 管理后台布局 - 服务器端
import '../globals.css';
import AdminAuthWrapper from '@/components/admin/layout/AdminAuthWrapper';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthWrapper>
      {children}
    </AdminAuthWrapper>
  );
}
