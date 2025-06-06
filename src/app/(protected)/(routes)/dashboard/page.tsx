import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { Zap } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "../forms/actions";
import { DashboardQuickActions } from "./dashboard-quick-actions";
import RecentTestimonials from "./recent-testimonials";
import { Stats } from "./stats";

const fetchFormsWithTestimonials = async (userId: string) => {
  const forms = await prisma.form.findMany({
    where: {
      userId,
    },
    include: {
      testimonials: true,
    },
  });

  return forms.map((form) => {
    const responseCount = form.isVideoForm
      ? form.testimonials.filter((t) => t.video && t.video.trim() !== "").length
      : form.testimonials.filter((t) => t.content && t.content.trim() !== "")
          .length;

    const total = form.testimonials.length;
    const responseRate =
      total > 0 ? Math.round((responseCount / total) * 100) : 0;
    const status = form.isActive ? "active" : "inactive";

    return { ...form, responseCount, responseRate, status };
  });
};

const fetchLatestTestimonials = async (userId: string) => {
  const reviews = await prisma.testimonial.findMany({
    where: {
      formRef: {
        userId,
      },
    },
    take: 3,
  });

  return reviews;
};

const fetchTestimonialStats = async (userId: string) => {
  // Current month
  const now = new Date();
  const startCurrent = startOfMonth(now);
  const endCurrent = endOfMonth(now);

  // Last month
  const lastMonth = subMonths(now, 1);
  const startLast = startOfMonth(lastMonth);
  const endLast = endOfMonth(lastMonth);

  // Current month stats
  const [currentCount, currentAvg] = await Promise.all([
    prisma.testimonial.count({
      where: {
        formRef: { userId },
        createdAt: { gte: startCurrent, lte: endCurrent },
      },
    }),
    prisma.testimonial.aggregate({
      _avg: { rating: true },
      where: {
        formRef: { userId },
        createdAt: { gte: startCurrent, lte: endCurrent },
      },
    }),
  ]);

  // Last month stats
  const [lastCount, lastAvg] = await Promise.all([
    prisma.testimonial.count({
      where: {
        formRef: { userId },
        createdAt: { gte: startLast, lte: endLast },
      },
    }),
    prisma.testimonial.aggregate({
      _avg: { rating: true },
      where: {
        formRef: { userId },
        createdAt: { gte: startLast, lte: endLast },
      },
    }),
  ]);

  // All time stats
  const [total, avg] = await Promise.all([
    prisma.testimonial.count({
      where: { formRef: { userId } },
    }),
    prisma.testimonial.aggregate({
      _avg: { rating: true },
      where: { formRef: { userId } },
    }),
  ]);

  // Text reviews (current and last month)
  const [currentTextCount, lastTextCount] = await Promise.all([
    prisma.testimonial.count({
      where: {
        formRef: { userId, isVideoForm: false },
        createdAt: { gte: startCurrent, lte: endCurrent },
      },
    }),
    prisma.testimonial.count({
      where: {
        formRef: { userId },
        createdAt: { gte: startLast, lte: endLast },
      },
    }),
  ]);

  // Video reviews (current and last month)
  const [currentVideoCount, lastVideoCount] = await Promise.all([
    prisma.testimonial.count({
      where: {
        formRef: { userId, isVideoForm: true },
        createdAt: { gte: startCurrent, lte: endCurrent },
      },
    }),
    prisma.testimonial.count({
      where: {
        formRef: { userId, isVideoForm: true },
        createdAt: { gte: startLast, lte: endLast },
      },
    }),
  ]);

  // Calculate growth as percentage
  const testimonialGrowth =
    lastCount === 0 ? 100 : ((currentCount - lastCount) / lastCount) * 100;
  const ratingGrowth =
    lastAvg._avg.rating === null ||
    lastAvg._avg.rating === 0 ||
    currentAvg._avg.rating === null
      ? 0
      : ((currentAvg._avg.rating - lastAvg._avg.rating) / lastAvg._avg.rating) *
        100;

  // Calculate text and video review growth as percentage
  const textReviewGrowth =
    lastTextCount === 0
      ? 100
      : ((currentTextCount - lastTextCount) / lastTextCount) * 100;
  const videoReviewGrowth =
    lastVideoCount === 0
      ? 100
      : ((currentVideoCount - lastVideoCount) / lastVideoCount) * 100;

  return {
    total,
    average: avg._avg.rating ?? 0,
    testimonialGrowth,
    ratingGrowth,
    textReviewCount: currentTextCount,
    textReviewGrowth,
    videoReviewCount: currentVideoCount,
    videoReviewGrowth,
  };
};

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin");
  }

  const testimonials = await fetchLatestTestimonials(user.id);
  const stats = await fetchTestimonialStats(user.id);
  const forms = await fetchFormsWithTestimonials(user.id);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <Stats stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity and Quick Actions */}
        <RecentTestimonials testimonials={testimonials} />
        <DashboardQuickActions />
      </div>

      {/* Form Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Form Insights</CardTitle>
          <CardDescription>
            Overview of your testimonial collection forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{form.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {form.testimonials.length} testimonials,{" "}
                      {form.responseCount} responses
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{form.responseRate}%</p>
                    <p className="text-xs text-muted-foreground">
                      Response Rate
                    </p>
                  </div>
                  <Badge
                    className="capitalize"
                    variant={form.status === "active" ? "default" : "secondary"}
                  >
                    {form.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
