export type UserSignupType = {
  fullName: string;
  email: string;
};

export type UploadFileType = {
  file: File;
  ownerId: string;
  accountId: string;
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
