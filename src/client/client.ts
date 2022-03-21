import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const scene = new THREE.Scene();

const clock = new THREE.Clock();
let mixer:any;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1,100);
scene.add(camera);
// camera.position.z = 7;
// camera.position.x = -1;
camera.position.set(-1,5,7);
//Add light
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

window.onresize = function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('https://media.istockphoto.com/vectors/gold-foil-golden-background-vector-vector-id1271398703?k=20&m=1271398703&s=612x612&w=0&h=DYH7xAZrImf3fHLVgZ5NutjiYytp6Z1j3qi1VpXcojw=');

// const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100,22);
// const material = new THREE.MeshMatcapMaterial({matcap: texture});
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath('three/examples/js/libs/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoloader);
loader.load('/assets/adamHead.gltf', function(gltf){
    const model = gltf.scene;
    model.position.set(0,0,0);
    model.scale.set(1,1,1); 
    scene.add(model);

    // mixer = new THREE.AnimationMixer(model);
    // mixer.clipAction(gltf.animations[0]).play();

    animate();
}, undefined, function(e){
    console.log(e);
})
loader.load('/assets/firsttry.glb', function(gltf){
    const model = gltf.scene;
    model.position.set(2,-1,1);
    model.scale.set(0.5,0.5,0.5); 
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();
}, undefined, function(e){
    console.log(e);
})

const cursor = {x:0, y:0};

window.addEventListener('mousemove', (e)=>{
    cursor.x = e.clientX / window.innerWidth -1;
    cursor.y = e.clientY / window.innerHeight -1;
})

function animate() {

    requestAnimationFrame(animate);

    // mesh.rotation.x += 0.005;

    // const cameraX = -cursor.x-1;
    // const cameraY = cursor.y + 1;

    // camera.position.x += (cameraX - camera.position.x)/20;
    // camera.position.y += (cameraY - camera.position.y)/20;

    const delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    renderer.render(scene, camera);
}
