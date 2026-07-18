
'use server';
/**
 * @fileOverview AI Assistant Starter Flow
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StarterInputSchema = z.object({
  query: z.string(),
});

const StarterOutputSchema = z.object({
  response: z.string(),
});

export async function aiAssistantChat(input: {query: string}) {
  return { response: "أنا مستعد لمساعدتك في مشروعك الجديد!" };
}
