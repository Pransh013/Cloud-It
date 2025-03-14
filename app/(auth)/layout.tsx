import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              {children}
              <div className="relative hidden bg-foreground md:flex flex-col items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex aspect-square size-12 items-center justify-center rounded-lg">
                    <Image
                      src="/assets/icons/logo-brand.svg"
                      alt="logo"
                      height={50}
                      width={50}
                    />
                  </div>
                  <span className="text-3xl font-medium text-primary-foreground">Cloud It</span>
                </div>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-primary-foreground">
                    Manage your files the best way
                  </h1>
                  <p className="text-muted-foreground">
                    This is a place where you can store all your documents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
