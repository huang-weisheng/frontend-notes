
import * as THREE from './three.module.js';
const scene=new THREE.Scene();
const camare=new THREE.PerspectiveCamera();
camare.position.z=10;
camare.position.y=2;
const gemetry=new THREE.BoxGeometry();
const materiaal=new THREE.MeshBasicMaterial({color: 0xff00ff});
const cube=new THREE.Mesh(gemetry,materiaal);
cube.position.set(0,1,0);
scene.add(cube);
const rendener=new THREE.WebGLRenderer();
document.body.appendChild(rendener.domElement);
rendener.setSize(innerWidth,innerHeight);
const helper=new THREE.GridHelper(10,10);
scene.add(helper);
rendener.render(scene,camare);
