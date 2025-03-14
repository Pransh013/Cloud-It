"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { convertFileToUrl, getFileTypeAndExtension } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { MAX_FILE_SIZE } from "@/config";
import { toast } from "sonner";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { Thumbnail } from "./Thumbnail";

const FileUploader = ({
  ownerId,
  accountId,
}: {
  ownerId: string;
  accountId: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const path = usePathname();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.name !== file.name)
          );

          return toast.error(`${file.name} is too large.`, {
            description: "Max file size is 50MB",
          });
        }

        return uploadFile({ file, accountId, ownerId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((_file) => _file.name !== file.name)
              );
            }
          }
        );
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button">
        <Upload />
        <p className="hidden lg:block">Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-2xl border p-5 border-neutral-300">
          <h4 className="text-lg">Uploading</h4>
          {files.map((file, idx) => {
            const { extension, type } = getFileTypeAndExtension(file.name);
            return (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between gap-3 bg-muted rounded-xl px-3 py-2"
              >
                <div className="flex items-center gap-4">
                  <Thumbnail
                    url={convertFileToUrl(file)}
                    type={type}
                    extension={extension}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <ProgressBar />
                  </div>
                </div>
                <X
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  className="cursor-pointer"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
