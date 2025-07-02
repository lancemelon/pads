import * as React from "react";
import { SquareTerminal } from "lucide-react";
import { useState } from "react";

import { NavMain } from "@/components/app-sidebar/nav-main";
import { TeamSwitcher } from "@/components/app-sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import lessons from "../assets/pyLessons.json";
import topics from "../assets/topics.json";

// This is sample data.
// Migrate to either data base or seperate json file
const data = {
  // TODO - Add Users
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },

  // TODO - Add Different topics, Data Science, ML, Statistics, Linear Algebra, etc.
  topics: topics,

  // Items must me an array in format index: number, title: string, url: string (reference pyLessons.json)
  navMain: lessons.map((chapter, idx) => ({
    title: chapter.chapter,
    url: "#",
    icon: SquareTerminal,
    isActive: idx === 0,
    items: chapter.lessons,
  })),

  // TODO - Saved files feature
  // saved: [
  //   {
  //     name: "Hello World!",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "classes?",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Test.py",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

function AppSidebar({
  setCurLesson,
  curLesson,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFolder = (chapter: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [chapter]: !prev[chapter],
    }));
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* TODO: Change teams to topics (python, data science, etc.) */}
        <TeamSwitcher topics={data.topics} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          setCurLesson={setCurLesson}
          curLesson={curLesson}
        />
        {/* TODO: Change to saved files (later down the road) */}
        {/* <NavProjects projects={data.saved} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
