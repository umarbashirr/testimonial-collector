"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import React from "react";

const campaigns = [
  {
    id: 1,
    name: "Product Launch",
    testimonials: 24,
    responses: 45,
    responseRate: 53,
    status: "active",
  },
  {
    id: 2,
    name: "Customer Success",
    testimonials: 18,
    responses: 32,
    responseRate: 56,
    status: "active",
  },
  {
    id: 3,
    name: "Feature Update",
    testimonials: 12,
    responses: 28,
    responseRate: 43,
    status: "paused",
  },
];

const CampaignsPageDetails = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Testimonial Forms</h3>
          <p className="text-sm text-muted-foreground">
            Manage your testimonial collection forms
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Testimonial Form
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge
                  variant={
                    campaign.status === "active" ? "default" : "secondary"
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{campaign.testimonials}</p>
                  <p className="text-xs text-muted-foreground">Testimonials</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{campaign.responses}</p>
                  <p className="text-xs text-muted-foreground">Responses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Response Rate</span>
                  <span>{campaign.responseRate}%</span>
                </div>
                <Progress value={campaign.responseRate} />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsPageDetails;
