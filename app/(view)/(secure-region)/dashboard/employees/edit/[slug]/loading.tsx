import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-h-screen py-4 px-4">
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="grid sm:grid-cols-2 gap-8 gap-x-20 px-40 py-8">
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-20 mb-3" />
        <Skeleton className="h-10 w-20 mb-3" />
        <Skeleton className="h-10 w-20 mb-3" />
        <Skeleton className="h-10 w-full mb-3" />

        <Skeleton className="h-10 w-[300px] mb-3 mx-auto" />
      </div>
    </div>
  );
}
