import {
  LifeBuoy,
  Send,
  LayoutDashboard,
  Images,
  Clapperboard,
  File,
  NotebookPen,
} from "lucide-react";

export const sidebarData = {
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
      title: "Media",
      url: "/media",
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

export const TOTAL_STORAGE = 2 * 1024 * 1024 * 1024;

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const actionDescriptions: Record<string, string> = {
  rename:
    "Changing the file name will update how it appears in your records. This action will not affect the file’s content.",
  share:
    "Sharing this file will grant others access based on the selected permissions. You can modify or revoke access at any time.",
  delete:
    "Are you sure you want to delete this file? This action cannot be undone.",
};

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Date Created (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/images": "Images",
  "/media": "Media",
  "/documents": "Documents",
  "/others": "Others",
};
