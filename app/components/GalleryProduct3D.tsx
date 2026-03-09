"use client"

import React, {Suspense, useEffect, useMemo, useRef, useState, createContext, useContext} from 'react';
import * as THREE from 'three';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Html, Sphere} from '@react-three/drei';
import {X, ZoomIn} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────────────────────── */

type Card = {id: string; imageUrl: string; alt: string; title: string};
type CardCtx = {selected: Card | null; setSelected: (c: Card | null) => void; cards: Card[]};

const CardContext = createContext<CardCtx | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCard outside CardProvider');
  return ctx;
}

/* ── Data — gander product images ──────────────────────────────────────────── */

const G = '/images/gander';

const CARDS: Card[] = [
  {id: '1',  imageUrl: `${G}/IMG_8949-2-Enhanced-NR-01.jpg`, alt: 'Hero Shot',     title: 'HERO SHOT'},
  {id: '2',  imageUrl: `${G}/FRONT-01-01.jpg`,               alt: 'Front Clean',   title: 'FRONT — CLEAN'},
  {id: '3',  imageUrl: `${G}/FRONT-01.jpg`,                  alt: 'Front Studio',  title: 'FRONT — STUDIO'},
  {id: '4',  imageUrl: `${G}/Back-SMALL.jpg`,                alt: 'Back Detail',   title: 'BACK — DETAIL'},
  {id: '5',  imageUrl: `${G}/Back-SMALL-01.jpg`,             alt: 'Back Alt',      title: 'BACK — ALT'},
  {id: '6',  imageUrl: `${G}/Side-01.jpg`,                   alt: 'Side Profile',  title: 'SIDE PROFILE'},
  {id: '7',  imageUrl: `${G}/Side-Zoomed-01.jpg`,            alt: 'Side Zoom',     title: 'SIDE — ZOOM'},
  {id: '8',  imageUrl: `${G}/anti-Hero-01.jpg`,              alt: 'Anti Hero',     title: 'ANTI HERO'},
  {id: '9',  imageUrl: `${G}/long-fix.jpg`,                  alt: 'Full Length',   title: 'FULL LENGTH'},
  {id: '10', imageUrl: `${G}/Picture-1.png`,                 alt: 'Look 01',       title: 'LOOK 01'},
  {id: '11', imageUrl: `${G}/Picture-2.png`,                 alt: 'Look 02',       title: 'LOOK 02'},
  {id: '12', imageUrl: `${G}/Picture-3.png`,                 alt: 'Look 03',       title: 'LOOK 03'},
  {id: '13', imageUrl: `${G}/Picture-4.png`,                 alt: 'Look 04',       title: 'LOOK 04'},
  {id: '14', imageUrl: `${G}/STS.png`,                       alt: 'STS',           title: 'STS'},
  {id: '15', imageUrl: `${G}/Back.jpg`,                      alt: 'Back Raw',      title: 'BACK — RAW'},
];

/* ── Starfield ──────────────────────────────────────────────────────────────── */

function StarfieldBg() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x020204, 1);
    el.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const count = 8000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({color: 0xffffff, size: 0.6, sizeAttenuation: true});
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);
    camera.position.z = 10;

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00004;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

/* ── Floating Card ──────────────────────────────────────────────────────────── */

function FloatingCard({card, position}: {
  card: Card;
  position: {x: number; y: number; z: number};
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const {setSelected} = useCard();

  useFrame(({camera}) => {
    groupRef.current?.lookAt(camera.position);
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* Invisible hit plane */}
      <mesh
        onClick={(e) => {e.stopPropagation(); setSelected(card);}}
        onPointerOver={(e) => {e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer';}}
        onPointerOut={(e) => {e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto';}}
      >
        <planeGeometry args={[4.5, 6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transform: hovered ? 'scale(1.14)' : 'scale(1)',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '160px',
            height: '208px',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#0f0f0f',
            padding: '10px',
            boxShadow: hovered
              ? '0 20px 50px rgba(74,222,128,0.35), 0 0 20px rgba(74,222,128,0.15)'
              : '0 12px 30px rgba(0,0,0,0.7)',
            border: hovered ? '1px solid rgba(74,222,128,0.5)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            style={{width: '100%', height: '162px', objectFit: 'cover', borderRadius: '6px', display: 'block'}}
            draggable={false}
          />
          <p style={{
            color: '#fff',
            fontSize: '9px',
            fontFamily: "'Courier New', monospace",
            letterSpacing: '0.15em',
            textAlign: 'center',
            marginTop: '6px',
            opacity: 0.7,
          }}>
            {card.title}
          </p>
        </div>
      </Html>
    </group>
  );
}

/* ── Modal ──────────────────────────────────────────────────────────────────── */

function CardModal() {
  const {selected, setSelected} = useCard();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selected) return null;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) - r.height / 2) / 15;
    const ry = (r.width / 2 - (e.clientX - r.left)) / 15;
    el.style.transition = '';
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)'}}
      onClick={(e) => {if (e.target === e.currentTarget) setSelected(null);}}
    >
      <div className="relative" style={{maxWidth: '380px', width: '100%', margin: '0 16px'}}>
        <button
          onClick={() => setSelected(null)}
          className="absolute -top-10 right-0 text-white hover:text-green-400 transition-colors"
        >
          <X size={24} />
        </button>

        <div
          ref={cardRef}
          style={{
            backgroundColor: '#0f0f0f',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid rgba(74,222,128,0.2)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <img
            src={selected.imageUrl}
            alt={selected.alt}
            style={{width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '10px', display: 'block'}}
          />
          <p style={{
            color: '#fff',
            fontFamily: "'Courier New', monospace",
            fontSize: '11px',
            letterSpacing: '0.3em',
            textAlign: 'center',
            marginTop: '12px',
            opacity: 0.8,
          }}>
            {selected.title}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Galaxy ─────────────────────────────────────────────────────────────────── */

function CardGalaxy() {
  const {cards} = useCard();

  const positions = useMemo(() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    return cards.map((_, i) => {
      const y = 1 - (i / (cards.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = 2 * Math.PI * i / phi;
      const layer = 11 + (i % 3) * 3.5;
      return {x: Math.cos(theta) * r * layer, y: y * layer, z: Math.sin(theta) * r * layer};
    });
  }, [cards.length]);

  return (
    <>
      <Sphere args={[20, 32, 32]}>
        <meshStandardMaterial color="#4ade80" transparent opacity={0.02} wireframe />
      </Sphere>
      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={positions[i]} />
      ))}
    </>
  );
}

/* ── Main export ────────────────────────────────────────────────────────────── */

export default function GalleryProduct3D() {
  const [cards] = useState<Card[]>(CARDS);
  const [selected, setSelected] = useState<Card | null>(null);

  return (
    <CardContext.Provider value={{selected, setSelected, cards}}>
      <div className="absolute inset-0" style={{zIndex: 10}}>
        <StarfieldBg />

        <Canvas
          camera={{position: [0, 0, 18], fov: 60}}
          className="absolute inset-0"
          style={{zIndex: 10}}
          onCreated={({gl}) => {gl.domElement.style.pointerEvents = 'auto';}}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4ade80" />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={6}
              maxDistance={45}
              autoRotate
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
            />
          </Suspense>
        </Canvas>

        {/* Hint */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{zIndex: 20, fontFamily: "'Courier New', monospace"}}
        >
          <p style={{
            color: 'rgba(74,222,128,0.6)',
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Drag to rotate · Scroll to zoom · Click to inspect
          </p>
        </div>

        <CardModal />
      </div>
    </CardContext.Provider>
  );
}
