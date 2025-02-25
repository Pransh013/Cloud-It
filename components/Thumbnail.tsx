import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Thumbnail = ({
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
    <figure className={cn("thumbnail border border-muted-foreground", className)}>
      <Image
        src={isImage ? url : getFileIcon(type, extension)}
        height={80}
        width={80}
        alt="thumbnail"
        className={cn(
          "size-10 object-contain",
          imageClassName,
          isImage && "thumbnail-image"
        )}
      />
    </figure>
  );
};

export default Thumbnail;
