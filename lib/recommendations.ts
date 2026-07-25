import {products, type Concern, type Product, type RoutineStep} from './products';

export type Answers = {
  feel: string;
  shine: string;
  sensitivity: string;
  concern: Concern;
  climate: string;
  texture: string;
  routine: 'essential' | 'complete' | 'ritual';
};

const tierSteps: Record<Answers['routine'], RoutineStep[]> = {
  essential: ['cleanse', 'hydrate', 'protect'],
  complete: ['cleanse', 'target', 'hydrate', 'protect'],
  ritual: ['cleanse', 'target', 'hydrate', 'protect', 'ritual']
};

function scoreProduct(product: Product, answers: Answers) {
  let score = 0;
  if (product.concerns.includes(answers.concern)) score += 50;
  if (product.climate.includes(answers.climate)) score += 22;
  if (answers.feel === 'dry' && product.concerns.includes('dryness')) score += 18;
  if ((answers.shine === 'quickly' || answers.shine === 'areas') && product.concerns.includes('shine')) score += 18;
  if (answers.sensitivity === 'frequent' && product.id === 'nature-face') score += 16;
  score += Math.max(0, 10 - product.price / 5);
  return score;
}

export function recommend(answers: Answers, tier: Answers['routine'] = answers.routine) {
  const selected: Product[] = [];
  for (const step of tierSteps[tier]) {
    const candidates = products
      .filter((product) => product.inStock && product.step === step && !selected.some((item) => item.id === product.id))
      .sort((a, b) => scoreProduct(b, answers) - scoreProduct(a, answers));
    if (candidates[0]) selected.push(candidates[0]);
  }
  return selected;
}
