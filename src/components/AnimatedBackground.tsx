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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create terrain-like geometry with elevation data simulation
    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    const vertices = geometry.attributes.position.array as Float32Array;

    // Generate terrain elevation using Perlin-like noise
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      
      // Create elevation based on distance and noise
      const distance = Math.sqrt(x * x + y * y);
      const elevation = Math.sin(distance * 0.5) * 0.3 + 
                       Math.sin(x * 0.8) * 0.2 + 
                       Math.sin(y * 0.6) * 0.15;
      
      vertices[i + 2] = elevation;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // Shader material for water/terrain effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0ea5e9) },
        color2: { value: new THREE.Color(0x06b6d4) },
        color3: { value: new THREE.Color(0x0891b2) }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          
          vec3 pos = position;
          
          // Add flowing water animation
          pos.z += sin(pos.x * 2.0 + time * 2.0) * 0.1;
          pos.z += sin(pos.y * 1.5 + time * 1.5) * 0.08;
          pos.z += sin((pos.x + pos.y) * 1.0 + time * 3.0) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          float elevation = vPosition.z;
          
          // Create flowing patterns
          float flow = sin(vUv.x * 10.0 + time * 2.0) * sin(vUv.y * 8.0 + time * 1.5);
          
          // Mix colors based on elevation and flow
          vec3 color = mix(color1, color2, elevation + 0.5);
          color = mix(color, color3, flow * 0.3);
          
          // Add transparency based on elevation
          float alpha = 0.6 + elevation * 0.4;
          alpha *= (0.8 + flow * 0.2);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -2;
    scene.add(terrain);

    // Add particle system for rainfall/data points
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = Math.random() * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i * 3 + 1] = -Math.random() * 0.05 - 0.01;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      // Update terrain shader
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Update particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i * 3];
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // Reset particles that fall too low
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 10;
          positions[i * 3] = (Math.random() - 0.5) * 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.z = 8 + Math.cos(time * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
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

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
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
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;