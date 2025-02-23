import { Models } from "node-appwrite";

const FileCard = ({ file }: { file: Models.Document }) => {
  return <div>{file.name}</div>;
};

export default FileCard;
