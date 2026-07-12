import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StatsCardSkeleton = () => {
  return (
    <Card className="h-28">
      <CardContent className="p-5 flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>

        <Skeleton className="h-12 w-12 rounded-lg" />
      </CardContent>
    </Card>
  );
};