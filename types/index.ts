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
