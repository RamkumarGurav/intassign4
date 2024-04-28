import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-h-screen py-4 px-4">
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
      <div className="flex justify-end items-center mb-3">
        <Skeleton className="h-10 w-[350px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full mb-3" />
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className={`flex items-center justify-between gap-8 mb-10`}>
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-8 w-[32px] rounded-full" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-2 w-[120px]" />
          <Skeleton className="h-6 w-[50px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
      </div>
    </div>
  );
}
