import React, { useState } from "react";
import AppSidebar from "@/components/app-sidebar";
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
import WorkSpace from "@/components/workspace";

interface Crumb {
  title: string;
  url: string;
}

export default function Page() {
  let breadcrumbs: Crumb[] = [{ title: "Work Space", url: "#" }];
  const [curLesson, setCurLesson] = useState(0);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar setCurLesson={setCurLesson} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.length < 2 ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbs[0].title}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.title}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={crumb.url}>
                          {crumb.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <WorkSpace curLesson={curLesson} />
      </SidebarInset>
    </SidebarProvider>
  );
}
