//"Rabbit / Hase" (https://skfb.ly/6qBNq) by nedo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
console.log('"Rabbit / Hase" (https://skfb.ly/6qBNq) by nedo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).')

import * as THREE from 'three';


import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';



import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

let camera, scene, renderer, effect, stats;
let model;
let modelClones = []; 



let t =0;
let tiempo = 0.045 * Math.sin(t) + 0.055;

renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.toneMapping = THREE.ACESFilmicToneMapping;


init();

async function init() {

const container = document.createElement( 'div' );
document.body.appendChild( container );


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
camera.position.set( - 1.8, 0.6, 2.7 );
scene.background = new THREE.Color( 0, 0, 0 );


new RGBELoader()
.setPath( 'public/' )
.load( '768-hdri-skies-com.hdr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;

    //scene.background = texture;
    scene.environment = texture;

   // render();

    // model

    const loader = new GLTFLoader().setPath( 'public/' );
    loader.load( 'rabbit__hase.glb', function ( gltf ) {
        model = gltf.scene;
        //model.position.set( 0, -3, 0 );
        model.scale.set(0.005, 0.005, 0.005); // Adjust the scale as needed
        scene.add(model);

        for (let i = 0; i < 30; i++) {
            const modelClone = model.clone();

            modelClone.position.x = Math.random() * 60 - 40;
            modelClone.position.y = Math.random() * 60 - 40;
            modelClone.position.z = Math.random() * 60 - 40;
            
            modelClones.push(modelClone);
            scene.add(modelClone);

        }

        console.log('GLB model loaded successfully from RGBELoader path.');
    

      // render();

    } );

} );


}


camera.position.z = 5;


//container.appendChild(renderer.domElement);

// Stats setup
stats = new Stats();
container.appendChild(stats.dom);




effect = new AsciiEffect( renderer,  ' .\'`^",:;Il!i~+_-?][}{&8%B@$', { invert: true, resolution: tiempo  } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';
effect.domElement.style.fontSize = '30px'; 


document.body.appendChild( effect.domElement );



const controls = new OrbitControls( camera, effect.domElement );
//controls.addEventListener( 'change', render ); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set( 0, 0, - 0.2 );
controls.update();




window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);


}

function animate() {
    stats.begin();


    t += 0.05;
    tiempo = 0.045 * Math.sin(t) + 0.055; 


    if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.05;
        model.rotation.z += 0.03;
      }

    
      modelClones.forEach(clone => {
        clone.rotation.y += 0.05;
        clone.rotation.x += 0.05;
        clone.rotation.z += 0.03;
    });  

    
  effect.render(scene, camera);

    stats.end();


}







