import type { CafeEvent, CafeInfo, CafeValue, MenuItem, Testimonial } from '~/types/cafe'

export const cafeInfo: CafeInfo = {
  name: 'Solace',
  tagline: {
    en: 'Quiet specialty coffee for people who linger.',
    fa: 'قهوه تخصصی آرام برای کسانی که می‌مانند.',
  },
  address: '214 Mercer Street',
  city: 'Seattle, WA',
  hours: {
    en: [
      'Mon–Fri · 7:00–19:00',
      'Sat–Sun · 8:00–18:00',
    ],
    fa: [
      'دوشنبه تا جمعه · ۷:۰۰–۱۹:۰۰',
      'شنبه و یکشنبه · ۸:۰۰–۱۸:۰۰',
    ],
  },
  schedule: [
    {
      days: [1, 2, 3, 4, 5],
      open: '07:00',
      close: '19:00',
      label: { en: 'Mon–Fri', fa: 'دوشنبه تا جمعه' },
    },
    {
      days: [0, 6],
      open: '08:00',
      close: '18:00',
      label: { en: 'Sat–Sun', fa: 'شنبه و یکشنبه' },
    },
  ],
  phone: '+1 (206) 555-0192',
  email: 'hello@solace.coffee',
  instagram: '@solace.coffee',
  geo: {
    lat: 47.6245,
    lng: -122.3362,
  },
}

export const cafeValues: CafeValue[] = [
  {
    title: {
      en: 'Dialed in',
      fa: 'تنظیم‌شده',
    },
    description: {
      en: 'Every espresso recipe is logged, tasted, and adjusted through the day — not set and forgotten.',
      fa: 'هر دستور اسپرسو در طول روز ثبت، چشیده و تنظیم می‌شود — نه اینکه یک‌بار تنظیم شود و فراموش شود.',
    },
  },
  {
    title: {
      en: 'Short & seasonal',
      fa: 'کوتاه و فصلی',
    },
    description: {
      en: 'A focused menu so quality stays high. Food changes with the season; coffee rotates by lot.',
      fa: 'منویی متمرکز تا کیفیت بالا بماند. غذا با فصل عوض می‌شود؛ قهوه با هر لات می‌چرخد.',
    },
  },
  {
    title: {
      en: 'Room to breathe',
      fa: 'جا برای نفس‌کشیدن',
    },
    description: {
      en: 'Soft light, steady music, and tables meant for conversation — or none at all.',
      fa: 'نور نرم، موسیقی یکنواخت، و میزهایی برای گفت‌وگو — یا برای سکوت کامل.',
    },
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'maya',
    quote: {
      en: 'The pour-over feels like a small ritual. I come for the coffee and stay for the quiet.',
      fa: 'پورآور مثل یک آیین کوچک است. برای قهوه می‌آیم و برای آرامش می‌مانم.',
    },
    name: 'Maya R.',
    role: {
      en: 'Neighbor · Capitol Hill',
      fa: 'همسایه · کپیتال هیل',
    },
  },
  {
    id: 'jon',
    quote: {
      en: 'Best flat white in the neighborhood — and the staff actually remembers how you take it.',
      fa: 'بهترین فلت‌وایت محله — و پرسنل واقعاً یادشان می‌ماند چطور می‌خواهید.',
    },
    name: 'Jon K.',
    role: {
      en: 'Regular · mornings',
      fa: 'مشتری ثابت · صبح‌ها',
    },
  },
  {
    id: 'sara',
    quote: {
      en: 'We hosted a private cupping here. Calm room, sharp tasting notes, zero fuss.',
      fa: 'یک کاپینگ خصوصی اینجا برگزار کردیم. فضای آرام، یادداشت چشایی دقیق، بدون شلوغی.',
    },
    name: 'Sara L.',
    role: {
      en: 'Events guest',
      fa: 'مهمان رویداد',
    },
  },
]

export const cafeEvents: CafeEvent[] = [
  {
    id: 'saturday-cupping',
    title: {
      en: 'Saturday Cupping',
      fa: 'کاپینگ شنبه',
    },
    date: {
      en: 'Every Saturday',
      fa: 'هر شنبه',
    },
    time: '10:00',
    description: {
      en: 'Taste three current lots with our bar lead. Free with any brew bar drink.',
      fa: 'سه لات جاری را با سرآشپز بار بچشید. با هر نوشیدنی برو بار رایگان است.',
    },
    type: 'cupping',
    calendarWeekday: 6,
    durationMinutes: 90,
  },
  {
    id: 'milk-workshop',
    title: {
      en: 'Home Milk Texture Workshop',
      fa: 'کارگاه بافت شیر خانگی',
    },
    date: {
      en: 'First Friday monthly',
      fa: 'اولین جمعهٔ هر ماه',
    },
    time: '18:30',
    description: {
      en: 'Learn steaming and pouring basics on our training machines. Limited seats.',
      fa: 'بخاردهی و پورینگ پایه را روی دستگاه‌های آموزشی یاد بگیرید. ظرفیت محدود.',
    },
    type: 'workshop',
    calendarWeekday: 5,
    durationMinutes: 120,
  },
  {
    id: 'private-morning',
    title: {
      en: 'Private Morning Hire',
      fa: 'اجارهٔ خصوصی صبح',
    },
    date: {
      en: 'By request',
      fa: 'با هماهنگی',
    },
    time: '07:00–09:00',
    description: {
      en: 'Book the room before public hours for teams, tastings, or quiet kickoffs.',
      fa: 'فضا را پیش از ساعات عمومی برای تیم‌ها، چشیدن یا شروع‌های آرام رزرو کنید.',
    },
    type: 'private',
  },
]

export const menuItems: MenuItem[] = [
  {
    id: 'solace-espresso',
    name: {
      en: 'Solace Espresso',
      fa: 'اسپرسو سولِیس',
    },
    description: {
      en: 'Our house blend — cocoa, dried cherry, syrupy body.',
      fa: 'بلند خانه — کاکائو، گیلاس خشک، بدنهٔ شربتی.',
    },
    price: '$3.75',
    category: 'espresso',
    dietary: ['vegan', 'gf', 'dairy-free'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'oat-latte',
    name: {
      en: 'Oat Latte',
      fa: 'لاته جو دوسر',
    },
    description: {
      en: 'Double ristretto, steamed oat, microfoam finished by hand.',
      fa: 'دبل ریسترتو، شیر جو بخار داده، میکروفوم دستی.',
    },
    price: '$5.25',
    category: 'espresso',
    dietary: ['vegan', 'dairy-free'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'flat-white',
    name: {
      en: 'Flat White',
      fa: 'فلت‌وایت',
    },
    description: {
      en: 'Velvety milk over a concentrated double shot.',
      fa: 'شیر مخملی روی دبل شات غلیظ.',
    },
    price: '$4.75',
    category: 'espresso',
    dietary: ['vegetarian'],
  },
  {
    id: 'cortado',
    name: {
      en: 'Cortado',
      fa: 'کورتادو',
    },
    description: {
      en: 'Equal parts espresso and steamed milk in a small glass.',
      fa: 'اسپرسو و شیر بخار داده به نسبت برابر در لیوان کوچک.',
    },
    price: '$4.25',
    category: 'espresso',
    dietary: ['vegetarian'],
  },
  {
    id: 'pour-over',
    name: {
      en: 'Single-Origin Pour Over',
      fa: 'پورآور تک‌خاستگاه',
    },
    description: {
      en: 'Rotating microlot. Ask for today’s tasting card.',
      fa: 'میکرولات چرخشی. کارت چشایی امروز را بپرسید.',
    },
    price: '$6.00',
    category: 'brew',
    dietary: ['vegan', 'gf', 'dairy-free'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cold-brew',
    name: {
      en: 'Slow Cold Brew',
      fa: 'کلدبرو آرام',
    },
    description: {
      en: '20-hour steep, bright and low-acid, served over ice.',
      fa: 'خیساندن ۲۰ ساعته، روشن و کم‌اسید، روی یخ.',
    },
    price: '$4.75',
    category: 'brew',
    dietary: ['vegan', 'gf', 'dairy-free'],
  },
  {
    id: 'batch-filter',
    name: {
      en: 'Batch Filter',
      fa: 'فیلتر بچ',
    },
    description: {
      en: 'Clean house filter, brewed fresh every hour.',
      fa: 'فیلتر تمیز خانه، هر ساعت تازه دم.',
    },
    price: '$3.50',
    category: 'brew',
    dietary: ['vegan', 'gf', 'dairy-free'],
  },
  {
    id: 'tea',
    name: {
      en: 'Seasonal Tea',
      fa: 'چای فصلی',
    },
    description: {
      en: 'Loose-leaf selection from local importers.',
      fa: 'انتخاب برگ‌چای از واردکنندگان محلی.',
    },
    price: '$4.00',
    category: 'brew',
    dietary: ['vegan', 'gf', 'dairy-free'],
  },
  {
    id: 'sourdough',
    name: {
      en: 'Sourdough Toast',
      fa: 'تست خمیرترش',
    },
    description: {
      en: 'Cultured butter, flaky salt, rotating preserve.',
      fa: 'کره کشت‌شده، نمک پولکی، مربای چرخشی.',
    },
    price: '$7.00',
    category: 'food',
    dietary: ['vegetarian', 'nuts'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'granola',
    name: {
      en: 'House Granola Bowl',
      fa: 'کاسه گرانولای خانه',
    },
    description: {
      en: 'Greek yogurt, honey, toasted oats, and stone fruit.',
      fa: 'ماست یونانی، عسل، جو تست‌شده و میوهٔ هسته‌دار.',
    },
    price: '$9.50',
    category: 'food',
    dietary: ['vegetarian', 'nuts'],
  },
  {
    id: 'croissant',
    name: {
      en: 'Butter Croissant',
      fa: 'کروسان کره‌ای',
    },
    description: {
      en: 'Baked daily by our neighborhood bakery partner.',
      fa: 'هر روز توسط نانوایی شریک محله پخته می‌شود.',
    },
    price: '$4.50',
    category: 'food',
    dietary: ['vegetarian'],
  },
  {
    id: 'egg-sandwich',
    name: {
      en: 'Soft Egg Sandwich',
      fa: 'ساندویچ تخم‌مرغ نرم',
    },
    description: {
      en: 'Brioche, soft scramble, chives, black pepper aioli.',
      fa: 'بریوش، اسکرمبل نرم، پیازچه، آیولی فلفل سیاه.',
    },
    price: '$11.00',
    category: 'food',
    dietary: ['vegetarian'],
  },
]
