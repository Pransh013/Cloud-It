"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const OTPModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendEmailOTP({ email });
    } catch (error) {
      console.log("Failed to resend OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
          </AlertDialogTitle>
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We've sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full gap-4 flex-col">
            <AlertDialogAction
              type="button"
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
            >
              Submit
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
            <div className="subtitle-2 mt-2 text-light-100 text-center">
              Didn't get a code?
              <Button
                onClick={handleResendOTP}
                type="button"
                variant="link"
                className="pl-1.5 text-brand"
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
