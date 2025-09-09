'use server';

/**
 * @fileOverview Sentiment analysis flow for product reviews.
 *
 * - analyzeReviewSentiment - Analyzes the sentiment of a product review.
 * - AnalyzeReviewSentimentInput - The input type for the analyzeReviewSentiment function.
 * - AnalyzeReviewSentimentOutput - The return type for the analyzeReviewSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReviewSentimentInputSchema = z.object({
  reviewText: z.string().describe('The text content of the product review.'),
});

export type AnalyzeReviewSentimentInput = z.infer<
  typeof AnalyzeReviewSentimentInputSchema
>;

const AnalyzeReviewSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the review (positive, negative, or neutral).'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence score of the sentiment analysis, from 0 to 1.'),
});

export type AnalyzeReviewSentimentOutput = z.infer<
  typeof AnalyzeReviewSentimentOutputSchema
>;

export async function analyzeReviewSentiment(
  input: AnalyzeReviewSentimentInput
): Promise<AnalyzeReviewSentimentOutput> {
  return analyzeReviewSentimentFlow(input);
}

const analyzeReviewSentimentPrompt = ai.definePrompt({
  name: 'analyzeReviewSentimentPrompt',
  input: {schema: AnalyzeReviewSentimentInputSchema},
  output: {schema: AnalyzeReviewSentimentOutputSchema},
  prompt: `Analyze the sentiment of the following product review and determine if it is positive, negative, or neutral.\n\nReview: {{{reviewText}}}\n\nReturn the sentiment and a confidence score (0 to 1).`,
});

const analyzeReviewSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeReviewSentimentFlow',
    inputSchema: AnalyzeReviewSentimentInputSchema,
    outputSchema: AnalyzeReviewSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeReviewSentimentPrompt(input);
    return output!;
  }
);
