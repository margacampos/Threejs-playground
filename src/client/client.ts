import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
scene.add(camera);
camera.position.z = 7;
camera.position.x = -1;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://media.istockphoto.com/vectors/gold-foil-golden-background-vector-vector-id1271398703?k=20&m=1271398703&s=612x612&w=0&h=DYH7xAZrImf3fHLVgZ5NutjiYytp6Z1j3qi1VpXcojw=');

const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100,22);
const material = new THREE.MeshMatcapMaterial({matcap: texture});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cursor = {x:0, y:0};

window.addEventListener('mousemove', (e)=>{
    cursor.x = e.clientX / window.innerWidth -1;
    cursor.y = e.clientY / window.innerHeight -1;
})

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;

    const cameraX = -cursor.x-1;
    const cameraY = cursor.y + 1;

    camera.position.x += (cameraX - camera.position.x)/20;
    camera.position.y += (cameraY - camera.position.y)/20;

    renderer.render(scene, camera);
}

animate();