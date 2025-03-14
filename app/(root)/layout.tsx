import { AppSidebar } from "@/components/AppSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import FileUploader from "@/components/FileUploader";
import { SearchForm } from "@/components/SearchBox";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar fullName={currentUser.fullName} email={currentUser.email} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-4 px-6 border-b">
          <div className="flex items-center gap-1 lg:gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <div className="flex items-center gap-4 w-3/4 md:w-1/2 xl:w-1/3">
            <SearchForm />
            <FileUploader
              ownerId={currentUser.$id}
              accountId={currentUser.accountId}
            />
            <ToggleTheme />
          </div>
        </header>
        <div className="flex flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
