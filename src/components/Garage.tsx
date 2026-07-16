"use client";

import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect } from "react";
import { vertexGLSL, fragmentGLSL } from "@/lib/glassShader";
import { TEAMS } from "@/lib/teamsData";

export function Garage({ scrollProgress }: { scrollProgress: number }) {
  const { size, camera } = useThree();

  // Update uTime uniform each frame
  useEffect(() => {
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      // Apply to all glass materials (simple approach: update via a global uniform)
      // For brevity we update each material individually in GlassCar/Garage.
      // Here we just tick; actual uniform updates happen inside each car component.
    };
    animate();
  }, []);

  // Camera lerp based on scrollProgress (0 = interior, 1 = track view)
  useEffect(() => {
    const startPos = new THREE.Vector3(0, 2, 10); // interior
    const endPos = new THREE.Vector3(0, 8, -15);   // track view
    camera.position.lerpVectors(startPos, endPos, scrollProgress);
    // Optionally look at origin
    camera.lookAt(0, 0, 0);
  }, [scrollProgress, camera]);

  // Demo: navigate to Mercedes when scrollProgress > 0.85
  useEffect(() => {
    if (scrollProgress > 0.85) {
      // In a real app you'd use router.push; here we just log.
      console.log("Navigate to Mercedes team page");
    }
  }, [scrollProgress]);

  return (
    <>
      {/* Environment (HDRI optional) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />

      {/* Ground plane */}
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#000000" opacity={0.15} transparent />
      </mesh>

      {/* Cars spaced on X‑axis */}
      {TEAMS.map((team, idx) => (
        <GlassCar
          key={team.key}
          color={team.color}
          position={[(idx - (TEAMS.length - 1) / 2) * 4, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1.2}
        />
      ))}

      {/* Optional OrbitControls for debugging */}
      {/* <OrbitControls /> */}
    </>
  );
}

/* Re‑use GlassCar component (defined later) */


