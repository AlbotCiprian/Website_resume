"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const total = 260;
    const values = new Float32Array(total * 3);

    for (let i = 0; i < total; i += 1) {
      values[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 8;
      values[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 4.4;
      values[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 4;
    }

    return values;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#7dd3fc" size={0.015} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

const fallbackClassName =
  "absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.24),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(34,197,94,0.16),transparent_36%),linear-gradient(180deg,#050910_0%,#070d18_100%)]";

export default function Background3D() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateState = () => {
      setEnabled(!mobileQuery.matches && !reducedQuery.matches && !reduceMotion);
    };

    updateState();

    mobileQuery.addEventListener("change", updateState);
    reducedQuery.addEventListener("change", updateState);

    return () => {
      mobileQuery.removeEventListener("change", updateState);
      reducedQuery.removeEventListener("change", updateState);
    };
  }, [reduceMotion]);

  if (!enabled) {
    return <div aria-hidden className={fallbackClassName} />;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 3], fov: 58 }}
      >
        <color attach="background" args={["#050910"]} />
        <fog attach="fog" args={["#050910", 2, 7]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[1.2, 2, 3]} intensity={0.6} />
        <ParticleField />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040811]/25 to-[#050910]/85" />
    </div>
  );
}
