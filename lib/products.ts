export type Concern = 'dryness' | 'dullness' | 'tone' | 'spots' | 'blemishes' | 'shine' | 'lines' | 'maintenance';
export type RoutineStep = 'cleanse' | 'target' | 'hydrate' | 'protect' | 'ritual';

export type Product = {
  id: string;
  name: string;
  price: number;
  url: string;
  step: RoutineStep;
  concerns: Concern[];
  climate: string[];
  inStock: boolean;
  accent: string;
  initials: string;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 'micellar',
    name: 'Eau Micellaire CARIMO',
    price: 7.6,
    url: 'https://www.carimoempire.com/eau-micellaire/',
    step: 'cleanse',
    concerns: ['dryness', 'dullness', 'tone', 'maintenance', 'blemishes'],
    climate: ['hot-humid', 'hot-dry', 'air-conditioned', 'sun'],
    inStock: true,
    accent: 'from-rose-100 to-rose-300',
    initials: 'EM',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2024/12/ChatGPT-Image-Jun-27-2026-03_24_31-PM-440x440.png'
  },
  {
    id: 'nature-face',
    name: 'Crème Visage CARIMO Nature',
    price: 3.04,
    url: 'https://www.carimoempire.com/creme-visage-hydratante-nature-carimo-creme/',
    step: 'hydrate',
    concerns: ['dryness', 'dullness', 'maintenance'],
    climate: ['hot-dry', 'air-conditioned', 'mild', 'cold-dry'],
    inStock: true,
    accent: 'from-emerald-100 to-amber-100',
    initials: 'CN',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2023/05/Professional_product_photography_of_this_202605131322-440x440.jpeg'
  },
  {
    id: 'eclat-face',
    name: 'Crème Visage CARIMO Éclat',
    price: 4.56,
    url: 'https://www.carimoempire.com/creme-visage-eclat-clarifiant-carimo-soin-jour-nuit/',
    step: 'target',
    concerns: ['dullness', 'tone', 'dryness'],
    climate: ['hot-dry', 'air-conditioned', 'mild'],
    inStock: true,
    accent: 'from-amber-100 to-yellow-300',
    initials: 'CE',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2023/05/Professional_product_photography_of_this_202605131322-1-440x440.jpeg'
  },
  {
    id: 'sun',
    name: 'Crème Solaire CARIMO',
    price: 15.2,
    url: 'https://www.carimoempire.com/creme-solaire/',
    step: 'protect',
    concerns: ['tone', 'spots', 'dullness', 'maintenance', 'lines'],
    climate: ['hot-humid', 'hot-dry', 'sun', 'mild'],
    inStock: true,
    accent: 'from-orange-100 to-amber-300',
    initials: 'SP',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2024/12/ChatGPT-Image-Jun-27-2026-02_59_54-PM-440x440.png'
  },
  {
    id: '24k-face',
    name: 'Face Cream Teint d’Or 24K',
    price: 7.6,
    url: 'https://www.carimoempire.com/creme-visage-24k-carimo-creme-anti-age/',
    step: 'target',
    concerns: ['lines', 'dullness', 'tone', 'spots'],
    climate: ['air-conditioned', 'hot-dry', 'mild', 'cold-dry'],
    inStock: true,
    accent: 'from-yellow-100 to-yellow-400',
    initials: '24K',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2024/05/24k-gamme-4-352x440.png'
  },
  {
    id: 'anti-spot',
    name: 'Crème Anti-Tache CARIMO',
    price: 7.6,
    url: 'https://www.carimoempire.com/creme-anti-tache-visage-metisse-carimo-teint-uniforme-eclat/',
    step: 'target',
    concerns: ['spots', 'tone', 'blemishes'],
    climate: ['hot-humid', 'hot-dry', 'air-conditioned', 'sun'],
    inStock: true,
    accent: 'from-fuchsia-100 to-pink-300',
    initials: 'AT',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2023/05/Professional_product_photography_of_this_202605131458-440x440.jpeg'
  },
  {
    id: 'anti-acne',
    name: 'Crème Visage Anti Acné CARIMO',
    price: 7.6,
    url: 'https://www.carimoempire.com/creme-visage-anti-acnee-carimo-creme-anti-acne/',
    step: 'target',
    concerns: ['blemishes', 'shine'],
    climate: ['hot-humid', 'hot-dry'],
    inStock: false,
    accent: 'from-sky-100 to-cyan-300',
    initials: 'AA',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2023/05/Professional_product_photography_of_this_202605131406-440x440.jpeg'
  },
  {
    id: 'nature-range',
    name: 'Gamme CARIMO Nature',
    price: 31.92,
    url: 'https://www.carimoempire.com/game-carimo-nature/',
    step: 'ritual',
    concerns: ['dryness', 'dullness', 'maintenance'],
    climate: ['hot-dry', 'air-conditioned', 'mild', 'cold-dry'],
    inStock: true,
    accent: 'from-lime-100 to-emerald-300',
    initials: 'GN',
    imageUrl: 'https://www.carimoempire.com/wp-content/uploads/2024/07/Professional_product_photography_of_this_202605111700-440x440.jpeg'
  }
];
