import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { AdminNavbar } from "@/components/admin/navbar/AdminNavbar";
import { SidebarProvider } from "@/providers/SidebarProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="admin-wrapper flex min-h-screen bg-[#f6f6f9] dark:bg-[#181a1e] text-[#363949] dark:text-[#edeffd] overflow-x-hidden transition-colors duration-300">
        <AdminSidebar />

        <div className="flex-1 flex flex-col transition-all duration-300 ml-0 lg:ml-24 w-full">
          <AdminNavbar />

          <main className="flex-1 p-4 md:p-8 pt-0 w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
