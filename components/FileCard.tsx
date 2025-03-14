import Link from "next/link";
import { Models } from "node-appwrite";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionsDropdown from "./ActionsDropdown";
import { Thumbnail } from "./Thumbnail";

const FileCard = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer bg-muted flex-col w-72 gap-6 p-5 shadow-[0_4px_30px] shadow-muted-foreground/35 dark:shadow-muted-foreground/10 rounded-2xl hover:shadow-none transition-all"
    >
      <div className="flex justify-between items-center">
        <Thumbnail
          extension={file.extension}
          type={file.type}
          url={file.url}
          className="!size-16"
        />

        <div className="flex flex-col justify-between gap-6 items-end">
          <ActionsDropdown file={file} />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="line-clamp-1 font-medium">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="text-sm" />
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default FileCard;
