import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointCloudManager } from './PointCloudManager';

type ViewerProps = {
  fileUrls: string[];
  currentFrame: number;
};

export const Viewer = ({ fileUrls, currentFrame }: ViewerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const managerRef = useRef<PointCloudManager | null>(null);

  useEffect(() => {
    const width = containerRef.current!.clientWidth;
    const height = containerRef.current!.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(1, 1, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current!.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    managerRef.current = new PointCloudManager(scene);
    managerRef.current.loadPointClouds(fileUrls).then(() => {
      managerRef.current!.showFrame(currentFrame);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  useEffect(() => {
    if (managerRef.current) {
      managerRef.current.showFrame(currentFrame);
    }
  }, [currentFrame]);

  return <div ref={containerRef} style={{ width: '100%', height: '90vh'}} />;
};