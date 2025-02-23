import FileCard from "@/components/FileCard";
import SortFiles from "@/components/SortFiles";
import { getFiles } from "@/lib/actions/file.actions";
import { SearchParamProps } from "@/types";
import { Models } from "node-appwrite";

const FileType = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
  return (
    <div className="border rounded-lg px-8 py-4">
      <section>
        <h1 className="capitalize text-3xl font-bold">{type}</h1>
        <div className="flex border-4 justify-between">
          <p>
            Total: <span>0MB</span>
          </p>
          <div className="flex">
            <p>Sort By:</p>
            <SortFiles />
          </div>
        </div>
      </section>

      {files!.total > 0 ? (
        <section>
          {files?.documents.map((file: Models.Document) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p>No files uploaded</p>
      )}
    </div>
  );
};

export default FileType;
