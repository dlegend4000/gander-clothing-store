import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router';
import type {Route} from './+types/_index';

export const meta: Route.MetaFunction = () => {
  return [{title: 'GANDER — New Collection'}];
};

export function loader() {
  return {};
}

// ── Data ──────────────────────────────────────────────────────────────────────

const G = '/images/gander';

const heroProduct = {
  title: 'ANTI HERO ZIP JACKET',
  price: '€250.00',
  compareAtPrice: '€370.00',
  handle: 'anti-hero-zip-jacket',
  description:
    'Crafted from premium heavyweight fleece with a clean one-cut construction for a sharp, structured silhouette. Features a strong collar, metal zip closure and subtle side pockets. The material ages naturally over time, creating a unique patina and character.',
  sizes: ['S', 'M', 'L', 'XL', '2XL'],
  images: [
    `${G}/Picture-3.png`,
    `${G}/FRONT-01-01.jpg`,
    `${G}/Back-SMALL.jpg`,
    `${G}/Side-01.jpg`,
  ],
};

const catalogProducts = [
  {id: '1', title: 'THE JACKET',   sub: 'Limited Drop', image: `${G}/Picture-1.png`, price: '€250.00', handle: 'anti-hero-zip-jacket'},
  {id: '2', title: 'FRONT CUT',    sub: 'Front Shot',   image: `${G}/Picture-2.png`, price: '€220.00', handle: 'anti-hero-zip-jacket'},
  {id: '3', title: 'SIDE PROFILE', sub: 'Side Shot',    image: `${G}/Picture-3.png`, price: '€195.00', handle: 'anti-hero-zip-jacket'},
  {id: '4', title: 'BACK DROP',    sub: 'Back Shot',    image: `${G}/Picture-4.png`, price: '€180.00', handle: 'anti-hero-zip-jacket'},
];

const marqueeText = 'GANDER — ANTI HERO — NEW COLLECTION — SPRING 2026 — QUALITY MADE — ';

// ── Scroll-triggered animation hook ──────────────────────────────────────────
// Adds a CSS class when element enters viewport. Elements start VISIBLE by
// default (no opacity-0 SSR trap) and get the animation added as enhancement.

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.disconnect();
        }
      },
      {threshold: 0.1},
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Homepage() {
  const [selectedSize, setSelectedSize] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [flickering, setFlickering] = useState(false);

  // Refs to avoid stale closures in event handlers
  const activeImgRef = useRef(0);
  const lastWheelTime = useRef(0);
  const totalImages = heroProduct.images.length;

  const productsRef = useScrollReveal<HTMLElement>();
  const editorialImgRef = useScrollReveal<HTMLDivElement>();
  const editorialTextRef = useScrollReveal<HTMLDivElement>();
  const lookbookRef = useScrollReveal<HTMLElement>();

  // Keep ref in sync with state
  useEffect(() => {
    activeImgRef.current = activeImg;
  }, [activeImg]);

  // Scroll-hijack: cycle through all images (looping) before letting page scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 10) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 600) return;

      const current = activeImgRef.current;

      // Always hijack scroll at top — loop through images indefinitely
      if (e.deltaY > 0) {
        e.preventDefault();
        lastWheelTime.current = now;
        const next = (current + 1) % totalImages;
        setFlickering(true);
        setTimeout(() => {
          setActiveImg(next);
          activeImgRef.current = next;
          setFlickering(false);
        }, 90);
      } else if (e.deltaY < 0) {
        e.preventDefault();
        lastWheelTime.current = now;
        const prev = (current - 1 + totalImages) % totalImages;
        setFlickering(true);
        setTimeout(() => {
          setActiveImg(prev);
          activeImgRef.current = prev;
          setFlickering(false);
        }, 90);
      }
    };

    window.addEventListener('wheel', handleWheel, {passive: false});
    return () => window.removeEventListener('wheel', handleWheel);
  }, [totalImages]);

  return (
    <div className="relative overflow-x-hidden">

      {/* ─────────────────────────────────────────────────────────────────────
          HERO — Full viewport editorial product feature
      ───────────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100vh-var(--header-height))] flex flex-col"
        style={{backgroundColor: '#ffffff'}}
      >
        {/* Scattered logos — hero */}
        {[
          {top: '5%',  left: '3%',   size: 120, rotate: -15, opacity: 0.030},
          {top: '55%', left: '1%',   size: 90,  rotate: 12,  opacity: 0.025},
          {top: '78%', left: '8%',   size: 70,  rotate: -22, opacity: 0.028},
          {top: '30%', left: '12%',  size: 100, rotate: 30,  opacity: 0.022},
          {top: '85%', left: '28%',  size: 85,  rotate: -5,  opacity: 0.025},
          {top: '15%', right: '2%',  size: 110, rotate: 20,  opacity: 0.028},
          {top: '65%', right: '4%',  size: 80,  rotate: -8,  opacity: 0.022},
          {top: '40%', right: '10%', size: 95,  rotate: 14,  opacity: 0.026},
          {top: '88%', right: '18%', size: 75,  rotate: -18, opacity: 0.022},
          {top: '42%', left: '47%',  size: 160, rotate: 5,   opacity: 0.018},
          {top: '10%', left: '35%',  size: 70,  rotate: -28, opacity: 0.022},
          {top: '72%', left: '38%',  size: 90,  rotate: 22,  opacity: 0.020},
          {top: '25%', left: '22%',  size: 65,  rotate: 10,  opacity: 0.024},
          {top: '50%', right: '28%', size: 85,  rotate: -12, opacity: 0.020},
          {top: '92%', left: '55%',  size: 75,  rotate: 35,  opacity: 0.022},
          {top: '18%', left: '55%',  size: 60,  rotate: -40, opacity: 0.018},
          {top: '62%', left: '20%',  size: 100, rotate: 16,  opacity: 0.024},
          {top: '35%', right: '22%', size: 70,  rotate: -25, opacity: 0.020},
          {top: '80%', right: '32%', size: 80,  rotate: 8,   opacity: 0.022},
          {top: '5%',  left: '60%',  size: 90,  rotate: -10, opacity: 0.022},
        ].map((s, i) => (
          <img
            key={i}
            src="/images/gander/logo-transparent.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              right: (s as {right?: string}).right,
              width: s.size,
              opacity: s.opacity,
              transform: `rotate(${s.rotate}deg)`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}
        {/* ── MOBILE layout (< lg) ── */}
        <div className="flex lg:hidden flex-col flex-1">
          {/* Image */}
          <div
            className="relative flex items-end justify-center anim-scale-in"
            style={{height: '55vw', minHeight: '260px', maxHeight: '480px'}}
          >
            <img
              src={heroProduct.images[activeImg]}
              alt={heroProduct.title}
              className="h-full w-auto object-contain object-bottom select-none"
              style={{opacity: flickering ? 0.08 : 1, transition: 'opacity 90ms ease'}}
            />
          </div>

          {/* Info below image */}
          <div className="px-6 pt-4 pb-2">
            <h1
              className="font-black uppercase leading-none text-zinc-900 mb-3"
              style={{fontFamily: "'Bebas Neue', 'Inter', sans-serif", fontSize: 'clamp(32px, 8vw, 52px)', letterSpacing: '0.02em'}}
            >
              {heroProduct.title}
            </h1>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-lg font-semibold text-zinc-900">{heroProduct.price}</span>
              <span className="text-sm text-zinc-400 line-through">{heroProduct.compareAtPrice}</span>
            </div>
            <p
              className="text-[13px] leading-[1.75] text-zinc-500 mb-3 overflow-hidden transition-all duration-500"
              style={{maxHeight: expanded ? '160px' : '0px'}}
            >
              {heroProduct.description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-zinc-500 border border-zinc-200 px-4 py-2.5 w-fit mb-5"
            >
              <span>{expanded ? 'Collapse' : 'Click to Expand'}</span>
              <span className="text-base leading-none">{expanded ? '−' : '+'}</span>
            </button>

            {/* Sizes */}
            <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 mb-2">Select Size</p>
            <div className="flex gap-1.5 flex-wrap mb-5">
              {heroProduct.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                  className={`w-10 h-10 text-[11px] font-semibold tracking-wide border transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-transparent text-zinc-600 border-zinc-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <Link
              to={`/products/${heroProduct.handle}`}
              className="block w-full text-center bg-zinc-900 text-white text-[10px] tracking-[0.25em] uppercase px-7 py-4 active:scale-95 transition-all duration-200"
            >
              Add to Cart — {heroProduct.price}
            </Link>
          </div>
        </div>

        {/* ── DESKTOP layout (≥ lg) ── */}
        <div className="hidden lg:grid flex-1 grid-cols-[1fr_auto_1fr] items-center px-10 pt-6 pb-4 gap-10">

          {/* Left: Product info */}
          <div className="flex flex-col justify-center anim-slide-left">
            <h1
              className="font-black uppercase leading-none text-zinc-900 mb-5"
              style={{fontFamily: "'Bebas Neue', 'Inter', sans-serif", fontSize: 'clamp(36px, 4.5vw, 72px)', letterSpacing: '0.02em'}}
            >
              {heroProduct.title}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-lg font-semibold text-zinc-900">{heroProduct.price}</span>
              <span className="text-sm text-zinc-400 line-through">{heroProduct.compareAtPrice}</span>
            </div>
            <p
              className="text-[13px] leading-[1.75] text-zinc-500 max-w-[360px] mb-6 overflow-hidden transition-all duration-500"
              style={{maxHeight: expanded ? '160px' : '64px'}}
            >
              {heroProduct.description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors border border-zinc-200 hover:border-zinc-700 px-4 py-2.5 w-fit"
            >
              <span>{expanded ? 'Collapse' : 'Click to Expand'}</span>
              <span className="text-base leading-none">{expanded ? '−' : '+'}</span>
            </button>
          </div>

          {/* Center: Hero image */}
          <div
            className="relative flex items-end justify-center anim-scale-in"
            style={{width: 'min(42vw, 520px)', minWidth: '260px'}}
          >
            <img
              src={heroProduct.images[activeImg]}
              alt={heroProduct.title}
              className="w-auto object-contain object-bottom select-none"
              style={{height: 'min(78vh, 700px)', opacity: flickering ? 0.08 : 1, transition: 'opacity 90ms ease'}}
            />
          </div>

          {/* Right: Sizes + CTA */}
          <div className="flex flex-col items-end justify-center gap-6 anim-slide-right delay-200">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 mb-3 text-right">Select Size</p>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {heroProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                    className={`w-10 h-10 text-[11px] font-semibold tracking-wide border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-transparent text-zinc-600 border-zinc-300 hover:border-zinc-700 hover:text-zinc-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <Link
              to={`/products/${heroProduct.handle}`}
              className="bg-zinc-900 text-white text-[10px] tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-zinc-700 active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              Add to Cart — {heroProduct.price}
            </Link>
            <div className="flex flex-col items-center gap-2 mt-6 text-zinc-400">
              <div className="w-px h-14 bg-zinc-300 anim-pulse-line" />
              <span className="text-[8px] tracking-[0.4em] uppercase">
                {activeImg < totalImages - 1 ? `${totalImages - activeImg - 1} more` : 'Scroll'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Thumbnail strip — full-width, outside the grid ── */}
        <div className="flex justify-center gap-3 pb-6 px-6">
          {heroProduct.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveImg(i);
                activeImgRef.current = i;
              }}
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                activeImg === i
                  ? 'ring-2 ring-zinc-900 ring-offset-2 opacity-100'
                  : 'opacity-50 hover:opacity-90 hover:ring-1 hover:ring-zinc-400 hover:ring-offset-1'
              }`}
              style={{width: '64px', height: '86px'}}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {activeImg === i && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          MARQUEE
      ───────────────────────────────────────────────────────────────────── */}
      <div className="bg-zinc-900 text-white py-3 overflow-hidden">
        <div className="anim-marquee flex whitespace-nowrap">
          {Array.from({length: 12}).map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase px-8 text-zinc-300">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          CATALOG GRID
      ───────────────────────────────────────────────────────────────────── */}
      <section
        ref={productsRef}
        className="py-24 px-6 sm:px-10 reveal-section"
        style={{backgroundColor: '#F0E9DF', position: 'relative'}}
      >
        {/* Scattered logos — collection */}
        {[
          {top: '4%',  left: '1%',   size: 100, rotate: -10, opacity: 0.090},
          {top: '45%', right: '1%',  size: 130, rotate: 18,  opacity: 0.080},
          {top: '78%', left: '44%',  size: 90,  rotate: -5,  opacity: 0.070},
          {top: '15%', left: '20%',  size: 75,  rotate: 25,  opacity: 0.075},
          {top: '60%', left: '8%',   size: 85,  rotate: -18, opacity: 0.080},
          {top: '30%', right: '8%',  size: 95,  rotate: 12,  opacity: 0.075},
          {top: '70%', right: '15%', size: 70,  rotate: -30, opacity: 0.070},
          {top: '88%', left: '15%',  size: 80,  rotate: 8,   opacity: 0.075},
          {top: '5%',  right: '20%', size: 65,  rotate: -22, opacity: 0.070},
          {top: '50%', left: '30%',  size: 110, rotate: 15,  opacity: 0.065},
          {top: '20%', right: '35%', size: 70,  rotate: -35, opacity: 0.070},
          {top: '85%', right: '40%', size: 85,  rotate: 20,  opacity: 0.068},
        ].map((s, i) => (
          <img
            key={i}
            src="/images/gander/logo-transparent.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              right: (s as {right?: string}).right,
              width: s.size,
              opacity: s.opacity,
              transform: `rotate(${s.rotate}deg)`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 mb-2">New Season</p>
            <h2
              className="font-black uppercase leading-none tracking-tight text-zinc-900"
              style={{fontFamily: "'Bebas Neue', 'Inter', sans-serif", fontSize: 'clamp(28px, 3vw, 48px)'}}
            >
              The Collection
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors border-b border-transparent hover:border-zinc-900 pb-0.5"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {catalogProducts.map((product, i) => (
            <div
              key={product.id}
              className="group reveal-item"
              style={{animationDelay: `${i * 100}ms`}}
            >
              <Link to={`/products/${product.handle}`} className="block">
                <div className="overflow-hidden bg-zinc-200 aspect-[3/4] mb-3 relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-zinc-900">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white text-center">Quick View</p>
                  </div>
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-zinc-900 mb-0.5">{product.title}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">{product.sub}</p>
                <p className="text-sm font-medium text-zinc-700">{product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          EDITORIAL — Split: image left, text right
      ───────────────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div
          ref={editorialImgRef}
          className="overflow-hidden bg-zinc-300 relative min-h-[50vh] md:min-h-0 reveal-img"
        >
          <img
            src={`${G}/anti-Hero-01.jpg`}
            alt="Editorial"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={editorialTextRef}
          className="bg-zinc-900 text-white flex flex-col justify-center px-10 sm:px-16 py-20 reveal-text"
        >
          <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 mb-6">Craftsmanship</p>
          <h2
            className="font-black uppercase leading-none tracking-tight text-white mb-6"
            style={{fontFamily: "'Bebas Neue', 'Inter', sans-serif", fontSize: 'clamp(36px, 4.5vw, 72px)'}}
          >
            Made to<br />Last.
          </h2>
          <p className="text-[13px] text-zinc-400 leading-[1.8] max-w-sm mb-10">
            Every piece in the Gander collection is constructed with precision.
            We believe in quality over quantity — built for real life, designed
            to age with you. Heavyweight. Structured. Unapologetic.
          </p>
          <Link
            to="/collections"
            className="inline-block text-[10px] tracking-[0.3em] uppercase text-white border border-white/40 hover:border-white px-7 py-3.5 w-fit hover:bg-white hover:text-zinc-900 transition-all duration-300"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          LOOKBOOK — Three image mosaic
      ───────────────────────────────────────────────────────────────────── */}
      <section
        ref={lookbookRef}
        className="py-24 px-6 sm:px-10 reveal-section"
        style={{backgroundColor: '#F0E9DF', position: 'relative'}}
      >
        {/* Scattered logos — lookbook */}
        {[
          {top: '8%',  right: '2%',  size: 110, rotate: 10,  opacity: 0.085},
          {top: '50%', left: '0%',   size: 95,  rotate: -20, opacity: 0.075},
          {top: '72%', right: '38%', size: 80,  rotate: 8,   opacity: 0.070},
          {top: '25%', left: '10%',  size: 85,  rotate: -15, opacity: 0.080},
          {top: '60%', right: '12%', size: 100, rotate: 28,  opacity: 0.075},
          {top: '85%', left: '5%',   size: 70,  rotate: -32, opacity: 0.070},
          {top: '15%', left: '35%',  size: 90,  rotate: 18,  opacity: 0.070},
          {top: '40%', right: '25%', size: 75,  rotate: -10, opacity: 0.075},
          {top: '78%', left: '25%',  size: 85,  rotate: 22,  opacity: 0.068},
          {top: '5%',  left: '55%',  size: 65,  rotate: -25, opacity: 0.070},
          {top: '55%', left: '48%',  size: 120, rotate: 5,   opacity: 0.065},
          {top: '90%', right: '20%', size: 75,  rotate: -18, opacity: 0.070},
        ].map((s, i) => (
          <img
            key={i}
            src="/images/gander/logo-transparent.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              right: (s as {right?: string}).right,
              width: s.size,
              opacity: s.opacity,
              transform: `rotate(${s.rotate}deg)`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 mb-2">SS26</p>
            <h2
              className="font-black uppercase leading-none tracking-tight text-zinc-900"
              style={{fontFamily: "'Bebas Neue', 'Inter', sans-serif", fontSize: 'clamp(28px, 3vw, 48px)'}}
            >
              Lookbook
            </h2>
          </div>
          <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400">Spring / Summer 2026</p>
        </div>

        <div className="grid grid-cols-3 gap-2 h-[55vh]">
          {[
            {src: `${G}/long-fix.jpg`,       alt: 'Long shot'},
            {src: `${G}/Side-Zoomed-01.jpg`, alt: 'Side zoom'},
            {src: `${G}/STS.png`,            alt: 'STS'},
          ].map((item, i) => (
            <div
              key={i}
              className="overflow-hidden bg-zinc-200 relative group reveal-item"
              style={{animationDelay: `${i * 120}ms`}}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FEATURE STRIP
      ───────────────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 py-14 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {label: 'Free Shipping', sub: 'On orders over €75'},
            {label: 'Free Returns', sub: '30-day hassle-free'},
            {label: 'Sustainable', sub: 'Responsibly sourced'},
            {label: 'Secure Payment', sub: 'Encrypted checkout'},
          ].map((f) => (
            <div key={f.label} className="text-white">
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">{f.label}</p>
              <p className="text-[11px] text-zinc-500">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
