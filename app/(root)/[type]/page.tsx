import FileCard from "@/components/FileCard";
import SortFiles from "@/components/SortFiles";
import { getFiles } from "@/lib/actions/file.actions";
import { fileTypeParamsMap } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Models } from "node-appwrite";

const FileType = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = fileTypeParamsMap[type];
  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="w-full px-28 py-4">
      <section className="flex justify-between py-2">
        <h1 className="capitalize text-3xl font-bold">{type}</h1>
        <div className="flex items-center gap-2">
          <p className="flex-shrink-0">Sort By:</p>
          <SortFiles />
        </div>
      </section>

      {files!.total > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 mt-8 justify-items-center">
          {files?.documents.map((file: Models.Document) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="text-center text-3xl mt-4 ">No files uploaded</p>
      )}
    </div>
  );
};

export default FileType;
