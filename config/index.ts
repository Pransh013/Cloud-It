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

export const documentExtensions = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "xls",
  "xlsx",
  "csv",
  "rtf",
  "ods",
  "ppt",
  "odp",
  "md",
  "html",
  "htm",
  "epub",
  "pages",
  "fig",
  "psd",
  "ai",
  "indd",
  "xd",
  "sketch",
  "afdesign",
  "afphoto",
  "afphoto",
];
export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "svg",
  "webp",
];
export const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
export const audioExtensions = ["mp3", "wav", "ogg", "flac"];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;