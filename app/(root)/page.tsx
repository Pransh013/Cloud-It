import ActionsDropdown from "@/components/ActionsDropdown";
import Chart from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalUsedSpace } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default async function Dashboard() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalUsedSpace(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);
  return (
    <div className="flex flex-col md:flex-row justify-between px-4 xl:px-36 py-6 w-full">
      <section>
        <Chart used={totalSpace!.used} />

        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-8 xl:grid-cols-2 xl:gap-7">
          {usageSummary.map((summary) => (
            <Link
              key={summary.title}
              href={summary.url}
              className="flex flex-col items-center justify-between rounded-lg px-4 py-4 transition-all hover:scale-105 bg-muted"
            >
              <div className="flex justify-between items-center w-full mb-2">
                <div className="size-12 bg-foreground border rounded-full flex items-center justify-center">
                  <summary.icon className="text-primary-foreground" />
                </div>
                <h4 className="text-sm font-medium">
                  {convertFileSize(summary.size) || 0}
                </h4>
              </div>
              <CardTitle className="text-center text-xl font-semibold">
                {summary.title}
              </CardTitle>
              <Separator className="my-2" />
              <CardDescription className="text-sm text-muted-foreground text-center">
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </CardDescription>
            </Link>
          ))}
        </ul>
      </section>

      <section className=" rounded-lg border space-y-5 py-5 px-4 h-fit ">
        <h2 className="text-center text-3xl font-semibold">
          Recent uploaded files
        </h2>
        {files!.documents.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {files?.documents.map((file) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3 border p-1.5 rounded-lg bg-muted"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                  className=" bg-muted"
                />
                <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium line-clamp-1 w-full sm:max-w-[200px] lg:max-w-[250px]">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionsDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="body-1 mt-10 text-center">
            No files uploaded
          </p>
        )}
      </section>
    </div>
  );
}
