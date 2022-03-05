import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


// Texture loade
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/SpecularMap.png");

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 20, 20);

// Materials

const material = new THREE.MeshStandardMaterial()
material.roughness = 1.339;
material.metalness = -4.396;
// material.wireframe = true;
material.color = new THREE.Color(0x0000ff)
material.normalMap = texture

const materialGui = gui.addFolder("Materials");
materialGui.add(material, "roughness").min(-10).max(10).step(0.001);
materialGui.add(material, "metalness").min(-10).max(10).step(0.001);
// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// const lightGui1 = gui.addFolder("light 1");
// lightGui1.add(pointLight, 'intensity')
// lightGui1.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
// lightGui1.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
// lightGui1.add(pointLight.position, 'z').min(-6).max(6).step(0.01)

// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1, 0xff0000)
// scene.add(pointLightHelper)

const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.x = 1.73;
pointLight1.position.y = -0.26;
pointLight1.position.z = -0.26;
pointLight1.intensity = 6.9
pointLight1.color.set(0xe8e8e8)
scene.add(pointLight1)



const lightGui1 = gui.addFolder("light 1");
lightGui1.add(pointLight1, 'intensity')
lightGui1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
lightGui1.add(pointLight1.position, 'y').min(-6).max(6).step(0.01)
lightGui1.add(pointLight1.position, 'z').min(-6).max(6).step(0.01)

const light1Color = {
    color: 0xe8e8e8
}
lightGui1.addColor(light1Color, "color")
    .onChange(() => {
        pointLight1.color.set(light1Color.color)
    })


const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
scene.add(pointLightHelper1)


const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.x = -1.84;
pointLight2.position.y = 1.6;
pointLight2.position.z = -0.26;
pointLight2.intensity = 6.9
scene.add(pointLight2)


const lightGui2 = gui.addFolder("light 2");
lightGui2.add(pointLight2, 'intensity')
lightGui2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
lightGui2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
lightGui2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)


const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper2)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let targetX = 0;
let targetY = 0;

window.addEventListener("mousemove", (e) => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    targetX = e.clientX - halfWidth;
    targetY = e.clientY - halfHeight;
})

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    const speed = 0.001;
    sphere.rotation.x += (targetY * speed - sphere.rotation.x);
    sphere.rotation.y += (targetX * speed);
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()