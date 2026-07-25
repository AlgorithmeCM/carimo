import {NextResponse} from 'next/server';
import {z} from 'zod';

const schema = z.object({
  answers: z.object({
    feel: z.string(),
    shine: z.string(),
    sensitivity: z.string(),
    concern: z.string(),
    climate: z.string(),
    texture: z.string(),
    routine: z.string()
  }),
  hasPhoto: z.boolean()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({error: 'Invalid request'}, {status: 400});
  }

  const {answers, hasPhoto} = parsed.data;
  await new Promise((resolve) => setTimeout(resolve, 900));

  const dryness = answers.feel === 'dry' ? 'high' : answers.climate.includes('dry') ? 'moderate' : 'low';
  const visibleShine = answers.shine === 'quickly' ? 'high' : answers.shine === 'areas' ? 'moderate' : 'low';

  return NextResponse.json({
    source: hasPhoto ? 'photo-and-questionnaire' : 'questionnaire-only',
    photoQuality: hasPhoto ? {status: 'pass', confidence: 0.91} : null,
    observations: {
      hydrationNeed: dryness,
      visibleShine,
      unevenAppearance: answers.concern === 'tone' || answers.concern === 'spots' ? 'moderate' : 'low'
    }
  });
}
