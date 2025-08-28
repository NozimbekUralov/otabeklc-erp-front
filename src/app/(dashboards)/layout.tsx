import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <header className="sticky top-2 rounded-md z-50 w-full flex justify-between items-center p-4">
            <SidebarTrigger size={'lg'} />
            <UserAvatar />
          </header>
          {children}
        </div>
      </SidebarProvider>
    </main >
  );
}
