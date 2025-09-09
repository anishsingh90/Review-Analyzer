import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import type { AnalyzedReview } from '@/lib/types';

export function ReviewCard({ review }: { review: AnalyzedReview }) {
  const sentimentInfo = {
    positive: {
      Icon: ThumbsUp,
      label: 'Positive',
      iconColor: 'hsl(var(--chart-1))',
      badge: <Badge className="border-chart-1 bg-chart-1/10 text-chart-1 hover:bg-chart-1/10" variant="outline">Confidence: {Math.round(review.confidence * 100)}%</Badge>
    },
    negative: {
      Icon: ThumbsDown,
      label: 'Negative',
      iconColor: 'hsl(var(--destructive))',
      badge: <Badge variant="destructive">Confidence: {Math.round(review.confidence * 100)}%</Badge>
    },
    neutral: {
      Icon: Meh,
      label: 'Neutral',
      iconColor: 'hsl(var(--muted-foreground))',
      badge: <Badge variant="secondary">Confidence: {Math.round(review.confidence * 100)}%</Badge>
    },
  }[review.sentiment];
  
  const { Icon, label, iconColor, badge } = sentimentInfo;

  return (
    <Card className="fade-in-up shadow-md animate-in">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 flex-shrink-0" style={{ color: iconColor }} />
            <CardTitle className="text-lg font-semibold">{label}</CardTitle>
          </div>
          {badge}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{review.reviewText}</p>
      </CardContent>
    </Card>
  );
}
