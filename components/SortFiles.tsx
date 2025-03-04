"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/config";
import { usePathname, useRouter } from "next/navigation";

const SortFiles = () => {
  const router = useRouter();
  const path = usePathname();
  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };
  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value} >
      <SelectTrigger>
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortFiles;
