'use server';

import { z } from 'zod';
import { analyzeReviewSentiment } from '@/ai/flows/analyze-review-sentiment';
import type { AnalyzedReview } from '@/lib/types';

const reviewSchema = z.object({
  review: z.string().min(10, { message: 'Review must be at least 10 characters long.' }).max(500, {message: 'Review must be 500 characters or less.'}),
});

export async function analyzeReviewAction(reviewText: string): Promise<{ data?: AnalyzedReview, error?: string }> {
  const validatedFields = reviewSchema.safeParse({ review: reviewText });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.review?.[0] || 'Invalid input.',
    };
  }
  
  try {
    const sentimentResult = await analyzeReviewSentiment({ reviewText: validatedFields.data.review });
    const newReview: AnalyzedReview = {
      id: new Date().toISOString() + Math.random(),
      reviewText: validatedFields.data.review,
      ...sentimentResult,
    };
    return { data: newReview };
  } catch (error) {
    console.error('Error analyzing review:', error);
    return { error: 'AI analysis failed. Please try again later.' };
  }
}
