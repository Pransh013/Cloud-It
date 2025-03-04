import { AppSidebar } from "@/components/AppSidebar";
import FileUploader from "@/components/FileUploader";
import { SearchForm } from "@/components/SearchBox";
import { ToggleTheme } from "@/components/ToggleTheme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
        <header className="flex h-16 shrink-0 justify-between items-center px-6 border-b">
          <div className="flex justify-between items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4 w-1/3">
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
