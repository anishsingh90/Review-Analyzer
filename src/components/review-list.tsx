import type { AnalyzedReview } from '@/lib/types';
import { ReviewCard } from './review-card';

type ReviewListProps = {
  reviews: AnalyzedReview[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card py-20 text-center">
        <h3 className="text-lg font-semibold text-muted-foreground">No reviews yet</h3>
        <p className="mt-1 text-sm text-muted-foreground/80">Submit a review to see the sentiment analysis appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
