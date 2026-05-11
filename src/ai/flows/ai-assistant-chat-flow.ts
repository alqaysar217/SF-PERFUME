'use server';
/**
 * @fileOverview An AI assistant flow for the Siraj Platform.
 *
 * - aiAssistantChat - A function that handles user queries for the AI assistant.
 * - AiAssistantChatInput - The input type for the aiAssistantChat function.
 * - AiAssistantChatOutput - The return type for the aiAssistantChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the AI assistant chat
const AiAssistantChatInputSchema = z.object({
  query: z.string().describe('The user\'s question or message to the AI assistant.'),
});
export type AiAssistantChatInput = z.infer<typeof AiAssistantChatInputSchema>;

// Output schema for the AI assistant chat
const AiAssistantChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the user\'s query.'),
});
export type AiAssistantChatOutput = z.infer<typeof AiAssistantChatOutputSchema>;

// Wrapper function to call the AI assistant chat flow
export async function aiAssistantChat(input: AiAssistantChatInput): Promise<AiAssistantChatOutput> {
  return aiAssistantChatFlow(input);
}

// Define the prompt for the AI assistant
const aiAssistantChatPrompt = ai.definePrompt({
  name: 'aiAssistantChatPrompt',
  input: {schema: AiAssistantChatInputSchema},
  output: {schema: AiAssistantChatOutputSchema},
  prompt: `You are Siraj AI Assistant, a helpful, smart, and fast assistant for the Siraj educational platform.
Your purpose is to assist users with questions related to the Siraj Platform.
You should provide clear, concise, and accurate answers based on the information available on the platform.

Here are the types of questions you can answer:
- How to make payments for courses or books.
- How to purchase a course.
- How to obtain a certificate after completing a course.
- How to purchase educational books.
- Guidance on choosing the right specialization or learning path.
- Answering common frequently asked questions (FAQs) about the platform.
- Suggesting suitable educational paths and courses.

Always be helpful and professional. Your response should directly answer the user's query.

User's Query: {{{query}}}`,
});

// Define the Genkit flow for the AI assistant chat
const aiAssistantChatFlow = ai.defineFlow(
  {
    name: 'aiAssistantChatFlow',
    inputSchema: AiAssistantChatInputSchema,
    outputSchema: AiAssistantChatOutputSchema,
  },
  async (input) => {
    const {output} = await aiAssistantChatPrompt(input);
    return output!;
  }
);
