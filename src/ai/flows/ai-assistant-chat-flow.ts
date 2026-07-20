
'use server';
/**
 * @fileOverview AI Assistant for SF PERFUME
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export async function aiAssistantChat(input: {query: string}) {
  const prompt = `أنت مساعد ذكي لمتجر SF PERFUME المتخصص في العطور الفاخرة والساعات في اليمن.
  أجب باحترافية وبلهجة ودودة.
  سؤال العميل: ${input.query}`;

  try {
    const { text } = await ai.generate(prompt);
    return { response: text || "أنا هنا لمساعدتك في اختيار عطرك المفضل!" };
  } catch (error) {
    return { response: "أنا جاهز لمساعدتك في متجر SF PERFUME، كيف يمكنني خدمتك؟" };
  }
}
