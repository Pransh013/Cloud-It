import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionsDropdown from "./ActionsDropdown";

const FileCard = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 p-5 shadow-[0_4px_30px] shadow-muted-foreground/35 dark:shadow-muted-foreground/10 border-2 rounded-2xl hover:shadow-none transition-all"
    >
      <div className="flex justify-between">
        <Thumbnail
          extension={file.extension}
          type={file.type}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col justify-between items-end">
          <ActionsDropdown file={file} />
          <p className="">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default FileCard;
