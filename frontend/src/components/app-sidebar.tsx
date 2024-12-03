import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavProjects } from "@/components/app-sidebar/nav-projects";
import { NavUser } from "@/components/app-sidebar/nav-user";
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
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  topics: topics,

  // Items must me an array in format index: number, title: string, url: string (reference pyLessons.json)
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: lessons,
    },
    {
      title: "References",
      url: "#",
      icon: Bot,
      items: [],
    },
    {
      title: "Challenges",
      url: "#",
      icon: BookOpen,
      items: [],
    },
    {
      title: "FAQ's",
      url: "#",
      icon: Settings2,
      items: [],
    },
  ],
  saved: [
    {
      name: "Hello World!",
      url: "#",
      icon: Frame,
    },
    {
      name: "classes?",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Test.py",
      url: "#",
      icon: Map,
    },
  ],
};

function AppSidebar({
  setCurLesson,
  curLesson,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
        <NavProjects projects={data.saved} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
