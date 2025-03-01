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

  const handleAction = async () => {};

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
