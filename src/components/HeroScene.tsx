import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, ContactShadows, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// A single floating digital node (e.g. Browser, Database, AI)
function DigitalNode({ position, color, speed, args, type }: any) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * (speed * 0.5);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={ref} castShadow receiveShadow>
        {type === 'box' ? <boxGeometry args={args} /> : type === 'sphere' ? <sphereGeometry args={args} /> : <octahedronGeometry args={args} />}
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.2}
          metalness={0.8}
          transmission={0.5} // glass-like
          thickness={1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Removed Connections

export default function HeroScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
      <pointLight position={[10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {/* Background Starfield */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Floating System */}
      <group position={[0, 0, 0]}>
        {/* Core Architecture */}
        <DigitalNode position={[0, 0, 0]} color="#ffffff" speed={1} args={[1.5, 1.5, 1.5]} type="box" />
        
        {/* AI Element */}
        <DigitalNode position={[2.5, 1.5, -1]} color="#8b5cf6" speed={1.5} args={[0.6]} type="octahedron" />
        
        {/* Database Node */}
        <DigitalNode position={[-2.5, -1, 0]} color="#10b981" speed={0.8} args={[0.5, 32, 32]} type="sphere" />
        
        {/* API Connection */}
        <DigitalNode position={[1.5, -2, -2]} color="#3b82f6" speed={1.2} args={[0.8, 0.8, 0.8]} type="box" />
        
        <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.4} color="#ffffff" />
      </group>

      {/* Environment reflections */}
      <Environment preset="city" />
      
      {/* Ground Shadow */}
      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
    </>
  );
}
