"use client";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/config";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  return (
    <Sidebar variant="inset" className="bg-sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex gap-4">
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg">
                  <Image
                    src="/assets/icons/logo-brand.svg"
                    alt="logo"
                    height={50}
                    width={50}
                  />
                </div>
                <span className="text-2xl font-medium">Cloud It</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser fullName={fullName} email={email} />
      </SidebarFooter>
    </Sidebar>
  );
}
