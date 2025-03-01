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
import { renameFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

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
      share: () => {},
      delete: () => {},
    };

    const success = await actions[action.value as keyof typeof actions]()
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col gap-4">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="text-center">
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
        </AlertDialogHeader>
        {["rename", "delete", "share"].includes(action.value) && (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>
              {action.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionModal;
