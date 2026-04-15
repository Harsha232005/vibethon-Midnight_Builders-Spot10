import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, MeshDistortMaterial, Sphere, Box, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, ChevronRight, FastForward } from 'lucide-react';

// --- Sub-Components for Different Visualizations ---

function DecisionTree3D({ step }) {
  // Simple recursive tree generation
  const nodes = useMemo(() => [
    { pos: [0, 4, 0], label: "Age > 30?", color: "#6366f1" },
    { pos: [-3, 2, 0], label: "Income > 50k", color: "#818cf8" },
    { pos: [3, 2, 0], label: "Student?", color: "#818cf8" },
    { pos: [-4.5, 0, 0], label: "Buy ✓", color: "#22c55e" },
    { pos: [-1.5, 0, 0], label: "Don't ✗", color: "#ef4444" },
    { pos: [1.5, 0, 0], label: "Buy ✓", color: "#22c55e" },
    { pos: [4.5, 0, 0], label: "Don't ✗", color: "#ef4444" },
  ], []);

  return (
    <group>
      {nodes.map((n, i) => {
        const visible = i <= step * 2;
        if (!visible) return null;
        return (
          <group key={i}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Box position={n.pos} args={[2.2, 1, 0.5]}>
                <meshStandardMaterial color={n.color} metalness={0.6} roughness={0.2} />
                <Text position={[0, 0, 0.26]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                  {n.label}
                </Text>
              </Box>
            </Float>
            {/* Connection lines */}
            {i > 0 && (
              <Line 
                points={[n.pos, nodes[Math.floor((i-1)/2)].pos]} 
                color="#4f46e5" 
                lineWidth={1} 
                transparent 
                opacity={0.4} 
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

function NeuralNetwork3D({ step, active }) {
  const layers = [4, 6, 2];
  const nodes = [];
  layers.forEach((count, lIdx) => {
    for (let i = 0; i < count; i++) {
      nodes.push({ x: lIdx * 4 - 4, y: i * 1.5 - (count - 1) * 0.75, layer: lIdx });
    }
  });

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color={node.layer === step % 3 ? "#818cf8" : "#312e81"} 
            emissive={node.layer === step % 3 ? "#818cf8" : "#000"}
            emissiveIntensity={active ? 2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function KMeans3D({ step, active }) {
  const points = useMemo(() => Array.from({ length: 100 }, () => ({
    pos: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
    color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
  })), []);

  const centroids = useMemo(() => [
    { pos: [-3, 3, 0], color: "red" },
    { pos: [3, -3, 0], color: "blue" },
    { pos: [0, 0, 3], color: "green" },
  ], []);

  return (
    <group>
      {points.map((p, i) => (
        <Sphere key={i} position={p.pos} args={[0.1]}>
          <meshStandardMaterial color={p.color} />
        </Sphere>
      ))}
      {centroids.map((c, i) => (
        <group key={i} position={c.pos}>
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={active ? 1 : 0} />
          </mesh>
          <Text position={[0, 0.8, 0]} fontSize={0.3} color="white">K{i+1}</Text>
        </group>
      ))}
    </group>
  );
}

function GradientDescent3D({ step, active }) {
  const meshRef = useRef();
  
  // Create a 3D landscape
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x/2) * Math.cos(y/2) * 2 + (x*x + y*y) / 20;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const ballPos = useMemo(() => {
    const p = [];
    let curX = 4, curY = 4;
    for(let i=0; i<50; i++) {
        p.push([curX, curY, Math.sin(curX/2) * Math.cos(curY/2) * 2 + (curX*curX + curY*curY) / 20]);
        curX *= 0.9; curY *= 0.9;
    }
    return p;
  }, []);

  return (
    <group rotation={[-Math.PI / 3, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#4338ca" wireframe opacity={0.3} transparent />
      </mesh>
      <Sphere position={ballPos[Math.min(step, 49)]} args={[0.3]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={active ? 1 : 0} />
      </Sphere>
    </group>
  );
}


// --- Main Wrapper Component ---

export default function AlgorithmVisualizer({ type = 'decision-trees' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep(s => s + 1);
      }, 1000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed]);

  const reset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const renderVisualizer = () => {
    switch(type) {
      case 'decision-trees': return <DecisionTree3D step={step} />;
      case 'neural-networks': return <NeuralNetwork3D step={step} active={isPlaying} />;
      case 'clustering': return <KMeans3D step={step} active={isPlaying} />;
      case 'gradient-descent': return <GradientDescent3D step={step} active={isPlaying} />;
      default: return <DecisionTree3D step={step} />;
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner group">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <OrbitControls enablePan={false} maxDistance={25} minDistance={5} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <Suspense fallback={null}>
          {renderVisualizer()}
        </Suspense>

        <gridHelper args={[20, 20, 0x333333, 0x111111]} position={[0, -5, 0]} />
      </Canvas>

      {/* Overlays */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
        <h3 className="text-white font-bold text-xl drop-shadow-lg tracking-tight">3D Visualizer</h3>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">{type.replace('-', ' ')} Simulation</p>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <button onClick={reset} className="p-2 text-slate-400 hover:text-white transition-colors" title="Reset">
          <RotateCcw size={20} />
        </button>
        
        <div className="h-6 w-[1px] bg-white/10" />

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg transition-all active:scale-95"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={() => setStep(s => s + 1)} className="p-2 text-slate-400 hover:text-white transition-colors" title="Step Forward">
          <ChevronRight size={24} />
        </button>

        <div className="h-6 w-[1px] bg-white/10" />

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Speed</span>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-24 accent-indigo-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono text-indigo-400 w-8">{speed}x</span>
        </div>
      </div>
      
      {/* Step Indicator */}
      <div className="absolute bottom-6 right-8 text-slate-500 font-mono text-xs tabular-nums">
        STEP: {step.toString().padStart(4, '0')}
      </div>
    </div>
  );
}

// Adding Suspense for lazy 3D loading
import { Suspense } from 'react';
