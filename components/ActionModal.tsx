import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { actionDescriptions } from "@/config";
import { ActionType } from "@/types";
import { Input } from "./ui/input";
import { useState } from "react";
import { Models } from "node-appwrite";
import { deleteFile, renameFile, shareFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import FileDetails from "./FileDetails";
import ShareFile from "./ShareFile";
import Image from "next/image";

const ActionModal = ({
  action,
  file,
  isOpen,
  onClose,
}: {
  action: ActionType | null;
  file: Models.Document;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!action) return null;
  const [fileName, setFileName] = useState<string>(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>(file.users);
  const [localEmails, setLocalEmails] = useState<string[]>([]);

  const path = usePathname();

  const handleAction = async () => {
    setIsLoading(true);
    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name: fileName,
          extension: file.extension,
          path,
        }),
      share: () => {
        setEmails((prev) => [...prev, ...localEmails]);
        return shareFile({
          fileId: file.$id,
          emails: [...emails, ...localEmails],
          path,
        });
      },
      delete: () =>
        deleteFile({
          fileId: file.$id,
          bucketFileId: file.bucketFileId,
          path,
        }),
    };

    await actions[action.value as keyof typeof actions]();
    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    const success = await shareFile({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });
    if (success) setEmails(updatedEmails);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col gap-4 w-96">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">
            {action.label}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {actionDescriptions[action.value]}
          </AlertDialogDescription>
          {action.value === "rename" && (
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="!mt-6"
            />
          )}
          {action.value === "details" && (
            <FileDetails file={file} onClose={onClose} />
          )}
          {action.value === "share" && (
            <ShareFile
              file={file}
              emails={emails}
              onInputChange={setLocalEmails}
              onRemove={handleRemoveUser}
            />
          )}

          {action.value === "delete" && (
            <p className="text-center text-sm">⚠️ Confirm File Deletion?</p>
          )}
        </AlertDialogHeader>
        {["rename", "delete", "share"].includes(action.value) && (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>
              {action.label}
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin ml-2"
                />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionModal;
