import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const targetRotationRef = useRef(0);
  const isHoveredRef = useRef(false);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  const getMixedColor = () => {
    // Blend purple and blue
    const purple = new THREE.Color(0.57, 0.0, 0.98); // RGB(145, 0, 249)
    const blue = new THREE.Color(0.0, 0.4, 1.0); // RGB(0, 102, 255)
    return purple.lerp(blue, 0.5); // Adjust blend ratio if needed
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float iTime;
      uniform vec3 baseColor;
      varying vec2 vUv;

      void main() {
          vec2 uv = vUv;
          vec3 color = vec3(0.0);

          float wave1 = sin(uv.x * 10.0 + iTime * 1.5) * 0.1 + sin(uv.y * 7.0 + iTime * 1.2) * 0.1;
          float wave2 = cos(uv.x * 8.0 - iTime * 1.1) * 0.1 + cos(uv.y * 9.0 - iTime * 1.4) * 0.1;

          float pattern = wave1 + wave2;
          float glow = smoothstep(0.2, 0.0, abs(pattern));
          glow = pow(glow, 1.5);

          // Soft white shadow around the wave
          float whiteShadow = smoothstep(0.1, 0.0, abs(pattern)) * 0.2;

          vec3 finalColor = baseColor * glow + vec3(1.0) * whiteShadow;

          // Vignette effect
          float vignette = smoothstep(0.8, 0.2, distance(uv, vec2(0.5)));
          finalColor = mix(finalColor, vec3(0.0), vignette);

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(3.5, 3.5);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        baseColor: { value: getMixedColor() },
      },
      vertexShader,
      fragmentShader,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const onWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', onWindowResize);

    const onMouseMove = (event) => {
      if (!cameraRef.current || !meshRef.current) return;
      const mouse = mouseRef.current;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouse, cameraRef.current);
      const intersects = raycasterRef.current.intersectObject(meshRef.current);
      isHoveredRef.current = intersects.length > 0;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      if (!meshRef.current || !materialRef.current) return;

      const elapsedTime = (Date.now() - startTimeRef.current) * 0.001;
      materialRef.current.uniforms.iTime.value = elapsedTime;

      const currentRot = meshRef.current.rotation.z;
      const targetRot = THREE.MathUtils.degToRad(targetRotationRef.current);
      const delta = targetRot - currentRot;
      meshRef.current.rotation.z += delta * 0.1;

      const targetScale = isHoveredRef.current ? 1.05 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);

      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-[-1]"
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedBackground;
