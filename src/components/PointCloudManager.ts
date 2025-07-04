import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/Addons.js';

export class PointCloudManager {
  private scene: THREE.Scene;
  private loader: PCDLoader;
  private pointClouds: THREE.Points[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.loader = new PCDLoader();
  }

  async loadPointClouds(urls: string[]) {
    for (const url of urls) {
      const cloud = await this.loader.loadAsync(url);
      cloud.visible = false;
      this.pointClouds.push(cloud);
      this.scene.add(cloud);
    }
  }

  showFrame(index: number) {
    this.pointClouds.forEach((cloud, i) => {
      cloud.visible = i === index;
    });
  }
}