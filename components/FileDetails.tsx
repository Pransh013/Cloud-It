import { Models } from "node-appwrite";
import { ImageThumbnail } from "./Thumbnail";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { X } from "lucide-react";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-left text-sm text-foreground">
    <p className=" w-[30%] leading-7">{label}</p>
    <p className="flex-1 leading-7 font-semibold ">{value}</p>
  </div>
);
const FileDetails = ({ file, onClose }: { file: Models.Document; onClose: () => void }) => {
  return (
    <div className="space-y-1">
      <ImageThumbnail file={ file} />
      <div className="px-3 py-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
      <div className="absolute right-2 top-2">
        <X onClick={onClose} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default FileDetails;
