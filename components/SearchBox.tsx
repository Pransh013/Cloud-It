"use client";

import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { Thumbnail } from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import useDebounce from "@/hooks/use-debounce";

export function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const searchQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files!.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClick = (file: Models.Document) => {
    setOpen(false);
    setResults([]);
    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };

  return (
    <div className="relative w-full flex-1 sm:ml-auto sm:w-auto">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <SidebarInput
        id="search"
        placeholder="Type to search..."
        className="h-9 pl-7"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />

      {open && (
        <ul className="search-result">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                className="flex items-center justify-between"
                key={file.$id}
                onClick={() => handleClick(file)}
              >
                <div className="flex cursor-pointer items-center gap-3">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="size-7 min-w-7"
                    imageClassName="size-7"
                  />
                  <div>
                    <p className="text-sm line-clamp-1 font-semibold">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="line-clamp-1 text-xs"
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="empty-result">No files found</p>
          )}
        </ul>
      )}
    </div>
  );
}
