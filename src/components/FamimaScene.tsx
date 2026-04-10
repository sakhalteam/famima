import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { experiences } from "../data/experiences";
import type { Experience } from "../data/experiences";

const GLB_PATH = import.meta.env.BASE_URL + "famima.glb";

function FloatingCard({ experience, position }: { experience: Experience; position: THREE.Vector3 }) {
  const navigate = useNavigate();
  const ref = useRef<THREE.Group>(null!);

  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 1.2 + offset) * 0.04;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Html
        center
        style={{ pointerEvents: "auto" }}
      >
        <button
          className={`scene-card ${experience.ready ? "scene-card--ready" : "scene-card--coming"}`}
          onClick={() => experience.ready && navigate(experience.path)}
          disabled={!experience.ready}
        >
          <span className="scene-card-emoji">{experience.emoji}</span>
          <span className="scene-card-title">{experience.titleJp}</span>
          <span className="scene-card-sub">{experience.titleEn}</span>
          {!experience.ready && <span className="scene-card-badge">Soon</span>}
        </button>
      </Html>
    </group>
  );
}

function StoreModel() {
  const { scene } = useGLTF(GLB_PATH);

  const cardPositions = useMemo(() => {
    const positions: { experience: Experience; position: THREE.Vector3 }[] = [];
    for (const exp of experiences) {
      const obj = scene.getObjectByName(exp.portalMesh);
      if (obj) {
        const worldPos = new THREE.Vector3();
        obj.getWorldPosition(worldPos);
        worldPos.y += 0.6;
        positions.push({ experience: exp, position: worldPos });
      } else {
        // Fallback for missing portals — place near center
        positions.push({ experience: exp, position: new THREE.Vector3(0, 1.4, 0.5) });
      }
    }
    return positions;
  }, [scene]);

  return (
    <>
      <primitive object={scene} />
      {cardPositions.map(({ experience, position }) => (
        <FloatingCard key={experience.id} experience={experience} position={position} />
      ))}
    </>
  );
}

export default function FamimaScene() {
  return (
    <div className="scene-container">
      <Canvas
        camera={{ position: [0, 2.5, 4], fov: 50 }}
        frameloop="demand"
        gl={{
          antialias: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl, invalidate }) => {
          // Kick off a continuous render loop since we use useFrame for bob animation
          const loop = () => { invalidate(); requestAnimationFrame(loop); };
          requestAnimationFrame(loop);

          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 2]} intensity={1} />
        <directionalLight position={[-2, 3, -1]} intensity={0.3} color="#88aaff" />
        <hemisphereLight args={["#b1e1ff", "#443322", 0.5]} />
        <StoreModel />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(GLB_PATH);
