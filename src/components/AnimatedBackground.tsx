import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create animated water surface with cool tones
    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0f172a) }, // Dark navy
        color2: { value: new THREE.Color(0x0891b2) }, // Cyan
        color3: { value: new THREE.Color(0x14b8a6) }, // Teal
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Create wave patterns
          float elevation = sin(modelPosition.x * 3.0 + time * 0.5) * 0.1;
          elevation += sin(modelPosition.z * 2.0 + time * 0.3) * 0.15;
          elevation += sin(modelPosition.x * 5.0 + modelPosition.z * 3.0 + time * 0.8) * 0.05;
          
          modelPosition.y += elevation;
          vElevation = elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Create flowing gradient based on position and elevation
          float mixStrength = (vElevation + 0.2) * 2.5;
          mixStrength += sin(vUv.x * 10.0 + time * 0.5) * 0.1;
          mixStrength += sin(vUv.y * 8.0 + time * 0.3) * 0.1;
          
          vec3 color = mix(color1, color2, smoothstep(-0.3, 0.3, mixStrength));
          color = mix(color, color3, smoothstep(0.1, 0.8, mixStrength));
          
          // Add subtle transparency and glow
          float alpha = 0.6 + sin(time * 0.5 + vUv.x * 5.0) * 0.1;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const water = new THREE.Mesh(geometry, material);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2;
    scene.add(water);

    // Add floating particles for depth
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Cool tone colors for particles
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.05; // R
        colors[i * 3 + 1] = 0.57; // G (cyan)
        colors[i * 3 + 2] = 0.7; // B
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.08; // R
        colors[i * 3 + 1] = 0.72; // G (teal)
        colors[i * 3 + 2] = 0.65; // B
      } else {
        colors[i * 3] = 0.2; // R
        colors[i * 3 + 1] = 0.8; // G (light cyan)
        colors[i * 3 + 2] = 0.9; // B
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Camera positioning
    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update water animation
      if (material.uniforms) {
        material.uniforms.time.value = elapsedTime;
      }
      
      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.001;
        positions[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.0005;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Subtle camera movement for parallax effect
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.z = 5 + Math.cos(elapsedTime * 0.15) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0891b2 50%, #14b8a6 75%, #0f172a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite'
      }}
    />
  );
};

export default AnimatedBackground;
