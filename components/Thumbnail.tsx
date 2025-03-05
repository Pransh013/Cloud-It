import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import FormattedDateTime from "./FormattedDateTime";
import { Models } from "node-appwrite";

export const Thumbnail = ({
  url = "",
  type,
  extension,
  className,
  imageClassName,
}: {
  url?: string;
  type: string;
  extension: string;
  className?: string;
  imageClassName?: string;
}) => {
  const isImage = type === "image" && extension !== "svg";
  return (
    <figure
      className={cn(
        "flex-center size-[50px] min-w-[50px] overflow-hidden rounded-full  ",
        className
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(type, extension)}
        height={80}
        width={80}
        alt="thumbnail"
        className={cn(
          "size-10 object-contain",
          imageClassName,
          isImage && "size-full object-cover object-center"
        )}
      />
    </figure>
  );
};

export const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail extension={file.extenstion} type={file.type} url={file.url} />
      <div>
        <p className="font-medium line-clamp-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};
