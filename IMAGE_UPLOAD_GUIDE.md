# 📸 Classic Fade — Custom Image Upload Guide

## Aapne jo images di hain, unhe kaise add karein

### Step 1: Images ko Public Folder mein Daalein

1. Apni saari hairstyle aur beard style images ko `public/images/` folder mein copy karein
2. Images ko proper names dein jaise:
   - `low-fade.jpg`
   - `mid-fade.jpg`
   - `high-fade.jpg`
   - `beard-trim.jpg`
   - `hot-towel-shave.jpg`
   - etc.

### Step 2: Folder Structure

```
public/
  └── images/
      ├── low-fade.jpg
      ├── mid-fade.jpg
      ├── high-fade.jpg
      ├── skin-fade.jpg
      ├── drop-fade.jpg
      ├── burst-fade.jpg
      ├── temple-fade.jpg
      ├── shadow-fade.jpg
      ├── bald-fade.jpg
      ├── taper-fade.jpg
      ├── french-crop.jpg
      ├── textured-crop.jpg
      ├── buzz-cut.jpg
      ├── crew-cut.jpg
      ├── caesar-cut.jpg
      ├── pompadour.jpg
      ├── slick-back.jpg
      ├── side-part.jpg
      ├── quiff.jpg
      ├── mohawk-fade.jpg
      ├── faux-hawk.jpg
      ├── undercut.jpg
      ├── comb-over.jpg
      ├── curly-top-fade.jpg
      ├── afro-fade.jpg
      ├── beard-trim.jpg
      ├── beard-lineup.jpg
      ├── clean-shave.jpg
      ├── hot-towel-shave.jpg
      ├── royal-shave.jpg
      ├── low-beard-fade.jpg
      ├── mid-beard-fade.jpg
      ├── high-beard-fade.jpg
      ├── sharp-beard-fade.jpg
      ├── full-beard.jpg
      ├── ducktail-beard.jpg
      ├── boxed-beard.jpg
      ├── circle-beard.jpg
      ├── balbo-beard.jpg
      ├── van-dyke.jpg
      ├── anchor-beard.jpg
      ├── stubble-beard.jpg
      └── viking-beard.jpg
```

### Step 3: Services File Update Karna (OPTIONAL)

Agar aap chahte hain ke aur bhi services add karein ya modify karein:

1. Open `src/data/services.js`
2. Har service mein `img` field ko update karein:

```javascript
{
  id: 'low-fade',
  name: 'Low Fade',
  category: 'fade',
  desc: 'Subtle fade starting just above the ear — clean, professional look.',
  time: 35,
  badge: '⭐ Popular',
  tags: ['popular'],
  faceShapes: ['oval', 'round', 'square'],
  img: '/images/low-fade.jpg', // ✅ Yahan apni image ka path daalein
}
```

## ✨ Key Changes Made

### 1. ❌ Prices Removed
- Sab services se price field remove kar diya gaya
- Catalog page pe price display nahi hoga
- User ko sirf service name, description, time aur badge dikhega

### 2. 🖼️ Custom Images Support
- Aap apni original images use kar sakte hain
- Koi modification nahi hoga
- Images exactly waise hi dikhegi jaise aap provide karenge

### 3. 📂 Image Path Structure
- Sab images `public/images/` folder mein honi chahiye
- Image names service IDs se match honi chahiye
- Format: `.jpg`, `.png`, `.webp` koi bhi use kar sakte hain

## 🎯 Categories & Style Names

### Fade Haircuts (10)
- Low Fade
- Mid Fade
- High Fade
- Skin Fade
- Drop Fade
- Burst Fade
- Temple Fade
- Shadow Fade
- Bald Fade
- Taper Fade

### Modern Haircuts (15)
- French Crop
- Textured Crop
- Buzz Cut
- Crew Cut
- Caesar Cut
- Pompadour
- Slick Back
- Side Part
- Quiff
- Mohawk Fade
- Faux Hawk
- Undercut
- Comb Over
- Curly Top Fade
- Afro Fade

### Beard Services (18)
- Beard Trim
- Beard Line Up
- Clean Shave
- Hot Towel Shave
- Royal Shave
- Low Beard Fade
- Mid Beard Fade
- High Beard Fade
- Sharp Beard Fade (Khat)
- Full Beard Styling
- Ducktail Beard
- Boxed Beard
- Circle Beard
- Balbo Beard
- Van Dyke Beard
- Anchor Beard
- Stubble Beard
- Viking Beard

## 🚀 Next Steps

1. ✅ Apni images ko `public/images/` folder mein copy karein
2. ✅ Image names ko service IDs se match karein
3. ✅ App ko refresh karein (`npm run dev`)
4. ✅ Catalog page pe check karein ke images properly show ho rahi hain

## 📝 Notes

- Images high quality honi chahiye (recommended: 800x800px minimum)
- File size optimize karein (max 500KB per image)
- Format: JPG ya PNG (WebP bhi supported hai)
- Images ko exactly waise hi use karenge jaise aap provide karenge
- Koi AI enhancement ya modification nahi hoga

## ❓ Agar Images Nahi Dikhai De Rahi

1. Check karein ke images `public/images/` folder mein hain
2. Image names exactly match kar rahe hain service IDs se
3. Browser cache clear karein (Ctrl + Shift + R)
4. Console mein errors check karein (F12)

---

**Made with ❤️ for Classic Fade**
