'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { analyzeReviewAction } from '@/app/actions';
import { ReviewForm } from '@/components/review-form';
import { ReviewList } from '@/components/review-list';
import { SentimentChart } from '@/components/sentiment-chart';
import type { AnalyzedReview } from '@/lib/types';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  review: z.string().min(10).max(500),
});

export default function Home() {
  const [reviews, setReviews] = useState<AnalyzedReview[]>([]);
  const { toast } = useToast();

  const handleReviewSubmit = async (values: z.infer<typeof formSchema>): Promise<boolean> => {
    const result = await analyzeReviewAction(values.review);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: result.error,
      });
      return false;
    } 
    
    if (result.data) {
      setReviews((prevReviews) => [result.data!, ...prevReviews]);
      return true;
    }
    
    return false;
  };

  return (
    <>
      <main className="min-h-screen w-full font-body">
        <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl font-headline">
                  Review Analyzer
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                  Get real-time sentiment analysis on your product reviews using GenAI.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col gap-8 sticky top-8">
              <ReviewForm onFormSubmit={handleReviewSubmit} />
              <SentimentChart reviews={reviews} />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-bold tracking-tight">Recent Reviews</h2>
                <span className="text-sm text-muted-foreground">{reviews.length} review(s)</span>
              </div>
              <Separator />
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
