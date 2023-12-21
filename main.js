import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls;
let renderer;
let scene;

init();
animate();

function init() {
    const container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 0.01;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -0.25;

    const texture = getTextureFromImage('salinas - copia.jpg');

    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Increase segments for smoother sphere
    sphereGeometry.scale(-1, 1, 1); // Flip the sphere inside out so the texture is inside
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    window.addEventListener('resize', onWindowResize);
}

function getTextureFromImage(imageUrl) {
    const texture = new THREE.TextureLoader().load(imageUrl);
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false; // Depending on your texture orientation, you might need to adjust this

    return texture;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // required when damping is enabled
    renderer.render(scene, camera);
}
