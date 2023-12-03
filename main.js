import './style.css'

import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

const canvas = renderer.domElement;


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

camera.position.z = 30;

renderer.render(scene, camera)

//MATERIAL SETTINGS
const objectMaterial = {
  color: 0x049ef4,
  roughness: 0.5,
  metalness: 0.9,
  clearcoat: 1.0,
  reflectivity: 1.0,
};

//OBJECT
const geometry = new THREE.IcosahedronGeometry(12);
const material = new THREE.MeshPhysicalMaterial(objectMaterial);
const object = new THREE.Mesh(geometry, material);

scene.add(object);

//LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
directionalLight.target = object;
directionalLight.castShadow = true;
directionalLight.receiveShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(directionalLight, ambientLight);


//MOUSE POSITION
const temp = new THREE.Vector3();
function getCanvasRelativePosition( event ) {

  const rect = canvas.getBoundingClientRect();
  return {
    x: ( event.clientX - rect.left ) * canvas.width / rect.width,
    y: ( event.clientY - rect.top ) * canvas.height / rect.height,
  };

}

function onMouseMove(e) {
  const mousePosition = getCanvasRelativePosition( e );
  
		const x = mousePosition.x / canvas.width * 2 - 1;
		const y = mousePosition.y / canvas.height * - 2 + 1;
		temp.set( x, y, 0 ).unproject(camera);


  directionalLight.position.set(temp.x, temp.y);
}

window.addEventListener('mousemove', onMouseMove);


//UPDATE CAMERA AND RENDERER UPON WINDOW RESIZE
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

//ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  object.rotation.y += 0.002;
  object.rotation.z += 0.003;
}

animate();

//In-view observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
    else {
      entry.target.classList.remove('show');
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el));

function isMobile() {
  const avatar = document.querySelector('.avatar');
  const divText = document.querySelector('.text');
  const container = document.querySelector('.container');
  const paragraph1 = divText.querySelector('#p2');

  if (( window.innerWidth <= 600 ) && ( window.innerHeight <= 900 )){
    divText.insertBefore(avatar, paragraph1);
  }
  else {
    container.appendChild(avatar)
  }
}


window.addEventListener('resize', () => {
  isMobile();
})
