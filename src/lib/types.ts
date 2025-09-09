import type { AnalyzeReviewSentimentOutput } from '@/ai/flows/analyze-review-sentiment';

export type AnalyzedReview = {
  id: string;
  reviewText: string;
} & AnalyzeReviewSentimentOutput;
