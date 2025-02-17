import {
  LifeBuoy,
  Send,
  LayoutDashboard,
  Images,
  Clapperboard,
  File,
  NotebookPen,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Images",
      url: "/images",
      icon: Images,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: File,
    },
    {
      title: "Videos",
      url: "/videos",
      icon: Clapperboard,
    },
    {
      title: "Others",
      url: "/others",
      icon: NotebookPen,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/",
      icon: Send,
    },
  ],
};
