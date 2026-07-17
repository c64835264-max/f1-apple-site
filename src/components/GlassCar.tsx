"use client";

import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import * as THREE from "three";
import { vertexGLSL, fragmentGLSL } from "@/lib/glassShader";

interface Props {
  color: string; // hex with #
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function GlassCar({
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: Props) {
  const gltf = useLoader(GLTFLoader, `/models/${color.replace("#", "")}.glb`);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const mesh = gltf.scene.children[0] as THREE.Mesh;

  // Apply liquid‑glass material
  mesh.material = new THREE.ShaderMaterial({
    vertexShader: vertexGLSL,
    fragmentShader: fragmentGLSL,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uFresnelColor: { value: new THREE.Color(0xffffff) },
      uFresnelPower: { value: 4 },
      uGlassTint: { value: new THREE.Color(color) },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    transparent: true,
  });

  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(scale, scale, scale);
  meshRef.current = mesh;

  // Hover / click interactions (scale up on pointer over)
  const attachedRef = useRef(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (attachedRef.current) return;
    const m = meshRef.current;
    if (!m) return;
    const handleOver = () => {
      gsap.to(m.scale, {
        x: scale * 1.1,
        y: scale * 1.1,
        z: scale * 1.1,
        duration: 0.2,
        ease: "power.out",
      });
    };
    const handleOut = () => {
      gsap.to(m.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.2,
        ease: "power.out",
      });
    };
    m.onPointerOver = handleOver;
    m.onPointerOut = handleOut;
    return () => {
      m.onPointerOver = undefined;
      m.onPointerOut = undefined;
    };
  }, []);

  return <primitive object={mesh} />;
}


