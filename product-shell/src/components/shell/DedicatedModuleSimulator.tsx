'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Dedicated 3D Interactive Scientific Simulators for Modules 2 through 18
// Built directly inside the platform with Three.js & React Three Fiber (R3F).
// Full 3D orbital controls, spatial geometry, real-time particle flows,
// and zero external localhost dependencies (100% self-contained on start).
// ============================================================================

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  Activity,
  Layers,
  CloudRain,
  Wind,
  Droplets,
  AlertTriangle,
  Store,
  TrendingUp,
  Compass,
  Radio,
  Sliders,
  CheckCircle2,
  Box,
  Truck,
  RotateCcw,
  Sparkles,
  BarChart3,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Bug,
  Thermometer,
  Trees,
  Scale,
  Maximize2
} from 'lucide-react';

interface DedicatedModuleSimulatorProps {
  moduleNumber: number;
  title: string;
  category?: string;
  basin: {
    id: string;
    nameEn: string;
    nameHi: string;
    coords: string;
    hazardEn: string;
    hazardHi: string;
    soilTypeEn: string;
    soilTypeHi: string;
  };
  horizon: string;
  locale: 'en' | 'hi';
  realtimeData: any;
  port?: number;
}

// ============================================================================
// 3D SCENE ACTORS FOR EACH SCIENTIFIC MODULE (M02 - M18)
// Every scene is physically grounded with realistic topography, structures & data
// ============================================================================

// --- M02: 3D Vertical Sounding & Boundary Layer Inversion Column ---
function M02SoundingScene({ altitude }: { altitude: number }) {
  const probeY = -1.8 + (altitude / 2400) * 3.8;

  const tempPoints = useMemo(() => [
    new THREE.Vector3(-1.1, -1.8, 0),
    new THREE.Vector3(-0.6, -0.9, 0.3),
    new THREE.Vector3(-0.2, probeY, 0.2),
    new THREE.Vector3(0.5, 1.1, -0.2),
    new THREE.Vector3(1.1, 1.9, 0)
  ], [probeY]);

  const dewPoints = useMemo(() => [
    new THREE.Vector3(-1.5, -1.8, 0),
    new THREE.Vector3(-0.9, -0.9, 0.2),
    new THREE.Vector3(-0.7, probeY, 0.1),
    new THREE.Vector3(-0.3, 1.1, -0.3),
    new THREE.Vector3(0.2, 1.9, 0)
  ], [probeY]);

  const tempCurve = useMemo(() => new THREE.CatmullRomCurve3(tempPoints), [tempPoints]);
  const dewCurve = useMemo(() => new THREE.CatmullRomCurve3(dewPoints), [dewPoints]);

  return (
    <group>
      {/* Ground Substrate Dish */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.15, 32]} />
        <meshStandardMaterial color="#0c1829" roughness={0.8} />
      </mesh>
      <gridHelper args={[5, 10, '#38bdf8', '#1e293b']} position={[0, -1.82, 0]} />

      {/* 5 Isobaric Pressure Discs (1000 to 200 hPa) */}
      {[-1.8, -0.9, 0.0, 0.9, 1.8].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 2.0, 32]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.15} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Inversion Trap Layer (Red Glowing Disc at Probe Altitude) */}
      <mesh position={[0, probeY, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 2.2, 32]} />
        <meshBasicMaterial color="#ef4444" opacity={0.4} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Central Radiosonde Mast */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.8, 16]} />
        <meshBasicMaterial color="#64748b" opacity={0.5} transparent />
      </mesh>

      {/* Temperature 3D Spline (Gold) */}
      <mesh>
        <tubeGeometry args={[tempCurve, 40, 0.045, 8, false]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Dewpoint 3D Spline (Cyan) */}
      <mesh>
        <tubeGeometry args={[dewCurve, 40, 0.04, 8, false]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Interactive Sounding Probe Orb */}
      <mesh position={[0, probeY, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

// --- M03: 3D Extreme Anomaly (EFI) & Climatological Shift Surface ---
function M03AnomalyScene({ mode }: { mode: 'precip' | 'heat' | 'wind' }) {
  const ringRef = useRef<THREE.Group>(null);
  const primaryColor = mode === 'precip' ? '#38bdf8' : mode === 'heat' ? '#ef4444' : '#f59e0b';

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group>
      {/* 3D Base Landscape */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6.2, 6.2]} />
        <meshStandardMaterial color="#08101e" roughness={0.9} />
      </mesh>
      <gridHelper args={[6, 12, '#38bdf8', '#1e293b']} position={[0, -0.98, 0]} />

      {/* Anomaly Mountain Crest (Extreme Tail Departure Peak) */}
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[2.2, 1.8, 32, 16, true]} />
        <meshStandardMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[2.18, 1.76, 32, 8, false]} />
        <meshStandardMaterial
          color={primaryColor}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Anomaly Core Epicenter Beacon */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={primaryColor} />
      </mesh>

      {/* 3-Sigma Contour Isoline Rings (+1σ, +2σ, +3σ Departures) */}
      <group ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[0.55, 0.62, 32]} />
          <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.1, 1.18, 32]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} opacity={0.8} transparent />
        </mesh>
        <mesh>
          <ringGeometry args={[1.7, 1.78, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} opacity={0.5} transparent />
        </mesh>
      </group>
    </group>
  );
}

// --- M04: 3D Volumetric Event Footprint & Multi-Zone Bounding ---
function M04FootprintScene({ zone, intensity }: { zone: 'all' | 'core' | 'primary'; intensity: number }) {
  const updraftRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (updraftRef.current) {
      updraftRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  const showCore = zone === 'all' || zone === 'core';
  const showPrimary = zone === 'all' || zone === 'primary';

  return (
    <group>
      {/* 3D Marine/Land Substrate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6.2, 6.2]} />
        <meshStandardMaterial color="#071221" roughness={0.8} />
      </mesh>
      <gridHelper args={[6, 12, '#0ea5e9', '#0f172a']} position={[0, -0.98, 0]} />

      {/* Bay of Bengal / Odisha Coast Arc */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -2.6, -0.96, 1.6,
                -1.8, -0.96, 0.7,
                -1.0, -0.96, -0.1,
                -0.2, -0.96, -0.8,
                0.8, -0.96, -1.6
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" linewidth={2} />
      </line>

      {/* Peripheral Zone Base Contour Ring */}
      <mesh position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.15, 36]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} opacity={0.55} transparent />
      </mesh>

      {/* Primary Hazard Zone (Translucent Amber Conical Volume) */}
      {showPrimary && (
        <mesh position={[0, -0.15, 0]}>
          <coneGeometry args={[1.7, 1.7 * (intensity / 50), 24, 8, true]} />
          <meshStandardMaterial color="#f59e0b" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Core Convective Storm Cylinder */}
      {showCore && (
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.55, 0.85, 2.1 * (intensity / 50), 24, 6, true]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.65} side={THREE.DoubleSide} wireframe />
        </mesh>
      )}

      {/* Rotating Convective Updraft Rings */}
      <group ref={updraftRef} position={[0, 0, 0]}>
        {[-0.5, 0.1, 0.7].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.25 + i * 0.15, 0.3 + i * 0.15, 16]} />
            <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} opacity={0.8} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- M05: 3D Storm Trajectory Space & Ensemble Spaghetti Strands ---
function M05TrajectoryScene({ filter }: { filter: 'all' | 'extreme' | 'mean' }) {
  const particleRef = useRef<THREE.Mesh>(null);

  const strands = useMemo(() => {
    const arr = [];
    const count = filter === 'mean' ? 1 : filter === 'extreme' ? 3 : 8;
    for (let i = 0; i < count; i++) {
      const spreadX = (i - count / 2) * 0.28;
      const spreadZ = (Math.sin(i) * 0.4);
      const pts = [
        new THREE.Vector3(2.5, -1.5, 1.2),
        new THREE.Vector3(1.2 + spreadX * 0.5, -0.6, 0.6 + spreadZ * 0.5),
        new THREE.Vector3(0.0 + spreadX, 0.2, 0.0 + spreadZ),
        new THREE.Vector3(-1.4 + spreadX * 0.4, 0.8, -0.4 + spreadZ * 0.3),
        new THREE.Vector3(-2.2, 1.2, -0.6)
      ];
      arr.push({
        curve: new THREE.CatmullRomCurve3(pts),
        color: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#38bdf8'
      });
    }
    return arr;
  }, [filter]);

  const meanCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.5, -1.5, 1.2),
      new THREE.Vector3(1.2, -0.6, 0.6),
      new THREE.Vector3(0.0, 0.2, 0.0),
      new THREE.Vector3(-1.4, 0.8, -0.4),
      new THREE.Vector3(-2.2, 1.2, -0.6)
    ]);
  }, []);

  useFrame(({ clock }) => {
    if (particleRef.current) {
      const t = (clock.getElapsedTime() * 0.25) % 1.0;
      const pt = meanCurve.getPoint(t);
      particleRef.current.position.copy(pt);
    }
  });

  return (
    <group>
      {/* Bay of Bengal Sea Substrate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[6.5, 6.5]} />
        <meshStandardMaterial color="#06101e" />
      </mesh>

      {/* Coastline Curve */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -3.0, 2.2, -0.8,
                -2.4, 1.5, -0.7,
                -2.0, 0.8, -0.5,
                -1.6, -0.2, -0.2,
                -1.2, -1.4, 0.2,
                -0.8, -2.4, 0.6
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" opacity={0.5} transparent linewidth={2} />
      </line>

      {/* Ensemble Spaghetti Strands */}
      {strands.map((s, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[s.curve, 40, idx === 0 ? 0.035 : 0.018, 8, false]} />
          <meshBasicMaterial color={s.color} opacity={0.65} transparent />
        </mesh>
      ))}

      {/* Bold Consensus Mean Track */}
      <mesh>
        <tubeGeometry args={[meanCurve, 40, 0.045, 8, false]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Traveling Cyclone Eye Particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Landfall Beacon Ring at Puri */}
      <group position={[-2.2, 1.2, -0.6]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.28, 32]} />
          <meshBasicMaterial color="#ef4444" opacity={0.8} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// --- M06: 3D Multimodal Probability Field & Exceedance Terraces ---
function M06ProbabilityScene({ threshold }: { threshold: number }) {
  const terraces = useMemo(() => [
    { label: 'P>25mm', y: -0.7, color: '#0284c7', r: 2.2, opacity: 0.35 },
    { label: 'P>50mm', y: -0.3, color: '#06b6d4', r: 1.7, opacity: 0.5 },
    { label: 'P>100mm', y: 0.2, color: '#f59e0b', r: 1.15, opacity: 0.7 },
    { label: 'P>150mm', y: 0.7, color: '#ef4444', r: 0.65, opacity: 0.9 }
  ], []);

  const activeIndex = threshold >= 150 ? 3 : threshold >= 100 ? 2 : threshold >= 50 ? 1 : 0;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#08101e" roughness={0.9} />
      </mesh>
      <gridHelper args={[6, 12, '#06b6d4', '#0f172a']} position={[0, -0.98, 0]} />

      {terraces.map((t, idx) => (
        <group key={t.label} position={[0, t.y, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[t.r, t.r + 0.15, 0.18, 32]} />
            <meshStandardMaterial
              color={t.color}
              transparent
              opacity={idx <= activeIndex ? t.opacity : 0.15}
            />
          </mesh>
        </group>
      ))}

      {/* 3D Vertical Transect Cut Plane */}
      <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[3.2, 2.0]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// --- M07: 3D 12km to 1km Diffusion Downscaling Grid Transition ---
function M07DownscalingScene({ step }: { step: number }) {
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (laserRef.current) {
      laserRef.current.position.x = Math.sin(clock.getElapsedTime() * 1.5) * 1.8;
    }
  });

  const fineAlpha = Math.min(1, Math.max(0.1, step / 50));

  return (
    <group>
      {/* Lower Super-Resolved 1km High-Res Terrain Mesh */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 4.4, 32, 32]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.3 + fineAlpha * 0.6}
        />
      </mesh>

      {/* Upper Coarse 12km NWP Voxels */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, xi) =>
        [-1.2, -0.4, 0.4, 1.2].map((z, zi) => (
          <mesh key={`${xi}-${zi}`} position={[x, 0.35, z]}>
            <boxGeometry args={[0.7, 0.25, 0.7]} />
            <meshStandardMaterial
              color="#38bdf8"
              transparent
              opacity={Math.max(0.08, 0.7 - fineAlpha * 0.5)}
              wireframe
            />
          </mesh>
        ))
      )}

      {/* Scanning Denoising Reverse-SDE Laser Beam */}
      <mesh ref={laserRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[0.04, 1.8, 4.4]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// --- M08: 3D Multi-Model Extreme Verification & Split Comparison ---
function M08ComparisonScene({ splitPos }: { splitPos: number }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>

      {/* Left Hemisphere: Coarse Model (Smoothed Low Peak) */}
      <mesh position={[-1.2, -0.2, 0]}>
        <sphereGeometry args={[1.2, 24, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Right Hemisphere: 4D Diffusion (Preserved Extreme Sharp Peak) */}
      <mesh position={[1.2, 0.1, 0]}>
        <coneGeometry args={[1.3, 2.2, 24, 8, true]} />
        <meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.7} />
      </mesh>

      {/* Vertical Split Divider Blade */}
      <mesh position={[splitPos, 0, 0]}>
        <boxGeometry args={[0.04, 2.8, 3.2]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Extreme Preservation Needles */}
      <mesh position={[1.2, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
}

// --- M09: 3D Crop System Exposure Field (Odisha District Parcels & Storm Footprint) ---
function M09CropExposureScene({ cropFilter, leadHour }: { cropFilter: string; leadHour: number }) {
  const footprintRingRef = useRef<THREE.Group>(null);

  const districtNodes = useMemo(() => [
    { name: 'Balasore', pos: new THREE.Vector3(-1.4, 0.05, -1.8) },
    { name: 'Bhadrak', pos: new THREE.Vector3(-0.6, 0.05, -1.0) },
    { name: 'Kendrapara', pos: new THREE.Vector3(0.2, 0.05, -0.2) },
    { name: 'Jagatsinghpur', pos: new THREE.Vector3(0.8, 0.05, 0.6) },
    { name: 'Puri Delta', pos: new THREE.Vector3(0.0, 0.05, 1.4) },
    { name: 'Cuttack Basin', pos: new THREE.Vector3(-1.2, 0.05, 0.4) },
  ], []);

  const parcels = useMemo(() => [
    { id: 1, pos: [-1.6, -1.6], crop: 'PADDY', exp: true },
    { id: 2, pos: [-1.2, -1.9], crop: 'SUGARCANE', exp: true },
    { id: 3, pos: [-0.8, -1.2], crop: 'PADDY', exp: true },
    { id: 4, pos: [-0.4, -0.9], crop: 'PULSES', exp: true },
    { id: 5, pos: [0.0, -0.4], crop: 'PADDY', exp: true },
    { id: 6, pos: [0.4, 0.0], crop: 'GROUNDNUT', exp: true },
    { id: 7, pos: [0.7, 0.4], crop: 'PADDY', exp: true },
    { id: 8, pos: [0.9, 0.8], crop: 'SUGARCANE', exp: true },
    { id: 9, pos: [-0.2, 1.2], crop: 'PADDY', exp: false },
    { id: 10, pos: [-0.1, 1.6], crop: 'PULSES', exp: false },
    { id: 11, pos: [-1.0, 0.2], crop: 'GROUNDNUT', exp: false },
    { id: 12, pos: [-1.4, 0.6], crop: 'PADDY', exp: false },
  ], []);

  useFrame(({ clock }) => {
    if (footprintRingRef.current) {
      footprintRingRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  const getCropColor = (crop: string) => {
    switch (crop) {
      case 'PADDY': return '#10b981';
      case 'SUGARCANE': return '#84cc16';
      case 'PULSES': return '#eab308';
      case 'GROUNDNUT': return '#f97316';
      default: return '#38bdf8';
    }
  };

  const stormProgress = (leadHour / 72);
  const stormCenterZ = THREE.MathUtils.lerp(1.8, -0.2, stormProgress);
  const stormCenterX = THREE.MathUtils.lerp(2.2, 0.4, stormProgress);

  return (
    <group>
      {/* 3D Base Geography Substrate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[6.2, 6.2]} />
        <meshStandardMaterial color="#091322" roughness={0.9} />
      </mesh>

      {/* Odisha Coastline Curve */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -1.8, 0.02, -2.4,
                -1.2, 0.02, -1.6,
                -0.4, 0.02, -0.8,
                0.4, 0.02, 0.0,
                1.0, 0.02, 0.8,
                0.6, 0.02, 1.8,
                -0.2, 0.02, 2.4
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" linewidth={2} />
      </line>

      {/* Advancing Storm Inundation Footprint Rings */}
      <group
        ref={footprintRingRef}
        position={[stormCenterX, 0.04, stormCenterZ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} opacity={0.85} transparent />
        </mesh>
        <mesh>
          <ringGeometry args={[0.9, 1.05, 32]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} opacity={0.6} transparent />
        </mesh>
        <mesh>
          <ringGeometry args={[1.6, 1.8, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} opacity={0.3} transparent />
        </mesh>
      </group>

      {/* Cadastral Agricultural Crop Parcel Clusters */}
      {parcels.map((p) => {
        const matchesCrop = cropFilter === 'ALL' || p.crop === cropFilter;
        if (!matchesCrop) return null;

        const isExposed = p.exp;
        const color = isExposed ? '#ef4444' : getCropColor(p.crop);

        return (
          <group key={p.id} position={[p.pos[0], 0.08, p.pos[1]]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.18, 0.08, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={isExposed ? '#ef4444' : '#000000'}
                emissiveIntensity={isExposed ? 0.6 : 0}
              />
            </mesh>

            {isExposed && (
              <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.28, 16]} />
                <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} opacity={0.7} transparent />
              </mesh>
            )}
          </group>
        );
      })}

      {/* District Center Markers */}
      {districtNodes.map((d, i) => (
        <group key={i} position={d.pos}>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- M10: 3D Living Growth Stage Architecture & Wind Lodging ---
function M10PhenologyScene({ stage, windSpeed }: { stage: string; windSpeed: number }) {
  const stemRef = useRef<THREE.Group>(null);
  const maxBend = (windSpeed / 120) * 0.55;

  useFrame(({ clock }) => {
    if (stemRef.current) {
      const t = clock.getElapsedTime();
      const sway = Math.sin(t * 3.5) * maxBend * 0.5 + maxBend * 0.5;
      stemRef.current.rotation.z = THREE.MathUtils.lerp(stemRef.current.rotation.z, sway, 0.1);
    }
  });

  return (
    <group>
      {/* Soil Substrate Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#2d2218" />
      </mesh>

      {/* Surface Ponding / Waterlogging Sheet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]}>
        <planeGeometry args={[4.8, 4.8]} />
        <meshStandardMaterial color="#0284c7" opacity={0.6} transparent />
      </mesh>

      {/* Articulated Bending Crop Morphology (Stem, Nodes, Flowering Panicle) */}
      <group ref={stemRef} position={[0, -0.96, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 1.2, 12]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.025, 0.04, 0.8, 12]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>

        {/* Flowering Anthesis / Grain Panicle Head */}
        <mesh position={[0, 2.0, 0]}>
          <coneGeometry args={[0.15, 0.6, 16]} />
          <meshStandardMaterial color={stage === 'FLOWERING' ? '#f59e0b' : '#10b981'} />
        </mesh>
      </group>

      {/* Adjacent Crop Stalks in Canopy */}
      {[-0.8, 0.8].map((offset, i) => (
        <group key={i} position={[offset, -0.96, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 1.0, 8]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        </group>
      ))}

      {/* Subsurface Root System */}
      <group position={[0, -1.0, 0]}>
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, -0.3, 0]} rotation={[0, 0, x]}>
            <cylinderGeometry args={[0.015, 0.005, 0.6, 8]} />
            <meshBasicMaterial color="#a16207" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- M11: 3D SWAT Hydrology & Vertical Soil Profile Monolith ---
function M11HydrologyScene({ variable }: { variable: string }) {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const t = clock.getElapsedTime();
      particlesRef.current.children.forEach((c, idx) => {
        c.position.y = -0.2 - ((t * 0.4 + idx * 0.2) % 1.2);
      });
    }
  });

  return (
    <group>
      {/* Layer 1: Topsoil Organic Layer (0 - 15 cm) */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[2.8, 0.4, 2.8]} />
        <meshStandardMaterial color="#36220f" roughness={0.9} />
      </mesh>

      {/* Layer 2: Root Zone Clay / Loam (15 - 60 cm) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.8, 0.6, 2.8]} />
        <meshStandardMaterial color="#54381e" roughness={0.8} />
      </mesh>

      {/* Layer 3: Saturated Subsoil & Perched Water Table Level */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.8, 0.8, 2.8]} />
        <meshStandardMaterial color="#0369a1" transparent opacity={0.85} />
      </mesh>

      {/* Percolating Water Droplets */}
      <group ref={particlesRef}>
        {[-0.6, -0.2, 0.2, 0.6].map((x, xi) =>
          [-0.6, -0.2, 0.2, 0.6].map((z, zi) => (
            <mesh key={`${xi}-${zi}`} position={[x, 0, z]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}

// --- M12: 3D Explainable Crop Recommendation & TreeSHAP Attribution ---
function M12CropScenarioScene({ candidate }: { candidate: string }) {
  const candidates = useMemo(() => [
    { name: 'Swarna Sub-1', pos: -1.4, shapYield: 1.2, color: '#10b981', label: 'Flood-Tolerant' },
    { name: 'Parijat Traditional', pos: 0.0, shapYield: 0.6, color: '#f59e0b', label: 'Standard' },
    { name: 'Hybrid Short-Cycle', pos: 1.4, shapYield: -0.4, color: '#ef4444', label: 'Vulnerable' },
  ], []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>
      <gridHelper args={[6, 12, '#10b981', '#0f172a']} position={[0, -1.0, 0]} />

      {candidates.map((c) => {
        const isSelected = candidate === c.name;
        const h = Math.abs(c.shapYield) + 0.4;
        const y = -1.0 + h / 2;

        return (
          <group key={c.name} position={[c.pos, 0, 0]}>
            <mesh position={[0, -0.9, 0]}>
              <boxGeometry args={[1.0, 0.15, 1.0]} />
              <meshStandardMaterial color={isSelected ? '#38bdf8' : '#1e293b'} />
            </mesh>

            <mesh position={[0, y, 0]}>
              <cylinderGeometry args={[0.18, 0.22, h, 16]} />
              <meshStandardMaterial color={c.color} />
            </mesh>

            <mesh position={[0, y + h / 2 + 0.1, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// --- M13: 3D Quantile Yield Risk & Geospatial Downside Loss Surface ---
function M13YieldRiskScene({ metric }: { metric: string }) {
  const districts = useMemo(() => [
    { name: 'Balasore', pos: [-1.4, -1.0], risk: 0.75, yieldH: 1.6 },
    { name: 'Bhadrak', pos: [-0.6, -0.4], risk: 0.65, yieldH: 1.4 },
    { name: 'Kendrapara', pos: [0.2, 0.2], risk: 0.85, yieldH: 1.8 },
    { name: 'Jagatsinghpur', pos: [0.8, 0.8], risk: 0.70, yieldH: 1.5 },
    { name: 'Puri Delta', pos: [0.0, 1.4], risk: 0.45, yieldH: 1.1 },
  ], []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>
      <gridHelper args={[6, 12, '#f59e0b', '#0f172a']} position={[0, -1.0, 0]} />

      {districts.map((d, i) => {
        const height = metric === 'risk' ? d.risk * 2.2 : d.yieldH;
        const color = d.risk > 0.7 ? '#ef4444' : d.risk > 0.5 ? '#f59e0b' : '#10b981';

        return (
          <group key={i} position={[d.pos[0], -1.0 + height / 2, d.pos[1]]}>
            <mesh>
              <cylinderGeometry args={[0.24, 0.3, height, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>

            <mesh position={[0, height / 2 + 0.15, 0]}>
              <ringGeometry args={[0.1, 0.28, 16]} />
              <meshBasicMaterial color={color} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// --- M14: 3D Geospatial Environmental Pest & Disease Risk Surface ---
function M14PestDiseaseScene({ pathogen, humidity }: { pathogen: string; humidity: number }) {
  const sporeRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  const districts = useMemo(() => [
    { name: 'Balasore', pos: [-1.4, -1.15], h: 0.65, color: '#ef4444', risk: 84 },
    { name: 'Bhadrak', pos: [-0.6, -0.5], h: 0.55, color: '#f59e0b', risk: 72 },
    { name: 'Kendrapara', pos: [0.2, -0.1], h: 0.95, color: '#ef4444', risk: 94, alert: true },
    { name: 'Jagatsinghpur', pos: [0.8, 0.5], h: 0.50, color: '#f59e0b', risk: 68 },
    { name: 'Puri Delta', pos: [0.0, 1.3], h: 0.35, color: '#10b981', risk: 42 },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sporeRef.current) {
      sporeRef.current.children.forEach((spore, idx) => {
        const offset = (t * 0.4 + idx * 0.15) % 1.0;
        spore.position.x = -1.2 + offset * 2.4;
        spore.position.y = 0.1 + Math.sin(t * 2.0 + idx) * 0.15;
      });
    }
    if (pulseRingRef.current) {
      const s = 1.0 + Math.sin(t * 4.0) * 0.2;
      pulseRingRef.current.scale.set(s, s, 1);
    }
  });

  const pathogenColor = pathogen === 'BLB' ? '#ef4444' : pathogen === 'BPH' ? '#f59e0b' : '#eab308';

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <planeGeometry args={[6.2, 6.2]} />
        <meshStandardMaterial color="#08101e" roughness={0.9} />
      </mesh>
      <gridHelper args={[6, 12, '#38bdf8', '#1e293b']} position={[0, -0.84, 0]} />

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -1.8, -0.82, -2.4,
                -1.2, -0.82, -1.6,
                -0.4, -0.82, -0.8,
                0.4, -0.82, 0.0,
                1.0, -0.82, 0.8,
                0.6, -0.82, 1.8,
                -0.2, -0.82, 2.4
              ]),
              3
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" linewidth={2} />
      </line>

      {/* Microclimate Canopy Humidity Dome (>85% RH Favorability Envelope) */}
      <mesh position={[0.2, -0.2, -0.2]}>
        <sphereGeometry args={[1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={pathogenColor}
          transparent
          opacity={0.18}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {districts.map((d, i) => {
        const y = -0.85 + d.h / 2;
        return (
          <group key={i} position={[d.pos[0], 0, d.pos[1]]}>
            <mesh position={[0, y, 0]}>
              <cylinderGeometry args={[0.22, 0.26, d.h, 16]} />
              <meshStandardMaterial color={d.color} roughness={0.3} metalness={0.2} />
            </mesh>

            <mesh position={[0, -0.85 + d.h + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.12, 0.24, 16]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>

            {d.alert && (
              <mesh
                ref={pulseRingRef}
                position={[0, -0.85 + d.h + 0.05, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[0.3, 0.42, 24]} />
                <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} opacity={0.8} transparent />
              </mesh>
            )}

            <mesh position={[0, -0.85 + d.h + 0.12, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color={d.color} />
            </mesh>
          </group>
        );
      })}

      <group ref={sporeRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- M15: 3D Mandi Spatial Network & Supply Flow Arcs ---
function M15MarketScene({ commodity }: { commodity: string }) {
  const nodes = useMemo(() => [
    { name: 'Balasore', pos: new THREE.Vector3(-1.8, 0.4, -0.4), color: '#ef4444', price: '₹2,420' },
    { name: 'Cuttack', pos: new THREE.Vector3(-0.6, 0.2, 0.2), color: '#f59e0b', price: '₹2,380' },
    { name: 'Bhubaneswar', pos: new THREE.Vector3(0.4, -0.2, 0.4), color: '#38bdf8', price: '₹2,340' },
    { name: 'Puri Delta', pos: new THREE.Vector3(-0.2, -0.8, 0.8), color: '#10b981', price: '₹2,290' },
    { name: 'Nashik Corridor', pos: new THREE.Vector3(2.2, 0.6, -0.6), color: '#f59e0b', price: '₹2,480' }
  ], []);

  const arcs = useMemo(() => [
    new THREE.QuadraticBezierCurve3(nodes[0].pos, new THREE.Vector3(-1.0, 1.4, 0.0), nodes[1].pos),
    new THREE.QuadraticBezierCurve3(nodes[1].pos, new THREE.Vector3(0.0, 0.8, 0.4), nodes[2].pos),
    new THREE.QuadraticBezierCurve3(nodes[2].pos, new THREE.Vector3(0.2, 0.2, 0.8), nodes[3].pos),
    new THREE.QuadraticBezierCurve3(nodes[4].pos, new THREE.Vector3(1.0, 1.4, 0.0), nodes[1].pos)
  ], [nodes]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>
      <gridHelper args={[6, 12, '#f59e0b', '#1e293b']} position={[0, -0.98, 0]} />

      {arcs.map((curve, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[curve, 32, 0.025, 8, false]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.65} transparent />
        </mesh>
      ))}

      {nodes.map((n, idx) => (
        <group key={idx} position={n.pos}>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.22, 0.26, 0.4, 16]} />
            <meshStandardMaterial color={n.color} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- M16: 3D 5-Node Causal DAG Network ---
function M16DagScene({ activeNode }: { activeNode: number }) {
  const dagNodes = useMemo(() => [
    { id: 1, pos: new THREE.Vector3(-2.4, 0.8, 0), label: '850hPa Vortex' },
    { id: 2, pos: new THREE.Vector3(-1.2, 0.1, 0.3), label: '1km Downscale' },
    { id: 3, pos: new THREE.Vector3(0.0, -0.4, 0), label: 'Soil Saturation' },
    { id: 4, pos: new THREE.Vector3(1.2, 0.1, -0.3), label: 'Yield Penalty' },
    { id: 5, pos: new THREE.Vector3(2.4, 0.8, 0), label: 'Mandi Shock' }
  ], []);

  const edges = useMemo(() => {
    const list = [];
    for (let i = 0; i < dagNodes.length - 1; i++) {
      const p1 = dagNodes[i].pos;
      const p2 = dagNodes[i + 1].pos;
      const mid = new THREE.Vector3((p1.x + p2.x) / 2, ((p1.y + p2.y) / 2) + 0.4, (p1.z + p2.z) / 2);
      list.push(new THREE.QuadraticBezierCurve3(p1, mid, p2));
    }
    return list;
  }, [dagNodes]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[6.5, 4.5]} />
        <meshStandardMaterial color="#080f1d" />
      </mesh>
      <gridHelper args={[6, 12, '#818cf8', '#111827']} position={[0, -0.88, 0]} />

      {edges.map((curve, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[curve, 32, 0.03, 8, false]} />
          <meshBasicMaterial color="#818cf8" opacity={0.7} transparent />
        </mesh>
      ))}

      {dagNodes.map((n) => {
        const isCurrent = n.id === activeNode;
        return (
          <group key={n.id} position={n.pos}>
            <mesh>
              <sphereGeometry args={[isCurrent ? 0.25 : 0.18, 20, 20]} />
              <meshBasicMaterial color={isCurrent ? '#ef4444' : '#818cf8'} />
            </mesh>
            {isCurrent && (
              <mesh>
                <ringGeometry args={[0.3, 0.38, 32]} />
                <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// --- M17: 3D Inter-District Supply Shock & Logistics Transit Corridor ---
function M17SupplyShockScene({ disruption }: { disruption: number }) {
  const truckRef = useRef<THREE.Mesh>(null);

  const highwayPts = useMemo(() => [
    new THREE.Vector3(-2.4, -0.6, -1.4),
    new THREE.Vector3(-1.0, -0.4, -0.4),
    new THREE.Vector3(0.4, -0.3, 0.6),
    new THREE.Vector3(1.8, -0.1, 1.6)
  ], []);

  const highwayCurve = useMemo(() => new THREE.CatmullRomCurve3(highwayPts), [highwayPts]);

  useFrame(({ clock }) => {
    if (truckRef.current) {
      const t = (clock.getElapsedTime() * 0.2) % 1.0;
      truckRef.current.position.copy(highwayCurve.getPoint(t));
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[6.5, 6.5]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>
      <gridHelper args={[6, 12, '#64748b', '#1e293b']} position={[0, -0.88, 0]} />

      {/* NH16 Highway Ribbon */}
      <mesh>
        <tubeGeometry args={[highwayCurve, 40, 0.06, 8, false]} />
        <meshBasicMaterial color="#94a3b8" />
      </mesh>

      {/* Moving Freight Transport Truck */}
      <mesh ref={truckRef}>
        <boxGeometry args={[0.22, 0.14, 0.32]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Inundation Breach Point on Highway */}
      <mesh position={[0.4, -0.28, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.5, 24]} />
        <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} opacity={0.8} transparent />
      </mesh>

      {/* Arrival Deficit Bar Towers */}
      {[
        { x: -1.6, z: -1.0, h: 1.2, color: '#ef4444' },
        { x: -0.2, z: 0.0, h: 1.8, color: '#ef4444' },
        { x: 1.2, z: 1.0, h: 0.8, color: '#f59e0b' }
      ].map((b, i) => (
        <mesh key={i} position={[b.x, -0.88 + (b.h * (disruption / 50)) / 2, b.z]}>
          <cylinderGeometry args={[0.18, 0.22, b.h * (disruption / 50), 16]} />
          <meshStandardMaterial color={b.color} />
        </mesh>
      ))}
    </group>
  );
}

// --- M18: 3D Counterfactual Policy Simulator & Dual Economic Response Surface ---
function M18ScenarioSimulatorScene({ rainDelta, bufferRelease }: { rainDelta: number; bufferRelease: boolean }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <planeGeometry args={[6.5, 6.5]} />
        <meshStandardMaterial color="#08101e" />
      </mesh>
      <gridHelper args={[6, 12, '#38bdf8', '#1e293b']} position={[0, -0.98, 0]} />

      {/* Surface A: Status Quo Unmitigated Loss Crater (Red) */}
      <mesh position={[-1.3, -0.3, 0]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[2.5, 2.5, 16, 16]} />
        <meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.65} />
      </mesh>

      {/* Surface B: AI-Optimized Policy Action (Emerald/Cyan - Smoothed Shock) */}
      <mesh position={[1.3, bufferRelease ? 0.2 : -0.2, 0]} rotation={[-Math.PI / 3, 0, 0]}>
        <planeGeometry args={[2.5, 2.5, 16, 16]} />
        <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.8} />
      </mesh>

      {/* Central Economic Savings Delta Pedestal */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.26, 0.32, 0.85, 16]} />
        <meshStandardMaterial color={bufferRelease ? '#10b981' : '#f59e0b'} />
      </mesh>
    </group>
  );
}

// ============================================================================
// MAIN COMPONENT EXPORT
// ============================================================================

export default function DedicatedModuleSimulator({
  moduleNumber,
  title,
  category,
  basin,
  horizon,
  locale,
  realtimeData
}: DedicatedModuleSimulatorProps) {
  const isHi = locale === 'hi';
  const locName = isHi ? basin.nameHi : basin.nameEn;

  // Local interactive state for simulations
  const [m02Altitude, setM02Altitude] = useState<number>(620);
  const [m03Mode, setM03Mode] = useState<'precip' | 'heat' | 'wind'>('precip');
  const [m04Zone, setM04Zone] = useState<'all' | 'core' | 'primary'>('all');
  const [m04Intensity, setM04Intensity] = useState<number>(55);
  const [m05Filter, setM05Filter] = useState<'all' | 'extreme' | 'mean'>('all');
  const [m06Threshold, setM06Threshold] = useState<number>(100);
  const [m07Step, setM07Step] = useState<number>(35);
  const [m08Split, setM08Split] = useState<number>(0);
  const [m09Crop, setM09Crop] = useState<string>('ALL');
  const [m09LeadHour, setM09LeadHour] = useState<number>(72);
  const [m10Stage, setM10Stage] = useState<string>('FLOWERING');
  const [m10Wind, setM10Wind] = useState<number>(85);
  const [m11Variable, setM11Variable] = useState<string>('WATERLOGGING');
  const [m12Candidate, setM12Candidate] = useState<string>('Swarna Sub-1');
  const [m13Metric, setM13Metric] = useState<string>('risk');
  const [m14Pathogen, setM14Pathogen] = useState<string>('BLB');
  const [m14Humidity, setM14Humidity] = useState<number>(92);
  const [m15Commodity, setM15Commodity] = useState<'wheat' | 'onion' | 'paddy' | 'mustard'>('paddy');
  const [m16ActiveNode, setM16ActiveNode] = useState<number>(3);
  const [m17Disruption, setM17Disruption] = useState<number>(60);
  const [m18RainDelta, setM18RainDelta] = useState<number>(20);
  const [m18BufferRelease, setM18BufferRelease] = useState<boolean>(true);

  // Common Header Pill (Strictly 0 localhost or port branding)
  const renderHeader = (domainLabelEn: string, domainLabelHi: string, icon: React.ReactNode) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '14px 18px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.02em' }}>
            ENGINE M{moduleNumber < 10 ? `0${moduleNumber}` : moduleNumber} · {isHi ? domainLabelHi : domainLabelEn}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
            {locName} ({basin.coords}) · {horizon} Lead · 3D ACCELERATED
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            padding: '3px 9px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}
        >
          {isHi ? '3D मॉडल सक्रिय' : '3D OPERATIONAL'}
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 'calc(100vh - 53px)', backgroundColor: '#07090E', color: '#F8FAFC', position: 'relative' }}>
      {renderHeader(title, title, <Activity className="w-4 h-4" />)}

      <div style={{ padding: '20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* 3D WebGL Canvas Hero Viewport with Orbit Controls */}
        <div
          style={{
            height: '380px',
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#030712',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Orbit Navigation Hint Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 10,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              color: '#38BDF8',
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              pointerEvents: 'none'
            }}
          >
            🖱️ Click & Drag to Orbit in 3D Space · Scroll to Zoom
          </div>

          <Canvas camera={{ position: [0, 1.4, 5.2], fov: 42 }}>
            <ambientLight intensity={0.75} />
            <pointLight position={[10, 10, 10]} intensity={0.9} />
            <Stars radius={60} depth={30} count={1200} factor={2} saturation={0} fade speed={1} />

            {/* Dedicated domain-specific 3D scene for EVERY scientific module */}
            {moduleNumber === 2 && <M02SoundingScene altitude={m02Altitude} />}
            {moduleNumber === 3 && <M03AnomalyScene mode={m03Mode} />}
            {moduleNumber === 4 && <M04FootprintScene zone={m04Zone} intensity={m04Intensity} />}
            {moduleNumber === 5 && <M05TrajectoryScene filter={m05Filter} />}
            {moduleNumber === 6 && <M06ProbabilityScene threshold={m06Threshold} />}
            {moduleNumber === 7 && <M07DownscalingScene step={m07Step} />}
            {moduleNumber === 8 && <M08ComparisonScene splitPos={m08Split} />}
            {moduleNumber === 9 && <M09CropExposureScene cropFilter={m09Crop} leadHour={m09LeadHour} />}
            {moduleNumber === 10 && <M10PhenologyScene stage={m10Stage} windSpeed={m10Wind} />}
            {moduleNumber === 11 && <M11HydrologyScene variable={m11Variable} />}
            {moduleNumber === 12 && <M12CropScenarioScene candidate={m12Candidate} />}
            {moduleNumber === 13 && <M13YieldRiskScene metric={m13Metric} />}
            {moduleNumber === 14 && <M14PestDiseaseScene pathogen={m14Pathogen} humidity={m14Humidity} />}
            {moduleNumber === 15 && <M15MarketScene commodity={m15Commodity} />}
            {moduleNumber === 16 && <M16DagScene activeNode={m16ActiveNode} />}
            {moduleNumber === 17 && <M17SupplyShockScene disruption={m17Disruption} />}
            {moduleNumber === 18 && <M18ScenarioSimulatorScene rainDelta={m18RainDelta} bufferRelease={m18BufferRelease} />}

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={12.0}
              dampingFactor={0.08}
            />
          </Canvas>
        </div>

        {/* Interactive Controls Bar Tailored to Current Module */}
        {moduleNumber === 2 && (
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
              {isHi ? '3D ऊँचाई स्क्रबर:' : '3D Altitude Probe:'} <strong style={{ color: '#EF4444' }}>{m02Altitude}m AGL</strong>
            </span>
            <input
              type="range"
              min="200"
              max="2400"
              value={m02Altitude}
              onChange={(e) => setM02Altitude(parseInt(e.target.value, 10))}
              style={{ flex: 1, accentColor: '#38BDF8', cursor: 'pointer' }}
            />
          </div>
        )}

        {moduleNumber === 3 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'विसंगति मोड:' : 'Anomaly Focus:'}</span>
            {(['precip', 'heat', 'wind'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setM03Mode(m)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m03Mode === m ? '#38BDF8' : '#121826',
                  color: m03Mode === m ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {m === 'precip' ? 'EXTREME PRECIP (EFI +0.94)' : m === 'heat' ? 'HEAT ANTHESIS (+4.2°C)' : 'GALE JET (118 KM/H)'}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 4 && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'फुटप्रिंट ज़ोन:' : 'Footprint Layer:'}</span>
            {(['all', 'core', 'primary'] as const).map((z) => (
              <button
                key={z}
                onClick={() => setM04Zone(z)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m04Zone === z ? '#EF4444' : '#121826',
                  color: m04Zone === z ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {z.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 5 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? '3D पाथ फिल्टर:' : '3D Ensemble Filter:'}</span>
            {(['all', 'extreme', 'mean'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setM05Filter(mode)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m05Filter === mode ? '#38BDF8' : '#121826',
                  color: m05Filter === mode ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 6 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'थ्रेसहोल्ड:' : 'Exceedance P(X):'}</span>
            {[25, 50, 100, 150].map((val) => (
              <button
                key={val}
                onClick={() => setM06Threshold(val)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m06Threshold === val ? '#06B6D4' : '#121826',
                  color: m06Threshold === val ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                &gt;{val}mm
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 7 && (
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
              {isHi ? 'डिफ्यूजन डीनोइज़िंग स्टेप:' : 'Diffusion Reverse SDE Step:'} <strong style={{ color: '#10B981' }}>{m07Step} / 50</strong>
            </span>
            <input
              type="range"
              min="1"
              max="50"
              value={m07Step}
              onChange={(e) => setM07Step(parseInt(e.target.value, 10))}
              style={{ flex: 1, accentColor: '#10B981', cursor: 'pointer' }}
            />
          </div>
        )}

        {moduleNumber === 8 && (
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
              {isHi ? '3D स्प्लिट वाइप स्थिति:' : '3D Split Wipe Position:'} <strong style={{ color: '#F59E0B' }}>{m08Split > 0 ? `+${m08Split}` : m08Split}</strong>
            </span>
            <input
              type="range"
              min="-1.8"
              max="1.8"
              step="0.1"
              value={m08Split}
              onChange={(e) => setM08Split(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: '#F59E0B', cursor: 'pointer' }}
            />
          </div>
        )}

        {moduleNumber === 9 && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'फसल फ़िल्टर:' : 'Crop System Filter:'}</span>
            {['ALL', 'PADDY', 'SUGARCANE', 'PULSES', 'GROUNDNUT'].map((c) => (
              <button
                key={c}
                onClick={() => setM09Crop(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m09Crop === c ? '#10B981' : '#121826',
                  color: m09Crop === c ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {c}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'लीड समय:' : 'Lead Time:'}</span>
              {[24, 48, 72].map((h) => (
                <button
                  key={h}
                  onClick={() => setM09LeadHour(h)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    backgroundColor: m09LeadHour === h ? '#38BDF8' : '#0B132B',
                    color: m09LeadHour === h ? '#07090E' : '#94A3B8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  +{h}H
                </button>
              ))}
            </div>
          </div>
        )}

        {moduleNumber === 10 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'वृद्धि चरण:' : 'Phenology Stage:'}</span>
            {['TILLERING', 'FLOWERING', 'GRAIN_FILL', 'MATURITY'].map((st) => (
              <button
                key={st}
                onClick={() => setM10Stage(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m10Stage === st ? '#10B981' : '#121826',
                  color: m10Stage === st ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 11 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'हाइड्रोलॉजी चर:' : 'Hydrology Layer:'}</span>
            {['WATERLOGGING', 'SOIL_MOISTURE', 'INFILTRATION'].map((v) => (
              <button
                key={v}
                onClick={() => setM11Variable(v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m11Variable === v ? '#0284C7' : '#121826',
                  color: m11Variable === v ? '#FFFFFF' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 12 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'उम्मीदवार फसल:' : 'Candidate Switch:'}</span>
            {['Swarna Sub-1', 'Parijat Traditional', 'Hybrid Short-Cycle'].map((can) => (
              <button
                key={can}
                onClick={() => setM12Candidate(can)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m12Candidate === can ? '#10B981' : '#121826',
                  color: m12Candidate === can ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {can}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 13 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'जोखिम मीट्रिक:' : 'Yield Risk View:'}</span>
            {['risk', 'yield'].map((m) => (
              <button
                key={m}
                onClick={() => setM13Metric(m)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m13Metric === m ? '#EF4444' : '#121826',
                  color: m13Metric === m ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {m === 'risk' ? 'DOWNSIDE LOSS RISK (P10/P50)' : 'EXPECTED YIELD (T/HA)'}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 14 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{isHi ? 'रोग / कीट:' : 'Target Pathogen:'}</span>
            {['BLB', 'BPH', 'BLAST'].map((pat) => (
              <button
                key={pat}
                onClick={() => setM14Pathogen(pat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m14Pathogen === pat ? '#EF4444' : '#121826',
                  color: m14Pathogen === pat ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {pat === 'BLB' ? 'BACTERIAL LEAF BLIGHT' : pat === 'BPH' ? 'BROWN PLANT HOPPER' : 'PADDY BLAST'}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 15 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'जिंस चुनें:' : 'Select Commodity:'}</span>
            {(['wheat', 'onion', 'paddy', 'mustard'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setM15Commodity(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m15Commodity === c ? '#F59E0B' : '#121826',
                  color: m15Commodity === c ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 16 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'सक्रिय 3D नोड:' : 'Active 3D Node:'}</span>
            {[1, 2, 3, 4, 5].map((id) => (
              <button
                key={id}
                onClick={() => setM16ActiveNode(id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m16ActiveNode === id ? '#818CF8' : '#121826',
                  color: m16ActiveNode === id ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                PHASE {id}
              </button>
            ))}
          </div>
        )}

        {moduleNumber === 17 && (
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
              {isHi ? 'सप्लाई झटका व्यवधान तीव्रता:' : 'Supply Corridor Disruption:'} <strong style={{ color: '#EF4444' }}>{m17Disruption}%</strong>
            </span>
            <input
              type="range"
              min="10"
              max="100"
              value={m17Disruption}
              onChange={(e) => setM17Disruption(parseInt(e.target.value, 10))}
              style={{ flex: 1, accentColor: '#EF4444', cursor: 'pointer' }}
            />
          </div>
        )}

        {moduleNumber === 18 && (
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                <span>{isHi ? 'अतिरिक्त बारिश विचलन:' : 'Rainfall Anomaly Delta:'}</span>
                <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>+{m18RainDelta}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={m18RainDelta}
                onChange={(e) => setM18RainDelta(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="buf"
                checked={m18BufferRelease}
                onChange={(e) => setM18BufferRelease(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#10B981', cursor: 'pointer' }}
              />
              <label htmlFor="buf" style={{ fontSize: '12px', color: '#FFFFFF', cursor: 'pointer' }}>
                {isHi ? '45,000 टन बफर स्टॉक तुरंत जारी करें (FCI)' : 'Preemptively Release 45,000 MT FCI Buffer Stock'}
              </label>
            </div>
          </div>
        )}

        {/* Live Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>PRIMARY OBSERVATION</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
              {realtimeData?.riskCategory ?? 'HIGH CROP EXPOSURE'}
            </div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>{basin.soilTypeEn}</div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>ADVISORY DIRECTIVE</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', marginTop: '4px', lineHeight: 1.4 }}>
              {realtimeData?.advisoryBullet ?? 'Upholding Exposure ≠ Loss doctrine: 30.8% of district net sown area is physically exposed to inundation.'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
