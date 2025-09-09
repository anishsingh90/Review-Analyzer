import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-review-sentiment.ts';
import '@/ai/flows/suggest-improved-review.ts';
import '@/ai/flows/summarize-review-trends.ts';