import { cn, formatDateTime } from "@/lib/utils";

const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-gray-600 dark:text-gray-300", className)}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;
