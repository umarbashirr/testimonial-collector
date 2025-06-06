import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, BarChart3, Link2, Mail, Plus } from "lucide-react";

export const DashboardQuickActions = ({}) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create New Campaign
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Send Testimonial Request
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Link2 className="mr-2 h-4 w-4" />
          Generate Widget Code
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Activity className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
};
