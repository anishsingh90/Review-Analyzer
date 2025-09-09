'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { AnalyzedReview } from '@/lib/types';
import { useMemo } from 'react';
import { Pie, PieChart, Cell } from 'recharts';

type SentimentChartProps = {
  reviews: AnalyzedReview[];
};

export function SentimentChart({ reviews }: SentimentChartProps) {
  const sentimentCounts = useMemo(() => {
    return reviews.reduce(
      (acc, review) => {
        acc[review.sentiment]++;
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );
  }, [reviews]);

  const chartData = [
    { name: 'positive', value: sentimentCounts.positive, fill: 'hsl(var(--chart-1))' },
    { name: 'neutral', value: sentimentCounts.neutral, fill: 'hsl(var(--chart-2))' },
    { name: 'negative', value: sentimentCounts.negative, fill: 'hsl(var(--chart-3))' },
  ].filter(d => d.value > 0);

  const chartConfig = {
    positive: { label: "Positive", color: "hsl(var(--chart-1))" },
    neutral: { label: "Neutral", color: "hsl(var(--chart-2))" },
    negative: { label: "Negative", color: "hsl(var(--chart-3))" },
  };

  const totalReviews = reviews.length;

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle>Sentiment Breakdown</CardTitle>
        <CardDescription>
          Live analysis of {totalReviews} review{totalReviews === 1 ? '' : 's'}.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          {totalReviews > 0 ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                strokeWidth={2}
                labelLine={false}
              >
                  {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} className="focus:outline-none" />
                  ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                Submit a review to see data
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
