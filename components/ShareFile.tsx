import { ShareFileProps } from "@/types";
import { ImageThumbnail } from "./Thumbnail";
import { Input } from "./ui/input";
import { X } from "lucide-react";

const ShareFile = ({
  file,
  emails,
  onInputChange,
  onRemove,
}: ShareFileProps) => {
  
  return (
    <div>
      <ImageThumbnail file={file} />
      <div className="text-center py-2 space-y-2">
        <Input
          type="email"
          placeholder="Enter emails"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="h-10"
        />
        <div className="flex justify-between">
          <p className="text-sm font-light">Shared with</p>
          <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
            {file.users.length} users
          </p>
        </div>
        <ul className="space-y-2">
          {emails.map((email: string) => (
            <li key={email} className="flex justify-between items-center">
              <p className="text-base font-medium">{email}</p>
              <X
                className="cursor-pointer"
                size={18}
                onClick={() => onRemove(email)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShareFile;
