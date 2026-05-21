// ── CLASSIC FADE — Complete Services Data ──

export const CATEGORIES = [
  { id: 'all',     label: 'All',          emoji: '✨' },
  { id: 'fade',    label: 'Fades',        emoji: '✂️' },
  { id: 'modern',  label: 'Modern Cuts',  emoji: '💈' },
  { id: 'luxury',  label: 'Luxury',       emoji: '👑' },
  { id: 'kids',    label: 'Kids',         emoji: '🧒' },
  { id: 'beard',   label: 'Beard',        emoji: '🧔' },
  { id: 'color',   label: 'Hair Color',   emoji: '🎨' },
  { id: 'facial',  label: 'Facial',       emoji: '💆' },
  { id: 'combo',   label: 'Combos',       emoji: '🎁' },
]

export const FILTER_TAGS = [
  { id: 'all',      label: 'All' },
  { id: 'trending', label: '🔥 Trending' },
  { id: 'popular',  label: '⭐ Popular' },
  { id: 'premium',  label: '👑 Premium' },
  { id: 'budget',   label: '💰 Budget' },
]

export const FACE_SHAPES = [
  { id: 'all',      label: 'Any Face' },
  { id: 'oval',     label: 'Oval' },
  { id: 'round',    label: 'Round' },
  { id: 'square',   label: 'Square' },
  { id: 'heart',    label: 'Heart' },
  { id: 'diamond',  label: 'Diamond' },
]

export const ALL_SERVICES = [
  // ══════════════════════════════
  // FADE HAIRCUTS
  // ══════════════════════════════
  {
    id: 'low-fade', name: 'Low Fade', category: 'fade',
    desc: 'Subtle fade starting just above the ear — clean, professional look.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'mid-fade', name: 'Mid Fade', category: 'fade',
    desc: 'Balanced fade at mid-ear level — versatile and stylish.',
    time: 35, price: 450, badge: '🔥 Trending', tags: ['trending', 'popular'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'high-fade', name: 'High Fade', category: 'fade',
    desc: 'Bold fade starting high on the sides — sharp and modern.',
    time: 40, price: 500, badge: '🔥 Trending', tags: ['trending'],
    faceShapes: ['round', 'square'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'skin-fade', name: 'Skin Fade', category: 'fade',
    desc: 'Fades down to bare skin — ultra-clean premium finish.',
    time: 45, price: 550, badge: '👑 Premium', tags: ['premium', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'drop-fade', name: 'Drop Fade', category: 'fade',
    desc: 'Fade drops behind the ear — creates a curved, dramatic effect.',
    time: 40, price: 500, badge: '✨ Stylish', tags: ['trending'],
    faceShapes: ['oval', 'heart'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'burst-fade', name: 'Burst Fade', category: 'fade',
    desc: 'Semicircular fade around the ear — bold and eye-catching.',
    time: 45, price: 550, badge: '🔥 Trending', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'round'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  {
    id: 'temple-fade', name: 'Temple Fade', category: 'fade',
    desc: 'Fade focused at the temples — subtle and refined.',
    time: 30, price: 400, badge: '💰 Budget', tags: ['budget', 'popular'],
    faceShapes: ['oval', 'square', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'shadow-fade', name: 'Shadow Fade', category: 'fade',
    desc: 'Soft gradient fade — natural shadow effect on sides.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'bald-fade', name: 'Bald Fade', category: 'fade',
    desc: 'Fades completely to bald — the sharpest fade possible.',
    time: 50, price: 600, badge: '👑 Premium', tags: ['premium'],
    faceShapes: ['oval', 'square'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'taper-fade', name: 'Taper Fade', category: 'fade',
    desc: 'Classic taper that gradually shortens — timeless and clean.',
    time: 35, price: 400, badge: '⭐ Popular', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // MODERN HAIRCUTS
  // ══════════════════════════════
  {
    id: 'french-crop', name: 'French Crop', category: 'modern',
    desc: 'Short textured top with a defined fringe — effortlessly cool.',
    time: 30, price: 400, badge: '🔥 Trending', tags: ['trending', 'popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  {
    id: 'textured-crop', name: 'Textured Crop', category: 'modern',
    desc: 'Choppy textured layers on top — modern and low maintenance.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  {
    id: 'buzz-cut', name: 'Buzz Cut', category: 'modern',
    desc: 'Uniform short length all over — minimal and masculine.',
    time: 20, price: 300, badge: '💰 Budget', tags: ['budget', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'crew-cut', name: 'Crew Cut', category: 'modern',
    desc: 'Classic short back and sides with slightly longer top.',
    time: 25, price: 350, badge: '⭐ Popular', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'caesar-cut', name: 'Caesar Cut', category: 'modern',
    desc: 'Short horizontal fringe with uniform length — Roman-inspired.',
    time: 30, price: 400, badge: '✨ Classic', tags: ['popular'],
    faceShapes: ['oval', 'round'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'pompadour', name: 'Pompadour', category: 'modern',
    desc: 'Voluminous swept-back top with faded sides — iconic style.',
    time: 50, price: 600, badge: '👑 Premium', tags: ['premium', 'popular'],
    faceShapes: ['oval', 'heart', 'square'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'slick-back', name: 'Slick Back', category: 'modern',
    desc: 'Hair combed straight back — sleek, sophisticated, powerful.',
    time: 40, price: 500, badge: '👑 Premium', tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'side-part', name: 'Side Part', category: 'modern',
    desc: 'Clean side parting with combed styling — gentleman\'s choice.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'heart'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'quiff', name: 'Quiff', category: 'modern',
    desc: 'Voluminous front with tapered sides — bold and stylish.',
    time: 45, price: 550, badge: '🔥 Trending', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'mohawk-fade', name: 'Mohawk Fade', category: 'modern',
    desc: 'Faded sides with a defined strip on top — edgy and bold.',
    time: 50, price: 600, badge: '🔥 Trending', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'square'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'faux-hawk', name: 'Faux Hawk', category: 'modern',
    desc: 'Mohawk-inspired without shaving sides — versatile and cool.',
    time: 45, price: 550, badge: '✨ Stylish', tags: ['trending'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  {
    id: 'undercut', name: 'Undercut', category: 'modern',
    desc: 'Shaved or very short sides with long top — dramatic contrast.',
    time: 40, price: 500, badge: '⭐ Popular', tags: ['popular', 'trending'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'comb-over', name: 'Comb Over', category: 'modern',
    desc: 'Hair combed to one side with a clean part — refined look.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'curly-top-fade', name: 'Curly Top Fade', category: 'modern',
    desc: 'Natural curls on top with clean fade sides — texture meets style.',
    time: 45, price: 550, badge: '🔥 Trending', tags: ['trending'],
    faceShapes: ['oval', 'round'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'afro-fade', name: 'Afro Fade', category: 'modern',
    desc: 'Natural afro texture with faded sides — bold and beautiful.',
    time: 50, price: 600, badge: '✨ Unique', tags: ['premium'],
    faceShapes: ['oval', 'round', 'diamond'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // LUXURY & TREND STYLES
  // ══════════════════════════════
  {
    id: 'modern-mullet', name: 'Modern Mullet', category: 'luxury',
    desc: 'Business in front, party in back — the comeback king.',
    time: 55, price: 700, badge: '🔥 Viral', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'wolf-cut', name: 'Wolf Cut', category: 'luxury',
    desc: 'Shaggy layers with a wild, textured finish — TikTok famous.',
    time: 60, price: 750, badge: '🔥 Viral', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  {
    id: 'two-block', name: 'Two Block Cut', category: 'luxury',
    desc: 'Korean-inspired — long top, shaved sides. Clean and modern.',
    time: 50, price: 650, badge: '🔥 Trending', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'round', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'edgar-cut', name: 'Edgar Cut', category: 'luxury',
    desc: 'Blunt fringe with high fade — sharp and street-style ready.',
    time: 45, price: 600, badge: '🔥 Trending', tags: ['trending'],
    faceShapes: ['oval', 'square'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'broccoli', name: 'Broccoli Haircut', category: 'luxury',
    desc: 'Curly rounded top with tight fade — playful and trendy.',
    time: 45, price: 600, badge: '✨ Unique', tags: ['trending'],
    faceShapes: ['oval', 'round'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'messy-fringe', name: 'Messy Fringe', category: 'luxury',
    desc: 'Effortlessly tousled fringe — casual yet intentional.',
    time: 40, price: 550, badge: '⭐ Popular', tags: ['popular', 'trending'],
    faceShapes: ['oval', 'heart', 'round'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'blowout-taper', name: 'Blowout Taper', category: 'luxury',
    desc: 'Voluminous blowout top with tapered sides — full and fresh.',
    time: 55, price: 700, badge: '👑 Premium', tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'samurai-bun', name: 'Samurai Bun', category: 'luxury',
    desc: 'Long hair tied in a top knot — warrior meets gentleman.',
    time: 30, price: 400, badge: '✨ Unique', tags: ['premium'],
    faceShapes: ['oval', 'square', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'long-layer', name: 'Long Layer Style', category: 'luxury',
    desc: 'Layered long hair with movement and texture — flowing and bold.',
    time: 60, price: 750, badge: '👑 Premium', tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'korean-style', name: 'Korean Haircut Style', category: 'luxury',
    desc: 'Soft, curtain-like layers inspired by K-pop — smooth and sleek.',
    time: 55, price: 700, badge: '🔥 Viral', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'round', 'heart'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },
  // ══════════════════════════════
  // KIDS HAIRCUTS
  // ══════════════════════════════
  {
    id: 'kids-fade', name: 'Kids Fade', category: 'kids',
    desc: 'Clean fade for little ones — gentle and quick.',
    time: 25, price: 300, badge: '🧒 Kids', tags: ['budget', 'popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&fit=crop&q=80',
  },
  {
    id: 'kids-mohawk', name: 'Kids Mohawk', category: 'kids',
    desc: 'Fun mohawk style for kids — they\'ll love it!',
    time: 30, price: 350, badge: '🧒 Fun', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&fit=crop&q=80',
  },
  {
    id: 'kids-side-part', name: 'Kids Side Part', category: 'kids',
    desc: 'Neat side part for school or events — smart and tidy.',
    time: 20, price: 280, badge: '🧒 Smart', tags: ['budget'],
    faceShapes: ['oval', 'round', 'heart'],
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&fit=crop&q=80',
  },
  {
    id: 'cartoon-cut', name: 'Cartoon Style Cut', category: 'kids',
    desc: 'Inspired by cartoon characters — creative and playful.',
    time: 35, price: 400, badge: '🧒 Creative', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // BEARD SERVICES
  // ══════════════════════════════
  {
    id: 'beard-trim', name: 'Beard Trim', category: 'beard',
    desc: 'Shape and trim your beard to perfection — clean and defined.',
    time: 20, price: 300, badge: '⭐ Popular', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'beard-lineup', name: 'Beard Line Up', category: 'beard',
    desc: 'Sharp, precise beard edges — crisp lines that define your face.',
    time: 20, price: 300, badge: '🔥 Trending', tags: ['trending', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'clean-shave', name: 'Clean Shave', category: 'beard',
    desc: 'Smooth, close shave for a fresh, clean look.',
    time: 25, price: 350, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&fit=crop&q=80',
  },
  {
    id: 'hot-towel-shave', name: 'Hot Towel Shave', category: 'beard',
    desc: 'Relaxing hot towel prep with straight razor — luxury experience.',
    time: 40, price: 500, badge: '👑 Premium', tags: ['premium', 'popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&fit=crop&q=80',
  },
  {
    id: 'royal-shave', name: 'Royal Shave', category: 'beard',
    desc: 'Multi-pass straight razor shave with hot towels and aftercare.',
    time: 55, price: 700, badge: '👑 Royal', tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&fit=crop&q=80',
  },
  {
    id: 'low-beard-fade', name: 'Low Beard Fade', category: 'beard',
    desc: 'Beard fades into skin at the neck — seamless and sharp.',
    time: 30, price: 400, badge: '🔥 Trending', tags: ['trending'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'mid-beard-fade', name: 'Mid Beard Fade', category: 'beard',
    desc: 'Balanced beard fade at mid-cheek — modern and clean.',
    time: 35, price: 450, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'high-beard-fade', name: 'High Beard Fade', category: 'beard',
    desc: 'Fade starts high on cheeks — dramatic and bold.',
    time: 40, price: 500, badge: '✨ Bold', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'square'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'sharp-beard-fade', name: 'Sharp Beard Fade (Khat)', category: 'beard',
    desc: 'Ultra-sharp khat lines with precision fade — executive style.',
    time: 40, price: 500, badge: '⚡ Sharp', tags: ['popular', 'trending'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'full-beard', name: 'Full Beard Styling', category: 'beard',
    desc: 'Complete beard shaping, oiling and styling — full treatment.',
    time: 50, price: 600, badge: '👑 Premium', tags: ['premium', 'popular'],
    faceShapes: ['oval', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'ducktail-beard', name: 'Ducktail Beard', category: 'beard',
    desc: 'Pointed at the chin like a duck\'s tail — distinguished and sharp.',
    time: 45, price: 550, badge: '✨ Unique', tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'boxed-beard', name: 'Boxed Beard', category: 'beard',
    desc: 'Square-shaped beard with defined edges — structured and bold.',
    time: 40, price: 500, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'circle-beard', name: 'Circle Beard', category: 'beard',
    desc: 'Round goatee connected to mustache — classic and neat.',
    time: 30, price: 400, badge: '⭐ Classic', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'balbo-beard', name: 'Balbo Beard', category: 'beard',
    desc: 'Disconnected mustache with trimmed beard — sophisticated.',
    time: 35, price: 450, badge: '✨ Stylish', tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'van-dyke', name: 'Van Dyke Beard', category: 'beard',
    desc: 'Pointed goatee with separate mustache — artistic and refined.',
    time: 35, price: 450, badge: '✨ Artistic', tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'anchor-beard', name: 'Anchor Beard', category: 'beard',
    desc: 'Pointed beard with pencil mustache — nautical-inspired style.',
    time: 35, price: 450, badge: '✨ Unique', tags: ['premium'],
    faceShapes: ['oval', 'square', 'heart'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },
  {
    id: 'stubble-beard', name: 'Stubble Beard', category: 'beard',
    desc: 'Perfectly maintained stubble — rugged yet groomed.',
    time: 20, price: 300, badge: '⭐ Popular', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&fit=crop&q=80',
  },
  {
    id: 'viking-beard', name: 'Viking Beard', category: 'beard',
    desc: 'Long, full beard with braids or waves — warrior aesthetic.',
    time: 60, price: 750, badge: '👑 Epic', tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // HAIR COLOR SERVICES
  // ══════════════════════════════
  {
    id: 'black-color', name: 'Black Hair Color', category: 'color',
    desc: 'Deep, rich black color — bold and classic.',
    time: 60, price: 1200, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'blonde-highlights', name: 'Blonde Highlights', category: 'color',
    desc: 'Sun-kissed blonde streaks — natural and vibrant.',
    time: 90, price: 2500, badge: '🔥 Trending', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'silver-color', name: 'Silver Hair Color', category: 'color',
    desc: 'Sleek silver tone — modern and sophisticated.',
    time: 90, price: 2800, badge: '👑 Premium', tags: ['premium', 'trending'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'white-platinum', name: 'White Platinum', category: 'color',
    desc: 'Ice-white platinum finish — ultra-premium statement.',
    time: 120, price: 3500, badge: '👑 Luxury', tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'brown-texture', name: 'Brown Texture Color', category: 'color',
    desc: 'Warm brown tones with texture — natural and rich.',
    time: 75, price: 2000, badge: '⭐ Popular', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'red-tone', name: 'Red Tone Color', category: 'color',
    desc: 'Bold red tones — fiery and attention-grabbing.',
    time: 90, price: 2500, badge: '🔥 Bold', tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart', 'square'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },
  {
    id: 'custom-color', name: 'Custom Hair Coloring', category: 'color',
    desc: 'Your choice of color — fully customized to your vision.',
    time: 120, price: 3000, badge: '🎨 Custom', tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // FACIAL & GROOMING SERVICES
  // ══════════════════════════════
  {
    id: 'face-cleanup', name: 'Face Cleanup', category: 'facial',
    desc: 'Deep cleanse and exfoliation — fresh, glowing skin.',
    time: 30, price: 600, badge: '⭐ Popular', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'gold-facial', name: 'Gold Facial', category: 'facial',
    desc: 'Luxurious gold-infused facial — anti-aging and radiant.',
    time: 60, price: 1800, badge: '👑 Luxury', tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'charcoal-facial', name: 'Charcoal Facial', category: 'facial',
    desc: 'Deep pore cleansing with activated charcoal — detox your skin.',
    time: 45, price: 1200, badge: '🔥 Trending', tags: ['trending', 'popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'acne-facial', name: 'Acne Treatment Facial', category: 'facial',
    desc: 'Targeted acne treatment — clear, healthy skin.',
    time: 50, price: 1400, badge: '💆 Healing', tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'black-mask', name: 'Black Mask Treatment', category: 'facial',
    desc: 'Peel-off black mask — removes blackheads and impurities.',
    time: 35, price: 800, badge: '🔥 Trending', tags: ['trending'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'hair-spa', name: 'Hair Spa', category: 'facial',
    desc: 'Deep conditioning hair spa — nourish and strengthen.',
    time: 60, price: 1500, badge: '💆 Relaxing', tags: ['premium', 'popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'head-massage', name: 'Head Massage', category: 'facial',
    desc: 'Relaxing scalp and head massage — stress relief.',
    time: 30, price: 500, badge: '💆 Relaxing', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },
  {
    id: 'steam-therapy', name: 'Steam Therapy', category: 'facial',
    desc: 'Hot steam treatment — opens pores and refreshes skin.',
    time: 25, price: 400, badge: '💆 Refresh', tags: ['budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&fit=crop&q=80',
  },

  // ══════════════════════════════
  // PREMIUM COMBO PACKAGES
  // ══════════════════════════════
  {
    id: 'combo-haircut-beard', name: 'Haircut + Beard Trim', category: 'combo',
    desc: 'Complete grooming combo — fresh cut and clean beard.',
    time: 55, price: 700, badge: '🎁 Best Value', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&fit=crop&q=80',
  },
  {
    id: 'combo-fade-facial', name: 'Fade + Facial', category: 'combo',
    desc: 'Sharp fade with a refreshing facial — look and feel great.',
    time: 80, price: 1200, badge: '🎁 Popular', tags: ['popular', 'trending'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&fit=crop&q=80',
  },
  {
    id: 'vip-package', name: 'VIP Grooming Package', category: 'combo',
    desc: 'Haircut + Beard + Facial + Head Massage — full luxury treatment.',
    time: 120, price: 2500, badge: '👑 VIP', tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&fit=crop&q=80',
  },
  {
    id: 'wedding-package', name: 'Wedding Groom Package', category: 'combo',
    desc: 'Complete bridal grooming — haircut, beard, facial, styling.',
    time: 150, price: 4000, badge: '💍 Wedding', tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&fit=crop&q=80',
  },
  {
    id: 'monthly-membership', name: 'Monthly Membership', category: 'combo',
    desc: '4 haircuts + 2 beard trims per month — unlimited value.',
    time: 0, price: 3500, badge: '🎁 Membership', tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&fit=crop&q=80',
  },
]

// ── AI RECOMMENDATIONS ──
export const AI_RECOMMENDATIONS = {
  oval:    { styles: ['mid-fade', 'pompadour', 'quiff', 'slick-back', 'textured-crop'], tip: 'Oval face suits almost any style. Mid Fade or Pompadour will look great!' },
  round:   { styles: ['high-fade', 'mohawk-fade', 'faux-hawk', 'quiff', 'french-crop'], tip: 'High Fade or Quiff adds height and makes your face look slimmer.' },
  square:  { styles: ['skin-fade', 'crew-cut', 'buzz-cut', 'slick-back', 'comb-over'], tip: 'Skin Fade or Crew Cut complements your strong jawline perfectly.' },
  heart:   { styles: ['side-part', 'textured-crop', 'messy-fringe', 'wolf-cut', 'two-block'], tip: 'Side Part or Textured Crop balances your wider forehead beautifully.' },
  diamond: { styles: ['shadow-fade', 'undercut', 'side-part', 'slick-back', 'taper-fade'], tip: 'Shadow Fade or Undercut highlights your sharp cheekbones.' },
}
