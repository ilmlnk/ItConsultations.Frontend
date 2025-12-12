import { Component, NgZone, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'cons-three-warp-lines',
  standalone: false,
  templateUrl: './three-warp-lines.component.html',
  styleUrl: './three-warp-lines.component.scss'
})
export class ThreeWarpLinesComponent {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.InstancedMesh;
  private animationId!: number;

  private readonly COUNT = 1500;
  private readonly TUNNEL_DEPTH = 2000;
  private readonly SPEED = 350;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.initThree();
    this.createWarpLines();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.FogExp2(0x000000, 0.002);

    this.camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 2000);
    this.camera.position.z = 0;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private createWarpLines() {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 125.0, 1, 1, 30);

    const material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.SPEED },
        uDepth: { value: this.TUNNEL_DEPTH },
        uColor: { value: new THREE.Color(0.6, 0.6, 1.0) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.InstancedMesh(geometry, material, this.COUNT);

    const dummy = new THREE.Object3D();
    const range = 1000;

    for (let i = 0; i < this.COUNT; i++) {
      const x = (Math.random() - 0.5) * range;
      const y = (Math.random() - 0.5) * range;
      const z = Math.random() * this.TUNNEL_DEPTH;

      dummy.position.set(x, y, z);

      dummy.rotation.z = Math.random() * Math.PI;

      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.mesh);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const loop = (time: number) => {
        const t = time * 0.001;

        const material = this.mesh.material as THREE.ShaderMaterial;
        material.uniforms['uTime'].value = t;

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(loop);
      };
      this.animationId = requestAnimationFrame(loop);
    });
  }

  private vertexShader = `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uDepth;
    
    varying float vZ;

    vec2 rotate2d(vec2 v, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c) * v;
    }

    void main() {
      // 1. ОТРИМУЄМО ЦЕНТР ЛІНІЇ (ANCHOR)
      // Замість того щоб брати vertex position, ми беремо координати об'єкта з матриці
      vec3 instancePos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      
      // 2. РУХАЄМО ТІЛЬКИ ЦЕНТР
      float zOffset = uTime * uSpeed;
      
      // Розраховуємо зациклену позицію центру
      float zCenter = mod(instancePos.z + zOffset, uDepth) - (uDepth * 0.5);
      
      float finalZ = zCenter + position.z;

      vec3 pos = vec3(instancePos.x + position.x, instancePos.y + position.y, finalZ);

      float twistAngle = pos.z * 0.002 + uTime * 0.3;
      pos.xy = rotate2d(pos.xy, twistAngle);

      float hugeBendX = sin(uTime * 0.4 + pos.z * 0.001) * 400.0 
                      + cos(uTime * 0.7) * 100.0;

      float hugeBendY = cos(uTime * 0.5 + pos.z * 0.0015) * 300.0
                      + sin(uTime * 0.9) * 100.0;

      pos.x += hugeBendX;
      pos.y += hugeBendY;

      vZ = pos.z;

      gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
    }
  `;

  private fragmentShader = `
    uniform vec3 uColor;
    uniform float uDepth;
    varying float vZ;

    void main() {
      // Туман
      float fogFactor = smoothstep(-uDepth * 0.6, 0.0, vZ);
      // Різке зникнення перед камерою
      float nearFade = smoothstep(100.0, -100.0, vZ); 
      
      float alpha = fogFactor * nearFade;

      // Робимо далекі лінії трохи тьмянішими за кольором
      vec3 finalColor = mix(uColor * 0.5, uColor, fogFactor);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;
}
