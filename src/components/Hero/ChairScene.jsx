import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { gsap } from "../../lib/gsap";
import { shellGeometry, cushionGeometry, CHAIR_MATERIALS } from "../../lib/chairGeometry";
import { useInView } from "../../hooks/useInView";

function Chair({ scrollRef, pointerRef, isNarrow }) {
  const group = useRef();
  const shell = useMemo(() => shellGeometry(), []);
  const cushion = useMemo(() => cushionGeometry(), []);
  const rotation = useRef({ y: -1.8 });
  const basePosition = isNarrow ? [0.15, -0.6, 0] : [1.05, -0.6, 0];
  const baseScale = isNarrow ? 0.62 : 0.78;

  useMemo(() => {
    gsap.fromTo(
      rotation.current,
      { y: -0.6 },
      { y: -1.8, duration: 2.2, ease: "power4.out", delay: 0.15 }
    );
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const scroll = scrollRef?.current ?? 0;
    const pointer = pointerRef?.current ?? { x: 0, y: 0 };

    const targetY = rotation.current.y + pointer.x * 0.22 + scroll * 0.9;
    const targetX = pointer.y * 0.05 + Math.sin(scroll * 1.4) * 0.02;

    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.4);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2.4);
    group.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 0.55) * 0.012;
  });

  return (
    <group ref={group} position={basePosition} scale={baseScale} dispose={null}>
      <mesh geometry={shell} castShadow receiveShadow>
        <meshPhysicalMaterial {...CHAIR_MATERIALS.shell} />
      </mesh>

      <mesh geometry={cushion} position={[0, 0.4, 0.04]} rotation={[0.08, 0, 0]} castShadow>
        <meshStandardMaterial {...CHAIR_MATERIALS.cushion} />
      </mesh>

      <mesh position={[0, -0.27, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.56, 24]} />
        <meshStandardMaterial {...CHAIR_MATERIALS.pedestal} />
      </mesh>

      <mesh position={[0, -0.57, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.05, 32]} />
        <meshStandardMaterial {...CHAIR_MATERIALS.foot} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} color={"#f2ede4"} />
      <directionalLight position={[3, 4, 3.4]} intensity={1.5} color={"#fff6e6"} />
      <directionalLight position={[-4, 1.4, -2]} intensity={0.5} color={"#c9d6dd"} />
      <pointLight position={[-1.6, 1.2, 2.4]} intensity={12} distance={8} color={"#ffffff"} />
      <pointLight position={[2.2, -0.6, -2]} intensity={6} distance={7} color={"#ffe9c8"} />
    </>
  );
}

export default function ChairScene({ scrollRef, pointerRef, quality = "high", isNarrow = false }) {
  const dpr = quality === "high" ? [1, 1.6] : [1, 1];
  const [viewRef, inView] = useInView(0.05);
  const cameraPosition = isNarrow ? [1.4, 0.5, 3.6] : [1.9, 0.5, 3.2];

  return (
    <div ref={viewRef} className="chair-canvas-wrap">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: cameraPosition, fov: 32 }}
        className="chair-canvas"
        frameloop={inView ? "always" : "never"}
      >
        <Lights />
        <Suspense fallback={null}>
          <Chair scrollRef={scrollRef} pointerRef={pointerRef} isNarrow={isNarrow} />
          <ContactShadows
            position={[0, -0.98, 0]}
            opacity={0.5}
            scale={6}
            blur={2.6}
            far={1.4}
            color="#141210"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
