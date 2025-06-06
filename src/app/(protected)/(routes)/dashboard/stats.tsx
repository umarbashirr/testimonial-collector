import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  MessageSquareDotIcon,
  Star,
  VideoIcon,
} from "lucide-react";

type StatsType = {
  total: number;
  average: number;
  testimonialGrowth: number;
  ratingGrowth: number;
  textReviewCount: number; // count for current month
  textReviewGrowth: number; // percentage growth from last month
  videoReviewCount: number;
  videoReviewGrowth: number; // percentage growth from last month
};

export const Stats = ({ stats }: { stats: StatsType }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Testimonials
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">
              {stats.testimonialGrowth > 0 ? "+" : ""}
              {stats.testimonialGrowth.toFixed(0)}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.average.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">
              {stats.ratingGrowth > 0 ? "+" : ""}
              {stats.ratingGrowth.toFixed(1)}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Text Reviews</CardTitle>
          <MessageSquareDotIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.textReviewCount}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">
              {stats.textReviewGrowth > 0 ? "+" : ""}
              {stats.textReviewGrowth.toFixed(1)}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Video Reviews</CardTitle>
          <VideoIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.videoReviewCount}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-600">
              {stats.videoReviewGrowth > 0 ? "+" : ""}
              {stats.videoReviewGrowth.toFixed(1)}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
