
'use server';
/**
 * @fileOverview AI Assistant for SF PERFUME
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StarterInputSchema = z.object({
  query: z.string(),
  context: z.string().optional(),
});

const StarterOutputSchema = z.object({
  response: z.string(),
});

export async function aiAssistantChat(input: {query: string, context?: string}) {
  // استخدام Genkit للرد بناءً على سياق المنتجات المتاحة
  const prompt = `أنت مساعد ذكي لمتجر SF PERFUME المتخصص في العطور الفاخرة والساعات في اليمن، حضرموت.
  مهمتك هي مساعدة العملاء في اختيار المنتجات المناسبة.
  
  قائمة المنتجات المتاحة حالياً:
  ${input.context || 'لا توجد بيانات حالية'}
  
  أجب باحترافية وبلهجة ودودة. إذا سألك العميل عن عطر، حاول ترشيح شيء من القائمة أعلاه إذا كان مناسباً.
  سؤال العميل: ${input.query}`;

  try {
    const { text } = await ai.generate(prompt);
    return { response: text || "أنا هنا لمساعدتك في اختيار عطرك المفضل!" };
  } catch (error) {
    return { response: "أنا جاهز لمساعدتك في متجر SF PERFUME، كيف يمكنني خدمتك؟" };
  }
}
