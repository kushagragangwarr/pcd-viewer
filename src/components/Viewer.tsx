import { useEffect, useRef } from 'react';
import { SceneManager } from './SceneManager';

type ViewerProps = {
  fileUrls: string[];
  currentFrame: number;
};

export const Viewer = ({ fileUrls, currentFrame }: ViewerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    sceneManagerRef.current = new SceneManager(containerRef.current);
    sceneManagerRef.current.loadPointClouds(fileUrls).then(() => {
      sceneManagerRef.current!.showFrame(currentFrame);
    });

    sceneManagerRef.current.animate();

    return () => {
      sceneManagerRef.current?.dispose();
    };
  });

  useEffect(() => {
      sceneManagerRef.current?.showFrame(currentFrame);
  }, [currentFrame]);

  return <div ref={containerRef} style={{ width: '100%', height: '90vh'}} />;
};