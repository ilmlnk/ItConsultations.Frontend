import { Component, ElementRef, ViewChild, NgZone, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'cons-three-particles',
  standalone: false,
  templateUrl: './three-particles.component.html',
  styleUrl: './three-particles.component.scss'
})
export class ThreeParticlesComponent implements OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.InstancedMesh;
  
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  
  private isHovering = false;
  private targetPoint = new THREE.Vector3(0, 0, 0);
  private currentPoint = new THREE.Vector3(0, 0, 0);
  
  private targetAmplitude = 5.0;
  private currentAmplitude = 5.0;

  private animationId!: number;

  private readonly ROWS = 100; 
  private readonly COLS = 100; 
  private readonly SPACING = 4;
  private readonly GRID_WIDTH = this.COLS * this.SPACING;
  private readonly GRID_DEPTH = this.ROWS * this.SPACING;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initThree();
    this.createInstancedGrid();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovering = true;
    this.targetAmplitude = 20.0;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovering = false;
    this.targetAmplitude = 14.0;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isHovering) return;
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
    this.scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 60, 20);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private createInstancedGrid() {
    // Робимо стовпчики трохи тоншими для більш витонченого вигляду хаосу
    const geometry = new THREE.BoxGeometry(0.15, 1, 0.15);
    geometry.translate(0, 0.5, 0);

    const material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        uTargetPos: { value: new THREE.Vector3(0, 0, 0) },
        uTime: { value: 0 },
        uAmplitude: { value: 0 },
      },
      transparent: true
    });

    const count = this.ROWS * this.COLS;
    this.mesh = new THREE.InstancedMesh(geometry, material, count);

    const dummy = new THREE.Object3D();
    let index = 0;
    const offsetX = this.GRID_WIDTH / 2;
    const offsetZ = this.GRID_DEPTH / 2;

    const randomnessStrength = 0.7; 

    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        const baseX = (j * this.SPACING) - offsetX;
        const baseZ = (i * this.SPACING) - offsetZ;

        const jitterX = (Math.random() - 0.5) * this.SPACING * randomnessStrength;
        const jitterZ = (Math.random() - 0.5) * this.SPACING * randomnessStrength;

        dummy.position.set(
          baseX + jitterX,
          0,
          baseZ + jitterZ
        );

        dummy.rotation.y = Math.random() * Math.PI;

        dummy.updateMatrix();
        this.mesh.setMatrixAt(index++, dummy.matrix);
      }
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.mesh);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const loop = (time: number) => {
        const t = time * 0.001;

        if (this.isHovering) {
          this.raycaster.setFromCamera(this.mouse, this.camera);
          this.raycaster.ray.intersectPlane(this.plane, this.targetPoint);
        } else {
          const wanderRadius = 40;
          this.targetPoint.x = Math.sin(t * 0.5) * wanderRadius;
          this.targetPoint.z = Math.cos(t * 0.3) * wanderRadius;
          this.targetPoint.y = 0;
        }

        this.currentPoint.lerp(this.targetPoint, 0.05);
        this.currentAmplitude += (this.targetAmplitude - this.currentAmplitude) * 0.05;

        const material = this.mesh.material as THREE.ShaderMaterial;
        material.uniforms['uTargetPos'].value.copy(this.currentPoint);
        material.uniforms['uAmplitude'].value = this.currentAmplitude;
        material.uniforms['uTime'].value = t;

        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(loop);
      };
      this.animationId = requestAnimationFrame(loop);
    });
  }

  private vertexShader = `
    uniform vec3 uTargetPos;
    uniform float uAmplitude;
    uniform float uTime;
    varying float vIntensity;

    void main() {
      vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      float dist = distance(worldPosition.xz, uTargetPos.xz);
      float radius = 25.0 + (uAmplitude * 0.5); 
      float intensity = 1.0 - smoothstep(0.0, radius, dist);
      
      float idleWave = sin(worldPosition.x * 0.2 + uTime) * cos(worldPosition.z * 0.2 + uTime) * 0.5;
      float h = 0.2 + (intensity * uAmplitude) + idleWave;
      if (h < 0.1) h = 0.1;

      vIntensity = intensity;

      vec3 transformed = position;
      transformed.y *= h;

      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
    }
  `;

  private fragmentShader = `
    varying float vIntensity;

    void main() {
      vec3 color = mix(vec3(0.3, 0.3, 0.35), vec3(1.0, 1.0, 1.0), vIntensity);
      float alpha = mix(0.2, 1.0, vIntensity);
      gl_FragColor = vec4(color, alpha);
    }
  `;
}
