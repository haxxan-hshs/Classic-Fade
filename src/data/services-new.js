// ── CLASSIC FADE — Complete Services Data (NO PRICES) ──
// User can easily replace images with their own custom images

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

// AI Recommendations based on face shape
export const AI_RECOMMENDATIONS = {
  oval: {
    tip: 'Oval face shape is versatile — almost any style works! Try mid fade, pompadour, or textured crop.',
    styles: ['mid-fade', 'pompadour', 'textured-crop', 'undercut']
  },
  round: {
    tip: 'Round face? Go for high fades and angular styles to add definition. Avoid rounded cuts.',
    styles: ['high-fade', 'pompadour', 'quiff', 'mohawk-fade']
  },
  square: {
    tip: 'Square jawline looks great with fades and structured styles. Pompadour and slick back are perfect.',
    styles: ['skin-fade', 'pompadour', 'slick-back', 'undercut']
  },
  heart: {
    tip: 'Heart-shaped face? Try styles with volume on top like quiff, pompadour, or textured crop.',
    styles: ['quiff', 'pompadour', 'textured-crop', 'messy-fringe']
  },
  diamond: {
    tip: 'Diamond face shape works well with textured styles and fades. Try quiff or textured crop.',
    styles: ['quiff', 'textured-crop', 'mid-fade', 'undercut']
  }
}

export const ALL_SERVICES = [
  // ══════════════════════════════
  // FADE HAIRCUTS (10 services)
  // ══════════════════════════════
  {
    id: 'low-fade', 
    name: 'Low Fade', 
    category: 'fade',
    desc: 'Subtle fade starting just above the ear — clean, professional look.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/low-fade.jpg', // Replace with your custom image
  },
  {
    id: 'mid-fade', 
    name: 'Mid Fade', 
    category: 'fade',
    desc: 'Balanced fade at mid-ear level — versatile and stylish.',
    time: 35, 
    badge: '🔥 Trending', 
    tags: ['trending', 'popular'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/mid-fade.jpg', // Replace with your custom image
  },
  {
    id: 'high-fade', 
    name: 'High Fade', 
    category: 'fade',
    desc: 'Bold fade starting high on the sides — sharp and modern.',
    time: 40, 
    badge: '🔥 Trending', 
    tags: ['trending'],
    faceShapes: ['round', 'square'],
    img: '/images/high-fade.jpg', // Replace with your custom image
  },
  {
    id: 'skin-fade', 
    name: 'Skin Fade', 
    category: 'fade',
    desc: 'Fades down to bare skin — ultra-clean premium finish.',
    time: 45, 
    badge: '👑 Premium', 
    tags: ['premium', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/skin-fade.jpg', // Replace with your custom image
  },
  {
    id: 'drop-fade', 
    name: 'Drop Fade', 
    category: 'fade',
    desc: 'Fade drops behind the ear — creates a curved, dramatic effect.',
    time: 40, 
    badge: '✨ Stylish', 
    tags: ['trending'],
    faceShapes: ['oval', 'heart'],
    img: '/images/drop-fade.jpg', // Replace with your custom image
  },
  {
    id: 'burst-fade', 
    name: 'Burst Fade', 
    category: 'fade',
    desc: 'Semicircular fade around the ear — bold and eye-catching.',
    time: 45, 
    badge: '🔥 Trending', 
    tags: ['trending', 'premium'],
    faceShapes: ['oval', 'round'],
    img: '/images/burst-fade.jpg', // Replace with your custom image
  },
  {
    id: 'temple-fade', 
    name: 'Temple Fade', 
    category: 'fade',
    desc: 'Fade focused at the temples — subtle and refined.',
    time: 30, 
    badge: '💰 Budget', 
    tags: ['budget', 'popular'],
    faceShapes: ['oval', 'square', 'heart'],
    img: '/images/temple-fade.jpg', // Replace with your custom image
  },
  {
    id: 'shadow-fade', 
    name: 'Shadow Fade', 
    category: 'fade',
    desc: 'Soft gradient fade — natural shadow effect on sides.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'diamond'],
    img: '/images/shadow-fade.jpg', // Replace with your custom image
  },
  {
    id: 'bald-fade', 
    name: 'Bald Fade', 
    category: 'fade',
    desc: 'Fades completely to bald — the sharpest fade possible.',
    time: 50, 
    badge: '👑 Premium', 
    tags: ['premium'],
    faceShapes: ['oval', 'square'],
    img: '/images/bald-fade.jpg', // Replace with your custom image
  },
  {
    id: 'taper-fade', 
    name: 'Taper Fade', 
    category: 'fade',
    desc: 'Classic taper that gradually shortens — timeless and clean.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/taper-fade.jpg', // Replace with your custom image
  },

  // ══════════════════════════════
  // MODERN HAIRCUTS (15 services)
  // ══════════════════════════════
  {
    id: 'french-crop', 
    name: 'French Crop', 
    category: 'modern',
    desc: 'Short textured top with a defined fringe — effortlessly cool.',
    time: 30, 
    badge: '🔥 Trending', 
    tags: ['trending', 'popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/french-crop.jpg', // Replace with your custom image
  },
  {
    id: 'textured-crop', 
    name: 'Textured Crop', 
    category: 'modern',
    desc: 'Choppy textured layers on top — modern and low maintenance.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/textured-crop.jpg', // Replace with your custom image
  },
  {
    id: 'buzz-cut', 
    name: 'Buzz Cut', 
    category: 'modern',
    desc: 'Uniform short length all over — minimal and masculine.',
    time: 20, 
    badge: '💰 Budget', 
    tags: ['budget', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/buzz-cut.jpg', // Replace with your custom image
  },
  {
    id: 'crew-cut', 
    name: 'Crew Cut', 
    category: 'modern',
    desc: 'Classic short back and sides with slightly longer top.',
    time: 25, 
    badge: '⭐ Popular', 
    tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/crew-cut.jpg', // Replace with your custom image
  },
  {
    id: 'caesar-cut', 
    name: 'Caesar Cut', 
    category: 'modern',
    desc: 'Short horizontal fringe with uniform length — Roman-inspired.',
    time: 30, 
    badge: '✨ Classic', 
    tags: ['popular'],
    faceShapes: ['oval', 'round'],
    img: '/images/caesar-cut.jpg', // Replace with your custom image
  },
  {
    id: 'pompadour', 
    name: 'Pompadour', 
    category: 'modern',
    desc: 'Voluminous swept-back top with faded sides — iconic style.',
    time: 50, 
    badge: '👑 Premium', 
    tags: ['premium', 'popular'],
    faceShapes: ['oval', 'heart', 'square'],
    img: '/images/pompadour.jpg', // Replace with your custom image
  },
  {
    id: 'slick-back', 
    name: 'Slick Back', 
    category: 'modern',
    desc: 'Hair combed straight back — sleek, sophisticated, powerful.',
    time: 40, 
    badge: '👑 Premium', 
    tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/slick-back.jpg', // Replace with your custom image
  },
  {
    id: 'side-part', 
    name: 'Side Part', 
    category: 'modern',
    desc: 'Clean side parting with combed styling — gentleman\'s choice.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'heart'],
    img: '/images/side-part.jpg', // Replace with your custom image
  },
  {
    id: 'quiff', 
    name: 'Quiff', 
    category: 'modern',
    desc: 'Voluminous front with tapered sides — bold and stylish.',
    time: 45, 
    badge: '🔥 Trending', 
    tags: ['trending', 'premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/quiff.jpg', // Replace with your custom image
  },
  {
    id: 'mohawk-fade', 
    name: 'Mohawk Fade', 
    category: 'modern',
    desc: 'Faded sides with a defined strip on top — edgy and bold.',
    time: 50, 
    badge: '🔥 Trending', 
    tags: ['trending', 'premium'],
    faceShapes: ['oval', 'square'],
    img: '/images/mohawk-fade.jpg', // Replace with your custom image
  },
  {
    id: 'faux-hawk', 
    name: 'Faux Hawk', 
    category: 'modern',
    desc: 'Mohawk-inspired without shaving sides — versatile and cool.',
    time: 45, 
    badge: '✨ Stylish', 
    tags: ['trending'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/faux-hawk.jpg', // Replace with your custom image
  },
  {
    id: 'undercut', 
    name: 'Undercut', 
    category: 'modern',
    desc: 'Shaved or very short sides with long top — dramatic contrast.',
    time: 40, 
    badge: '⭐ Popular', 
    tags: ['popular', 'trending'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/undercut.jpg', // Replace with your custom image
  },
  {
    id: 'comb-over', 
    name: 'Comb Over', 
    category: 'modern',
    desc: 'Hair combed to one side with a clean part — refined look.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart'],
    img: '/images/comb-over.jpg', // Replace with your custom image
  },
  {
    id: 'curly-top-fade', 
    name: 'Curly Top Fade', 
    category: 'modern',
    desc: 'Natural curls on top with clean fade sides — texture meets style.',
    time: 45, 
    badge: '🔥 Trending', 
    tags: ['trending'],
    faceShapes: ['oval', 'round'],
    img: '/images/curly-top-fade.jpg', // Replace with your custom image
  },
  {
    id: 'afro-fade', 
    name: 'Afro Fade', 
    category: 'modern',
    desc: 'Natural afro texture with faded sides — bold and beautiful.',
    time: 50, 
    badge: '✨ Unique', 
    tags: ['premium'],
    faceShapes: ['oval', 'round', 'diamond'],
    img: '/images/afro-fade.jpg', // Replace with your custom image
  },

  // ══════════════════════════════
  // BEARD SERVICES (18 services)
  // ══════════════════════════════
  {
    id: 'beard-trim', 
    name: 'Beard Trim', 
    category: 'beard',
    desc: 'Shape and trim your beard to perfection — clean and defined.',
    time: 20, 
    badge: '⭐ Popular', 
    tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/beard-trim.jpg', // Replace with your custom image
  },
  {
    id: 'beard-lineup', 
    name: 'Beard Line Up', 
    category: 'beard',
    desc: 'Sharp, precise beard edges — crisp lines that define your face.',
    time: 20, 
    badge: '🔥 Trending', 
    tags: ['trending', 'popular'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/beard-lineup.jpg', // Replace with your custom image
  },
  {
    id: 'clean-shave', 
    name: 'Clean Shave', 
    category: 'beard',
    desc: 'Smooth, close shave for a fresh, clean look.',
    time: 25, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/clean-shave.jpg', // Replace with your custom image
  },
  {
    id: 'hot-towel-shave', 
    name: 'Hot Towel Shave', 
    category: 'beard',
    desc: 'Relaxing hot towel prep with straight razor — luxury experience.',
    time: 40, 
    badge: '👑 Premium', 
    tags: ['premium', 'popular'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/hot-towel-shave.jpg', // Replace with your custom image
  },
  {
    id: 'royal-shave', 
    name: 'Royal Shave', 
    category: 'beard',
    desc: 'Multi-pass straight razor shave with hot towels and aftercare.',
    time: 55, 
    badge: '👑 Royal', 
    tags: ['premium'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/royal-shave.jpg', // Replace with your custom image
  },
  {
    id: 'low-beard-fade', 
    name: 'Low Beard Fade', 
    category: 'beard',
    desc: 'Beard fades into skin at the neck — seamless and sharp.',
    time: 30, 
    badge: '🔥 Trending', 
    tags: ['trending'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/low-beard-fade.jpg', // Replace with your custom image
  },
  {
    id: 'mid-beard-fade', 
    name: 'Mid Beard Fade', 
    category: 'beard',
    desc: 'Balanced beard fade at mid-cheek — modern and clean.',
    time: 35, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/mid-beard-fade.jpg', // Replace with your custom image
  },
  {
    id: 'high-beard-fade', 
    name: 'High Beard Fade', 
    category: 'beard',
    desc: 'Fade starts high on cheeks — dramatic and bold.',
    time: 40, 
    badge: '✨ Bold', 
    tags: ['trending', 'premium'],
    faceShapes: ['oval', 'square'],
    img: '/images/high-beard-fade.jpg', // Replace with your custom image
  },
  {
    id: 'sharp-beard-fade', 
    name: 'Sharp Beard Fade (Khat)', 
    category: 'beard',
    desc: 'Ultra-sharp khat lines with precision fade — executive style.',
    time: 40, 
    badge: '⚡ Sharp', 
    tags: ['popular', 'trending'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/sharp-beard-fade.jpg', // Replace with your custom image
  },
  {
    id: 'full-beard', 
    name: 'Full Beard Styling', 
    category: 'beard',
    desc: 'Complete beard shaping, oiling and styling — full treatment.',
    time: 50, 
    badge: '👑 Premium', 
    tags: ['premium', 'popular'],
    faceShapes: ['oval', 'square', 'heart', 'diamond'],
    img: '/images/full-beard.jpg', // Replace with your custom image
  },
  {
    id: 'ducktail-beard', 
    name: 'Ducktail Beard', 
    category: 'beard',
    desc: 'Pointed at the chin like a duck\'s tail — distinguished and sharp.',
    time: 45, 
    badge: '✨ Unique', 
    tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/ducktail-beard.jpg', // Replace with your custom image
  },
  {
    id: 'boxed-beard', 
    name: 'Boxed Beard', 
    category: 'beard',
    desc: 'Square-shaped beard with defined edges — structured and bold.',
    time: 40, 
    badge: '⭐ Popular', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'heart'],
    img: '/images/boxed-beard.jpg', // Replace with your custom image
  },
  {
    id: 'circle-beard', 
    name: 'Circle Beard', 
    category: 'beard',
    desc: 'Round goatee connected to mustache — classic and neat.',
    time: 30, 
    badge: '⭐ Classic', 
    tags: ['popular'],
    faceShapes: ['oval', 'round', 'square'],
    img: '/images/circle-beard.jpg', // Replace with your custom image
  },
  {
    id: 'balbo-beard', 
    name: 'Balbo Beard', 
    category: 'beard',
    desc: 'Disconnected mustache with trimmed beard — sophisticated.',
    time: 35, 
    badge: '✨ Stylish', 
    tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/balbo-beard.jpg', // Replace with your custom image
  },
  {
    id: 'van-dyke', 
    name: 'Van Dyke Beard', 
    category: 'beard',
    desc: 'Pointed goatee with separate mustache — artistic and refined.',
    time: 35, 
    badge: '✨ Artistic', 
    tags: ['premium'],
    faceShapes: ['oval', 'heart', 'diamond'],
    img: '/images/van-dyke.jpg', // Replace with your custom image
  },
  {
    id: 'anchor-beard', 
    name: 'Anchor Beard', 
    category: 'beard',
    desc: 'Pointed beard with pencil mustache — nautical-inspired style.',
    time: 35, 
    badge: '✨ Unique', 
    tags: ['premium'],
    faceShapes: ['oval', 'square', 'heart'],
    img: '/images/anchor-beard.jpg', // Replace with your custom image
  },
  {
    id: 'stubble-beard', 
    name: 'Stubble Beard', 
    category: 'beard',
    desc: 'Perfectly maintained stubble — rugged yet groomed.',
    time: 20, 
    badge: '⭐ Popular', 
    tags: ['popular', 'budget'],
    faceShapes: ['oval', 'round', 'square', 'heart', 'diamond'],
    img: '/images/stubble-beard.jpg', // Replace with your custom image
  },
  {
    id: 'viking-beard', 
    name: 'Viking Beard', 
    category: 'beard',
    desc: 'Long, full beard with braids or waves — warrior aesthetic.',
    time: 60, 
    badge: '👑 Epic', 
    tags: ['premium'],
    faceShapes: ['oval', 'square', 'diamond'],
    img: '/images/viking-beard.jpg', // Replace with your custom image
  },

  // Add remaining categories (Luxury, Kids, Color, Facial, Combo) with NO PRICES
  // User can add their custom images in /public/images/ folder
]
