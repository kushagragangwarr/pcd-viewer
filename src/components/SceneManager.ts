import * as THREE from 'three';
import { OrbitControls, PCDLoader } from 'three/examples/jsm/Addons.js';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private loader: PCDLoader;
  private pointClouds: THREE.Points[] = [];
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(1, 1, 1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

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

  animate = () => {
    const animationLoop = () => {
      requestAnimationFrame(animationLoop);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    animationLoop();
  }

  dispose() {
    this.renderer.dispose();
    this.controls.dispose();
    this.pointClouds.forEach(cloud => this.scene.remove(cloud));
    
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}