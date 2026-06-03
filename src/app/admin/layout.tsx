import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import { AdminNavbar } from "@/components/admin/navbar/AdminNavbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/providers/SidebarProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SidebarProvider>
        {/* التعديل هنا: ضفنا كلاس admin-theme عشان نعزل ألوان الداشبورد عن الموقع */}
        <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
          {" "}
          <AdminSidebar />
          {/* في الموبايل الهامش صفر
            في الديسكتوب الهامش ثابت على حجم الأيقونات (24) 
            عشان القائمة لما تتمدد تعمل Overlay فوق المحتوى
          */}
          <div className="flex-1 flex flex-col transition-all duration-300 ml-0 lg:ml-24 w-full">
            <AdminNavbar />

            <main className="flex-1 p-4 md:p-8 pt-0 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
