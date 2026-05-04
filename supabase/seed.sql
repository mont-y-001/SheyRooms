-- ============================================
-- SheyRooms — Sample Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

INSERT INTO public.rooms (name, maxcount, phonenumber, rentperday, imageurls, type, description) VALUES
(
  'Deluxe Suite',
  3,
  '9876543210',
  2500,
  ARRAY[
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
  ],
  'Deluxe',
  'A spacious deluxe suite with king-size bed, city view, free Wi-Fi, minibar, and 24/7 room service. Perfect for couples and business travelers.'
),
(
  'Standard Room',
  2,
  '9876543211',
  1200,
  ARRAY[
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'
  ],
  'Standard',
  'A comfortable standard room with queen-size bed, work desk, complimentary breakfast, and all modern amenities. Ideal for short stays.'
),
(
  'Premium Villa',
  5,
  '9876543212',
  5000,
  ARRAY[
    'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'
  ],
  'Premium',
  'Luxurious private villa with pool, garden view, 3 bedrooms, a fully equipped kitchen, and personal butler service. Perfect for families and groups.'
),
(
  'Economy Single',
  1,
  '9876543213',
  800,
  ARRAY[
    'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'
  ],
  'Economy',
  'Budget-friendly single room with a cozy bed, attached bathroom, TV, and free Wi-Fi. Great for solo travelers on a budget.'
),
(
  'Royal Penthouse',
  4,
  '9876543214',
  8000,
  ARRAY[
    'https://images.unsplash.com/photo-1590490360182-c33d55351c1e?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800'
  ],
  'Penthouse',
  'Top-floor penthouse with panoramic views, private terrace, jacuzzi, premium bar, and exclusive lounge access. The ultimate luxury experience.'
);
