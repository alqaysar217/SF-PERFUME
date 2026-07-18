
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  size: string;
  category: 'men' | 'women' | 'watches';
  description: string;
  ingredients: string;
  projection: string;
  longevity: string;
  isOffer?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سوفاج إليكسير',
    brand: 'ديور',
    price: 550,
    oldPrice: 620,
    image: 'https://picsum.photos/seed/perfume1/600/800',
    size: '100 مل',
    category: 'men',
    description: 'عطر رجالي مركز جداً يجمع بين التوابل واللافندر والأخشاب الغنية.',
    ingredients: 'قرفة، جوزة الطيب، لافندر، خشب صندل، عرق سوس.',
    projection: 'قوي جداً',
    longevity: '12+ ساعة',
    isOffer: true
  },
  {
    id: '2',
    name: 'ليبري انتنس',
    brand: 'إيف سان لوران',
    price: 480,
    image: 'https://picsum.photos/seed/perfume2/600/800',
    size: '90 مل',
    category: 'women',
    description: 'عطر نسائي يجسد الحرية والأنوثة الطاغية بمزيج من اللافندر والياسمين.',
    ingredients: 'لافندر فرنسي، زهر البرتقال المغربي، أوركيد، فانيليا.',
    projection: 'متوسط إلى قوي',
    longevity: '8-10 ساعات'
  },
  {
    id: '3',
    name: 'أومبري ليذر',
    brand: 'توم فورد',
    price: 720,
    image: 'https://picsum.photos/seed/perfume3/600/800',
    size: '100 مل',
    category: 'men',
    description: 'عطر جلدي فاخر يعطي إحساساً بالعمق والغموض.',
    ingredients: 'جلد، هيل، ياسمين سامباك، طحلب البلوط، باتشولي.',
    projection: 'قوي',
    longevity: '10+ ساعات'
  },
  {
    id: '4',
    name: 'ساعة رولكس كوزموغراف',
    brand: 'رولكس',
    price: 45000,
    image: 'https://picsum.photos/seed/watch1/600/800',
    size: '40 ملم',
    category: 'watches',
    description: 'ساعة فاخرة من الفولاذ والذهب، تصميم كلاسيكي لا يتقادم.',
    ingredients: 'فولاذ 904L، ذهب 18 قيراط، زجاج ياقوتي.',
    projection: 'N/A',
    longevity: 'حركة أوتوماتيكية'
  },
  {
    id: '5',
    name: 'جادور',
    brand: 'ديور',
    price: 420,
    oldPrice: 490,
    image: 'https://picsum.photos/seed/perfume5/600/800',
    size: '75 مل',
    category: 'women',
    description: 'باقة زهرية متقنة تليق بالمرأة العصرية والفاخرة.',
    ingredients: 'ياسمين، يلنج يلنج، ورد دمشقي، مسك ريحي.',
    projection: 'ناعم',
    longevity: '6-8 ساعات',
    isOffer: true
  }
];

export const BRANDS = [
  { id: 'dior', name: 'ديور', logo: 'https://picsum.photos/seed/dior/200/200' },
  { id: 'ysl', name: 'إيف سان لوران', logo: 'https://picsum.photos/seed/ysl/200/200' },
  { id: 'tomford', name: 'توم فورد', logo: 'https://picsum.photos/seed/tf/200/200' },
  { id: 'rolex', name: 'رولكس', logo: 'https://picsum.photos/seed/rx/200/200' },
  { id: 'chanel', name: 'شانيل', logo: 'https://picsum.photos/seed/ch/200/200' }
];
