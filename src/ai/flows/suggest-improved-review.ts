'use server';

/**
 * @fileOverview An AI agent that suggests improvements to a negative review.
 *
 * - suggestImprovedReview - A function that suggests improvements to a negative review.
 * - SuggestImprovedReviewInput - The input type for the suggestImprovedReview function.
 * - SuggestImprovedReviewOutput - The return type for the suggestImprovedReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovedReviewInputSchema = z.object({
  reviewText: z
    .string()
    .describe('The text content of the negative product review.'),
});
export type SuggestImprovedReviewInput = z.infer<typeof SuggestImprovedReviewInputSchema>;

const SuggestImprovedReviewOutputSchema = z.object({
  improvedReview: z
    .string()
    .describe(
      'A suggestion for an improved version of the review, made more constructive and specific.'
    ),
});
export type SuggestImprovedReviewOutput = z.infer<typeof SuggestImprovedReviewOutputSchema>;

export async function suggestImprovedReview(
  input: SuggestImprovedReviewInput
): Promise<SuggestImprovedReviewOutput> {
  return suggestImprovedReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovedReviewPrompt',
  input: {schema: SuggestImprovedReviewInputSchema},
  output: {schema: SuggestImprovedReviewOutputSchema},
  prompt: `You are an AI assistant specializing in refining product reviews.

  A user has submitted a negative review, and your task is to suggest improvements to the review,
  making it more constructive and specific. Focus on providing actionable feedback that can help the
  product team understand the user's concerns better. Do not change the sentiment of the review.

  Original Review: {{{reviewText}}}

  Improved Review Suggestion:`,
});

const suggestImprovedReviewFlow = ai.defineFlow(
  {
    name: 'suggestImprovedReviewFlow',
    inputSchema: SuggestImprovedReviewInputSchema,
    outputSchema: SuggestImprovedReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
