import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isLoading: boolean;
  loadingText?: string;
  iconRight?: boolean;
  children: React.ReactNode;
  className?: string; // Add the className prop to the Props type
};

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  iconRight = true,
  className, // Use the className prop here
  ...rest
}: Props) {
  return iconRight ? (
    <Button
      type="submit"
      className={className} // Use the passed className
      disabled={isLoading ? true : false}
      {...rest}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loadingText ? loadingText : children}
    </Button>
  ) : (
    <Button disabled={isLoading ? true : false} {...rest}>
      {loadingText ? loadingText : children}
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
