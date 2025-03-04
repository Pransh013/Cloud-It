import { Models } from "node-appwrite";

export type UserSignupType = {
  fullName: string;
  email: string;
};

export type UploadFileType = {
  file: File;
  accountId: string;
  ownerId: string;
  path: string;
};

export type SearchParamProps = {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

type SegmentParams = {
  type?: string;
};

export type ActionType = {
  label: string;
  icon: string;
  value: string;
};

export type RenameFileType = {
  fileId: string;
  name: string;
  extension: string;
  path: string;
};

export type ShareFileType = {
  fileId: string;
  emails: string[];
  path: string;
};

export type DeleteFileType = {
  fileId: string;
  bucketFileId: string;
  path: string;
};

export type ShareFileProps = {
  file: Models.Document;
  emails: string[];
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => Promise<void>;
};

export type FileType = "document" | "image" | "video" | "audio" | "other";

export type GetFilesType = {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
};
