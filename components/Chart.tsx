"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";
import { TOTAL_STORAGE } from "@/config";

const Chart = ({ used = 0 }: { used: number }) => {
  const usedPercentage = calculatePercentage(used);
  const availableStorage =
    used > 0
      ? Math.floor(((TOTAL_STORAGE - used) / (1024 * 1024 * 1024)) * 100) / 100
      : 2;

  const chartData = [
    {
      name: "Used Storage",
      value: usedPercentage,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const chartConfig = {
    storage: {
      label: "Used Storage",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex items-center w-[450px] overflow-hidden">
      <CardContent className=" flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[225px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={(usedPercentage / 100) * 360}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {usedPercentage} %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of 2 GB Used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className=" px-2">
        <CardTitle className="text-2xl text-center">
          Available Storage
        </CardTitle>
        <CardDescription className=" text-center">
          {availableStorage} GB / 2 GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Chart;
