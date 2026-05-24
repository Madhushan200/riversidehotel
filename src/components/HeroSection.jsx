import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Compass, Sparkles } from 'lucide-react';

// Curated high-res luxury hotel images (Unsplash links)
const CARDS_DATA = [
  {
    title: 'Deluxe Rooms',
    desc: 'Uncompromising comfort overlooking the winding Kelani river system.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
    tag: 'Luxury Stay'
  },
  {
    title: 'Family Suite',
    desc: 'Spacious elegance designed for memorable family gatherings.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    tag: 'Spacious Lodge'
  },
  {
    title: 'Mountain View Vista',
    desc: 'Waking up to Badulla’s iconic mist-crowned green peaks.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    tag: 'Scenic Escape'
  },
  {
    title: 'The River Grill',
    desc: 'Authentic Sri Lankan spices meeting curated international fine dining.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    tag: 'Fine Dining'
  },
  {
    title: 'Infinity River Pool',
    desc: 'Cool waters blending seamlessly into the natural river currents.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop',
    tag: 'Wellness'
  }
];

const HeroSection = () => {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto rotate cards
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % CARDS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Card Tilt Micro-interaction
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Three.js River Landscape Background
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#031422', 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 2, -10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight('#072B49', 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#D9A441', 2.0);
    sunLight.position.set(10, 30, -20);
    scene.add(sunLight);

    // 1. Water Plane (River)
    const waterGeometry = new THREE.PlaneGeometry(120, 150, 100, 100);
    waterGeometry.rotateX(-Math.PI / 2);

    // Water Material Shader
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorWater: { value: new THREE.Color('#072B49') },
        uColorDeep: { value: new THREE.Color('#031422') },
        uColorHighlight: { value: new THREE.Color('#D9A441') },
        uSunPos: { value: new THREE.Vector3(10, 30, -20) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 pos = position;
          // Water wave waves equations
          float wave1 = sin(pos.x * 0.15 + uTime * 1.5) * cos(pos.z * 0.1 + uTime * 0.8) * 1.5;
          float wave2 = cos(pos.x * 0.35 - uTime * 2.2) * sin(pos.z * 0.2 + uTime * 1.2) * 0.6;
          pos.y += wave1 + wave2;

          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPosition = worldPos.xyz;
          
          // Approximate normals for simple lighting
          vec3 tangentX = vec3(1.0, 0.15 * 0.15 * cos(position.x * 0.15 + uTime * 1.5), 0.0);
          vec3 tangentZ = vec3(0.0, 0.1 * 1.5 * -sin(position.z * 0.1 + uTime * 0.8), 1.0);
          vNormal = normalize(cross(tangentZ, tangentX));

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorWater;
        uniform vec3 uColorDeep;
        uniform vec3 uColorHighlight;
        uniform vec3 uSunPos;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          vec3 lightDir = normalize(uSunPos - vWorldPosition);
          
          // Ambient + Diffuse
          float ndl = max(dot(vNormal, lightDir), 0.0);
          
          // Specular sunlight highlights
          vec3 reflectDir = reflect(-lightDir, vNormal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
          
          // River depth mix
          float depthFactor = smoothstep(-5.0, 5.0, vWorldPosition.y);
          vec3 waterBaseColor = mix(uColorDeep, uColorWater, depthFactor + 0.3);
          
          // Add highlights
          vec3 finalColor = waterBaseColor + (uColorHighlight * spec * 1.8) + (ndl * uColorWater * 0.2);
          
          // Fog depth calculation
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = exp2(-0.015 * 0.015 * depth * depth * 1.442695);
          fogFactor = clamp(fogFactor, 0.0, 1.0);
          
          gl_FragColor = vec4(mix(vec3(0.011, 0.078, 0.137), finalColor, fogFactor), 1.0);
        }
      `,
      transparent: false,
    });

    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.position.set(0, -2, -15);
    scene.add(waterMesh);

    // 2. Mountains (Background silhouettes)
    const mGroup = new THREE.Group();
    const mountainColors = ['#020d16', '#031422', '#05223a'];
    
    // Create 3 layered mountain ranges
    for (let j = 0; j < 3; j++) {
      const zPos = -40 - j * 20;
      const count = 40;
      const step = 6;
      const points = [];
      
      points.push(new THREE.Vector2(-100, -30));
      for (let i = 0; i <= count; i++) {
        const x = -80 + i * step;
        const baseHeight = 12 - j * 3;
        // Layered sine wave mountain patterns
        const y = Math.sin(x * 0.07 + j * 1.5) * 5 + Math.cos(x * 0.13 - j) * 3 + baseHeight;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(100, -30));

      const shape = new THREE.Shape(points);
      const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.5, bevelThickness: 0.5 };
      const mountainGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mountainMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(mountainColors[j]),
      });
      const mountainMesh = new THREE.Mesh(mountainGeom, mountainMat);
      mountainMesh.position.set(0, -5, zPos);
      mGroup.add(mountainMesh);
    }
    scene.add(mGroup);

    // 3. Floating Light Particles (Fireflies)
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      // spread particles over the river area
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = Math.random() * 20 + 1; // floating off water
      particlePositions[i * 3 + 2] = (Math.random() - 0.8) * 100;
      
      particleSpeeds.push({
        y: Math.random() * 0.03 + 0.01,
        x: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas Texture for smooth circular particles
    const canvasP = document.createElement('canvas');
    canvasP.width = 16;
    canvasP.height = 16;
    const ctx = canvasP.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(217, 164, 65, 1)');
    grad.addColorStop(1, 'rgba(217, 164, 65, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(canvasP);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const fireflies = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(fireflies);

    // 4. Mist Clouds (Slow moving transparent shapes)
    const mistGroup = new THREE.Group();
    const mistGeometry = new THREE.PlaneGeometry(30, 20);
    
    // Create mist texture
    const canvasMist = document.createElement('canvas');
    canvasMist.width = 128;
    canvasMist.height = 128;
    const ctxM = canvasMist.getContext('2d');
    const gradM = ctxM.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradM.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
    gradM.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    gradM.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctxM.fillStyle = gradM;
    ctxM.fillRect(0, 0, 128, 128);
    const mistTexture = new THREE.CanvasTexture(canvasMist);

    const mistMaterial = new THREE.MeshBasicMaterial({
      map: mistTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < 6; i++) {
      const mist = new THREE.Mesh(mistGeometry, mistMaterial);
      mist.position.set(
        (Math.random() - 0.5) * 60,
        Math.random() * 5 + 2,
        -10 - Math.random() * 30
      );
      mist.rotation.x = -Math.PI / 2.2;
      mistGroup.add(mist);
    }
    scene.add(mistGroup);

    // 5. Flying Birds
    const birdCount = 8;
    const birdGeometry = new THREE.BufferGeometry();
    const birdPositions = new Float32Array(birdCount * 3);
    const birdGroup = new THREE.Group();

    // V Formation template
    const vOffset = [
      { x: 0, y: 0, z: 0 },
      { x: -3, y: 1, z: 2 },
      { x: 3, y: 1, z: 2 },
      { x: -6, y: 2, z: 4 },
      { x: 6, y: 2, z: 4 },
      { x: -9, y: 3, z: 6 },
      { x: 9, y: 3, z: 6 },
      { x: 12, y: 4, z: 8 }
    ];

    // Create small meshes for birds (simple flying wings geometries)
    const birdMeshes = [];
    const wingGeom = new THREE.BufferGeometry();
    // Simple 3 vertices triangle representing half wing
    const vertices = new Float32Array([
      0, 0, 0,
      -1, 0.2, 0.5,
      0, 0, 1,
      
      0, 0, 0,
      1, 0.2, 0.5,
      0, 0, 1
    ]);
    wingGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const wingMat = new THREE.MeshBasicMaterial({ color: '#010910', side: THREE.DoubleSide });

    for (let i = 0; i < birdCount; i++) {
      const bMesh = new THREE.Mesh(wingGeom, wingMat);
      bMesh.scale.set(0.3, 0.3, 0.3);
      bMesh.position.set(-30 + vOffset[i].x, 20 + vOffset[i].y, -40 + vOffset[i].z);
      birdGroup.add(bMesh);
      birdMeshes.push(bMesh);
    }
    scene.add(birdGroup);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId = null;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update water uniforms
      waterMaterial.uniforms.uTime.value = elapsedTime;

      // Update fireflies position
      const positions = fireflies.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const speed = particleSpeeds[i];
        
        // drift upwards
        positions[i * 3 + 1] += speed.y;
        // drift horizontally
        positions[i * 3] += speed.x + Math.sin(elapsedTime * 0.5 + speed.phase) * 0.005;

        // Reset if float too high
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = 1;
          positions[i * 3] = (Math.random() - 0.5) * 80;
        }
      }
      fireflies.geometry.attributes.position.needsUpdate = true;

      // Update mist clouds
      mistGroup.children.forEach((cloud, index) => {
        cloud.position.x += 0.015;
        if (cloud.position.x > 50) {
          cloud.position.x = -50;
        }
      });

      // Update flying birds
      birdGroup.position.x += 0.06;
      birdGroup.position.z += 0.02;
      birdGroup.position.y = Math.sin(elapsedTime * 0.2) * 2;
      
      if (birdGroup.position.x > 80) {
        birdGroup.position.x = -80;
        birdGroup.position.z = -20;
      }

      // Flapping wings
      birdMeshes.forEach((mesh) => {
        const wingFlap = Math.sin(elapsedTime * 8.0) * 0.6;
        mesh.rotation.z = wingFlap;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Window Resize handling
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      waterGeometry.dispose();
      waterMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
      mistGeometry.dispose();
      mistMaterial.dispose();
      mistTexture.dispose();
      wingGeom.dispose();
      wingMat.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-river-dark pt-20">
      
      {/* 3D Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Sun glow layer */}
      <div className="absolute top-0 left-[60%] w-[600px] h-[600px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      {/* Bottom overlay grid */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-river-dark to-transparent z-10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-20">
        
        {/* Left Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col text-left space-y-6"
        >
          <div className="flex items-center space-x-2">
            <span className="h-[1px] w-8 bg-gold"></span>
            <span className="text-gold uppercase tracking-widest text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Riverside Hotel • Sri Lanka
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-royal tracking-wide leading-tight">
            RIVERSIDE
            <span className="block font-sans text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-gold mt-2">
              Experience Luxury Beside Nature
            </span>
          </h1>

          <p className="text-royal/80 text-base md:text-lg max-w-xl font-light leading-relaxed">
            Discover peaceful riverside escapes with elegant stays, breathtaking mountain views, and authentic Sri Lankan hospitality. Nestled in the heart of lush Badulla.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#booking"
              className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-river-dark bg-gold hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-gold/10 glow-gold-hover"
            >
              Book Your Stay
            </a>
            <a
              href="#rooms"
              className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-royal border border-royal/30 hover:border-gold hover:text-gold bg-royal/5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Explore Rooms
            </a>
          </div>
        </motion.div>

        {/* Right 3D Floating Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${mousePos.y * 20}deg) rotateY(${mousePos.x * 20}deg)`,
              transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="w-full max-w-[360px] h-[480px] rounded-3xl p-6 glass border border-royal/15 flex flex-col justify-between shadow-2xl relative group cursor-pointer hover:border-gold/30 transition-colors duration-500 overflow-hidden"
          >
            {/* Glossy inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-royal/5 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <span className="px-3.5 py-1 rounded-full text-xs uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 font-semibold">
                {CARDS_DATA[activeCard].tag}
              </span>
              <Compass className="h-5 w-5 text-royal/40 group-hover:text-gold group-hover:rotate-45 transition-all duration-700" />
            </div>

            {/* Slider Images with AnimatePresence */}
            <div 
              style={{ transform: 'translateZ(30px)' }}
              className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-inner-lg mt-4 z-10"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeCard}
                  src={CARDS_DATA[activeCard].image}
                  alt={CARDS_DATA[activeCard].title}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-river-dark/60 to-transparent"></div>
            </div>

            {/* Card Description */}
            <div 
              style={{ transform: 'translateZ(40px)' }}
              className="flex flex-col text-left space-y-2 mt-4 z-10"
            >
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${activeCard}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-serif font-bold text-royal group-hover:text-gold transition-colors duration-300"
                >
                  {CARDS_DATA[activeCard].title}
                </motion.h3>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeCard}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="text-royal/70 text-xs md:text-sm leading-relaxed"
                >
                  {CARDS_DATA[activeCard].desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center space-x-2.5 mt-2 z-10">
              {CARDS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCard(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeCard ? 'w-5 bg-gold' : 'w-1.5 bg-royal/30 hover:bg-royal/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator with pulsing ripple */}
      <a
        href="#welcome"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-2 z-20 group"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-royal/50 group-hover:text-gold transition-colors duration-300">
          Scroll
        </span>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-6 h-6 border border-gold/40 rounded-full scale-100 opacity-80 animate-ping"></div>
          <div className="absolute w-2 h-2 bg-gold rounded-full"></div>
        </div>
      </a>

    </section>
  );
};

export default HeroSection;
