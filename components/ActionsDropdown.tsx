"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/config";
import { constructDownloadUrl } from "@/lib/utils";
import { ActionType } from "@/types";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import ActionModal from "./ActionModal";
import { getCurrentUser } from "@/lib/actions/user.actions";

const ActionsDropdown = ({ file }: { file: Models.Document }) => {
  const [action, setAction] = useState<ActionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableActions, setAvailableActions] =
    useState(actionsDropdownItems);

  useEffect(() => {
    const haveSharePermissions = async () => {
      const currentUser = await getCurrentUser();
      const isOwner = currentUser?.accountId === file.accountId;

      setAvailableActions((actions) =>
        actions.filter((action) => {
          if (
            action.value === "share" ||
            action.value === "rename" ||
            action.value === "delete"
          )
            return isOwner;
          return true;
        })
      );
    };
    haveSharePermissions();
  }, [file]);

  const handleActionClick = (item: ActionType) => {
    if (item.value === "download") return;
    setAction(item);
    setIsModalOpen(true);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="shad-no-focus">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel className="truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableActions.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className="cursor-pointer"
              onClick={() => handleActionClick(item)}
            >
              {item?.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={item.icon}
                    height={30}
                    width={30}
                    alt={item.label}
                  />
                  {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={item.icon}
                    height={30}
                    width={30}
                    alt={item.label}
                  />
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ActionModal
        action={action}
        file={file}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ActionsDropdown;
