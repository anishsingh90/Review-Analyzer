// Summarize review trends.
'use server';
/**
 * @fileOverview Summarizes trends in customer reviews using GenAI.
 *
 * - summarizeReviewTrends - A function that summarizes customer review trends.
 * - SummarizeReviewTrendsInput - The input type for the summarizeReviewTrends function.
 * - SummarizeReviewTrendsOutput - The return type for the summarizeReviewTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReviewTrendsInputSchema = z.object({
  reviews: z.string().describe('The customer reviews to summarize.'),
  period: z.string().describe('The period over which to summarize the reviews (e.g., last week, last month).'),
});
export type SummarizeReviewTrendsInput = z.infer<typeof SummarizeReviewTrendsInputSchema>;

const SummarizeReviewTrendsOutputSchema = z.object({
  summary: z.string().describe('A summary of the trends in the customer reviews.'),
});
export type SummarizeReviewTrendsOutput = z.infer<typeof SummarizeReviewTrendsOutputSchema>;

export async function summarizeReviewTrends(input: SummarizeReviewTrendsInput): Promise<SummarizeReviewTrendsOutput> {
  return summarizeReviewTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReviewTrendsPrompt',
  input: {schema: SummarizeReviewTrendsInputSchema},
  output: {schema: SummarizeReviewTrendsOutputSchema},
  prompt: `You are an expert analyst specializing in summarizing customer reviews.

You will use the following information to summarize trends in customer reviews over a given period.

Reviews: {{{reviews}}}
Period: {{{period}}}

Respond with the summary.`,
});

const summarizeReviewTrendsFlow = ai.defineFlow(
  {
    name: 'summarizeReviewTrendsFlow',
    inputSchema: SummarizeReviewTrendsInputSchema,
    outputSchema: SummarizeReviewTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
