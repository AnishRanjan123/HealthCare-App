export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  languages: string;
  experience: string;
  price: string;
  promo: string;
  rating: number;
  photo: string;
};

export const doctors: Doctor[] = [
  {
    id: 'prem-1',
    name: 'Dr. Prem',
    specialization: 'Gynecology + 2 others',
    languages: 'Hindi, English, Telugu',
    experience: '7 years',
    price: '₹ 15/min',
    promo: 'Free (5min)',
    rating: 4.5,
    photo:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=480&q=80',
  },
  {
    id: 'prem-2',
    name: 'Dr. Prem',
    specialization: 'Gynecology + 2 others',
    languages: 'Hindi, English, Telugu',
    experience: '7 years',
    price: '₹ 15/min',
    promo: 'Free (5min)',
    rating: 4.5,
    photo:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=480&q=80',
  },
  {
    id: 'prem-3',
    name: 'Dr. Prem',
    specialization: 'Gynecology + 2 others',
    languages: 'Hindi, English, Telugu',
    experience: '7 years',
    price: '₹ 15/min',
    promo: 'Free (5min)',
    rating: 4.5,
    photo:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=480&q=80',
  },
];
