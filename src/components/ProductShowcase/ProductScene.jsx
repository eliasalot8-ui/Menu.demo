import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { shellGeometry, cushionGeometry, CHAIR_MATERIALS } from "../../lib/chairGeometry";
import { useInView } from "../../hooks/useInView";

function Chair({ progressRef }) {
  const group = useRef();
  const shell = useMemo(() => shellGeometry(), []);
  const cushion = useMemo(() => cushionGeometry(), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progressRef.current ?? 0;
    const targetY = -0.9 + p * (Math.PI * 1.15);
    const targetScale = 0.86 + p * 0.34;
    const targetX = Math.sin(p * Math.PI) * 0.35;

    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 3);
    const s = group.current.scale.x + (targetScale - group.current.scale.x) * Math.min(1, delta * 3);
    group.current.scale.setScalar(s);
    group.current.position.x += (targetX - group.current.position.x) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} dispose={null}>
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

export default function ProductScene({ progressRef }) {
  const [viewRef, inView] = useInView(0.05);

  return (
    <div ref={viewRef} className="product-canvas-wrap">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 3.9], fov: 30 }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={0.5} color={"#efe6d3"} />
        <directionalLight position={[2.6, 3.4, 2.6]} intensity={1.4} color={"#fff2e0"} />
        <directionalLight position={[-3, 1, -2]} intensity={0.6} color={"#aebfd0"} />
        <pointLight position={[0, 1.4, 2.8]} intensity={8} distance={7} />
        <Suspense fallback={null}>
          <Chair progressRef={progressRef} />
          <ContactShadows position={[0, -0.98, 0]} opacity={0.55} scale={6} blur={2.4} far={1.3} color="#100e0c" />
        </Suspense>
      </Canvas>
    </div>
  );
}
