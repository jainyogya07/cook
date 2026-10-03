'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type AtmosphereVariant = 'landing' | 'shell';

interface AtmosphericBackgroundCanvasProps {
  variant?: AtmosphereVariant;
}

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCompact =
  typeof window !== 'undefined' && window.innerWidth < 900;

function useFieldDrivers(variant: AtmosphereVariant) {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, hoverBoost: 0 });
  const scroll = useRef(0);
  const boot = useRef(reducedMotion ? 1 : 0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      if (variant !== 'landing') return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const page = document.querySelector('.landing-page') as HTMLElement | null;
      const top = page ? page.scrollTop : window.scrollY;
      const span = page ? Math.max(1, page.scrollHeight - page.clientHeight) : max;
      scroll.current = Math.min(1, top / span);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      mouse.current.hoverBoost = target?.closest('button, a, .landing-primary-btn, .anomaly-beacon-node') ? 1 : 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    const page = document.querySelector('.landing-page');
    page?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      page?.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [variant]);

  useFrame((_, delta) => {
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.045;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.045;
    boot.current = Math.min(1, boot.current + delta * 0.55);
  });

  return { mouse, scroll, boot };
}

function KineticAtmosphericFlow({
  variant,
  mouse,
  scroll,
  boot
}: {
  variant: AtmosphereVariant;
  mouse: React.MutableRefObject<{ x: number; y: number; hoverBoost: number }>;
  scroll: React.MutableRefObject<number>;
  boot: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = reducedMotion ? 40 : isCompact ? 90 : variant === 'landing' ? 220 : 140;

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      const layer = i % 3;
      pos[i * 3] = (Math.random() - 0.5) * (layer === 0 ? 36 : 28);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -8 - layer * 3.2 + (Math.random() - 0.5) * 4;
      seed[i * 4] = 0.002 + Math.random() * (layer === 2 ? 0.012 : 0.006);
      seed[i * 4 + 1] = Math.random() * Math.PI * 2;
      seed[i * 4 + 2] = layer;
      seed[i * 4 + 3] = 0.05 + Math.random() * 0.22;
    }
    return [pos, seed];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const activity = 0.55 + scroll.current * 0.7 + mouse.current.hoverBoost * 0.08;
    const appear = Math.max(0, (boot.current - 0.72) / 0.28);

    for (let i = 0; i < count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const layer = seeds[i * 4 + 2];
      const speed = seeds[i * 4] * activity;
      const phase = seeds[i * 4 + 1];
      const flowX = speed + Math.sin(y * 0.14 + t * 0.07 + phase) * 0.004;
      const flowY = Math.cos(x * 0.09 + t * 0.05 + phase) * 0.0028 * (layer === 1 ? 1.4 : 0.7);
      const attractX = mouse.current.x * 0.004 * (layer === 2 ? 1.6 : 0.6);
      const attractY = -mouse.current.y * 0.003 * (layer === 2 ? 1.2 : 0.5);

      arr[i * 3] += flowX + attractX;
      arr[i * 3 + 1] += flowY + attractY;

      if (arr[i * 3] > 22) arr[i * 3] = -22;
      if (arr[i * 3] < -22) arr[i * 3] = 22;
      if (arr[i * 3 + 1] > 14) arr[i * 3 + 1] = -14;
      if (arr[i * 3 + 1] < -14) arr[i * 3 + 1] = 14;

      // Content-protection: dim and thin the field behind left typography.
      if (arr[i * 3] < -3.2 && variant === 'landing') {
        arr[i * 3 + 2] = Math.min(-11, arr[i * 3 + 2]);
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.14 * appear * (variant === 'landing' ? 1 : 0.72);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isCompact ? 0.036 : 0.042}
        color="#E2E8F0"
        transparent
        opacity={0.12}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GravityWell({
  mouse,
  scroll,
  boot
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  boot: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const nextEvent = useRef(6.4);
  const eventT = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const appear = Math.min(1, Math.max(0, (boot.current - 0.42) / 0.34));
    if (groupRef.current) {
      groupRef.current.position.x = 3.7 + mouse.current.x * 0.08;
      groupRef.current.position.y = 0.8 - mouse.current.y * 0.05 + scroll.current * 0.12;
      groupRef.current.rotation.x = 0.72 + Math.sin(t * 0.07) * 0.03;
      groupRef.current.rotation.y = 0.18 + mouse.current.x * 0.04;
    }

    ringsRef.current.forEach((ring, index) => {
      if (!ring) return;
      const dir = index % 2 === 0 ? 1 : -1;
      const speed = (0.018 + index * 0.007 + scroll.current * 0.02) * dir;
      ring.rotation.z += speed * (reducedMotion ? 0 : 1);
      ring.rotation.x = Math.sin(t * (0.11 + index * 0.03) + index) * 0.04;
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = (0.11 - index * 0.016 + Math.sin(t * 0.35 + index) * 0.02) * appear;
    });

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.7) * 0.035;
      coreRef.current.scale.setScalar(pulse);
      const material = coreRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (0.72 + Math.sin(t * 1.7) * 0.14) * appear;
    }
    if (haloRef.current) {
      const material = haloRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (0.08 + Math.sin(t * 0.9) * 0.03) * appear;
      haloRef.current.scale.setScalar(1.15 + Math.sin(t * 0.9) * 0.08);
    }

    if (!reducedMotion && t > nextEvent.current) {
      eventT.current = 0.001;
      nextEvent.current = t + 5.2 + Math.random() * 3.8;
    }
    if (eventT.current > 0 && waveRef.current) {
      eventT.current += 0.016;
      const u = eventT.current / 1.05;
      waveRef.current.scale.setScalar(0.4 + u * 2.4);
      const material = waveRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.22 * (1 - u)) * appear;
      if (u >= 1) eventT.current = 0;
    }
  });

  return (
    <group ref={groupRef} position={[3.7, 0.8, -2]} rotation={[0.72, 0.18, 0]}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.82} />
      </mesh>
      <mesh ref={waveRef}>
        <ringGeometry args={[0.22, 0.235, 64]} />
        <meshBasicMaterial color="#cbd5e1" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {[0.55, 0.95, 1.42, 1.95].map((radius, index) => (
        <mesh
          key={radius}
          ref={(node) => {
            if (node) ringsRef.current[index] = node;
          }}
          rotation={[index * 0.18, 0.12 * index, index * 0.45]}
        >
          <torusGeometry args={[radius, index === 2 ? 0.01 : 0.012 + index * 0.002, 12, 96]} />
          <meshBasicMaterial
            color={index === 3 ? '#94a3b8' : index % 2 === 0 ? '#94a3b8' : '#cbd5e1'}
            transparent
            opacity={0.12 - index * 0.018}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function GravityDust({
  boot,
  scroll
}: {
  boot: React.MutableRefObject<number>;
  scroll: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = reducedMotion ? 24 : 72;
  const [positions, phases] = useMemo(() => {
    const points = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.65 + (i % 12) * 0.12;
      points[i * 3] = 3.7 + Math.cos(angle) * radius;
      points[i * 3 + 1] = 0.8 + Math.sin(angle) * radius * 0.34;
      points[i * 3 + 2] = -2 + Math.sin(angle) * 0.45;
      offsets[i] = (i % 9) * 0.08;
    }
    return [points, offsets];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const array = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const appear = Math.min(1, Math.max(0, (boot.current - 0.55) / 0.3));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + time * (0.035 + (i % 5) * 0.006 + scroll.current * 0.02) + phases[i];
      const radius = 0.65 + (i % 12) * 0.12;
      array[i * 3] = 3.7 + Math.cos(angle) * radius;
      array[i * 3 + 1] = 0.8 + Math.sin(angle) * radius * 0.34;
      array[i * 3 + 2] = -2 + Math.sin(angle * 2) * 0.45;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.38 * appear;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} color="#ffffff" transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function AtmosphericContours({
  scroll,
  boot
}: {
  scroll: React.MutableRefObject<number>;
  boot: React.MutableRefObject<number>;
}) {
  const linesRef = useRef<THREE.Group>(null);
  const count = 7;
  const pointsPerLine = 64;
  const geometries = useMemo(
    () =>
      Array.from({ length: count }, (_, lineIndex) => {
        const points = new Float32Array(pointsPerLine * 3);
        for (let i = 0; i < pointsPerLine; i++) {
          const x = (i / (pointsPerLine - 1) - 0.5) * 24;
          points[i * 3] = x;
          points[i * 3 + 1] = (lineIndex - count / 2) * 0.42;
          points[i * 3 + 2] = -3.8 - lineIndex * 0.12;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
        return geometry;
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    const t = clock.getElapsedTime();
    const appear = Math.min(1, Math.max(0, (boot.current - 0.28) / 0.4));
    linesRef.current.children.forEach((child, lineIndex) => {
      const geometry = (child as THREE.LineSegments).geometry;
      const attr = geometry.attributes.position;
      const points = attr.array as Float32Array;
      const amp = 0.28 + scroll.current * 0.22;
      for (let i = 0; i < pointsPerLine; i++) {
        const x = points[i * 3];
        points[i * 3 + 1] =
          (lineIndex - count / 2) * 0.42 +
          Math.sin(x * 0.28 + lineIndex + t * (0.08 + scroll.current * 0.06)) * amp +
          Math.cos(x * 0.09 - t * 0.05) * 0.08;
      }
      attr.needsUpdate = true;
      const material = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
      material.opacity = (0.03 + (lineIndex % 3) * 0.01) * appear;
    });
  });

  return (
    <group ref={linesRef} rotation={[0.22, -0.16, 0.08]}>
      {geometries.map((geometry, index) => (
        <lineSegments key={index} geometry={geometry}>
          <lineBasicMaterial
            color={index % 3 === 0 ? '#dbeafe' : '#64748b'}
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      ))}
    </group>
  );
}

function GeodesicTrace({
  mouse,
  scroll,
  boot
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  boot: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const appear = Math.min(1, Math.max(0, (boot.current - 0.18) / 0.4));
    const rev = 34 + scroll.current * 10;
    groupRef.current.rotation.y = t * ((Math.PI * 2) / rev);
    groupRef.current.rotation.x = 0.8 + Math.sin(t * 0.08) * 0.05 + mouse.current.y * 0.03;
    groupRef.current.rotation.z = -0.22 + Math.sin(t * 0.05) * 0.02;
    groupRef.current.position.x = -2.7 + mouse.current.x * 0.12;
    groupRef.current.position.y = -0.9 - mouse.current.y * 0.08;
    const breath = 1 + Math.sin(t * 0.22) * 0.012;
    groupRef.current.scale.setScalar(breath);
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (0.035 + Math.sin(t * 0.4) * 0.012) * appear;
    }
  });

  return (
    <group ref={groupRef} position={[-2.7, -0.9, -4.5]} rotation={[0.8, 0.2, -0.22]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 24, 16]} />
        <meshBasicMaterial color="#cbd5e1" wireframe transparent opacity={0.04} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[0.3, 0.8, 0.2]}>
        <torusGeometry args={[2.68, 0.01, 8, 128]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[1.1, 0.1, 0.7]}>
        <torusGeometry args={[2.82, 0.008, 8, 128]} />
        <meshBasicMaterial color="#64748b" transparent opacity={0.09} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function DataTrails({
  boot,
  scroll
}: {
  boot: React.MutableRefObject<number>;
  scroll: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const trails = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-8, -2 + index * 0.5, -3.2 - index * 0.2),
          new THREE.Vector3(-3, 1.5 - index * 0.4, -4.5),
          new THREE.Vector3(0.4, -0.3 + index * 0.7, -5.3),
          new THREE.Vector3(6.6, 1.8 - index * 0.6, -4.6)
        ]);
        return curve.getPoints(64);
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const appear = Math.min(1, Math.max(0, (boot.current - 0.7) / 0.3));
    groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.025;
    groupRef.current.position.y = Math.sin(t * 0.12) * 0.06;
    groupRef.current.children.forEach((child, index) => {
      const material = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
      const cadence = 0.028 + (Math.sin(t * (0.35 + index * 0.17) + index) + 1) * (0.018 + scroll.current * 0.02);
      material.opacity = cadence * appear * (index % 2 === 0 || t % (7 + index) > 2 ? 1 : 0.35);
    });
  });

  return (
    <group ref={groupRef}>
      {trails.map((points, index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <lineSegments key={index} geometry={geometry}>
            <lineBasicMaterial color={index % 2 ? '#93c5fd' : '#f8fafc'} transparent opacity={0.05} blending={THREE.AdditiveBlending} />
          </lineSegments>
        );
      })}
    </group>
  );
}

function AtmosphericScene({ variant }: { variant: AtmosphereVariant }) {
  const { mouse, scroll, boot } = useFieldDrivers(variant);
  const cameraGroup = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    camera.position.x = mouse.current.x * 0.18;
    camera.position.y = -mouse.current.y * 0.1 + scroll.current * 0.16;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={cameraGroup}>
      <KineticAtmosphericFlow variant={variant} mouse={mouse} scroll={scroll} boot={boot} />
      <GravityWell mouse={mouse} scroll={scroll} boot={boot} />
      <GravityDust boot={boot} scroll={scroll} />
      <AtmosphericContours scroll={scroll} boot={boot} />
      <GeodesicTrace mouse={mouse} scroll={scroll} boot={boot} />
      <DataTrails boot={boot} scroll={scroll} />
    </group>
  );
}

export default function AtmosphericBackgroundCanvas({ variant = 'shell' }: AtmosphericBackgroundCanvasProps) {
  return (
    <div
      className="atmospheric-background-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: '#030508'
      }}
    >
      <div className="atmosphere-haze atmosphere-haze-left" />
      <div className="atmosphere-haze atmosphere-haze-right" />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={isCompact ? 1 : [1, 1.35]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
        style={{ width: '100%', height: '100%' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <AtmosphericScene variant={variant} />
      </Canvas>
    </div>
  );
}
