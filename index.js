import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from './three.js/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './three.js/examples/jsm/geometries/TextGeometry.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js'

var scene = new THREE.Scene();

const FOV = 60
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 0.1
const FAR = 1000

var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
var camera2 = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
// var cam2helper = new THREE.CameraHelper(camera2)
// scene.add(cam2helper)

camera.position.x = 20
camera.position.y = 5
camera.position.z = 10

camera2.position.x = -20
camera2.position.y = 8 
camera2.position.z = 20

camera.lookAt(0, 0, 0)
camera2.lookAt(0, 0, 0)

var currentCamera = camera

var renderer = new THREE.WebGLRenderer({
    antialias: true
})

renderer.setClearColor(0xadb0a2)
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

var createPlane = () => {
    
    var planeGeometry = new THREE.PlaneGeometry(10, 10)
    var textureLoader = new THREE.TextureLoader()
    var planematerial = new THREE.MeshPhongMaterial({
        color: 0x848c86,
        side: THREE.DoubleSide,
        map: textureLoader.load("./img/floor.png"),
    })
    var planeMesh = new THREE.Mesh(planeGeometry, planematerial)
    planeMesh.rotation.x = Math.PI/2
    return planeMesh

}

var createBox = () =>{
    var boxGeometry = new THREE.BoxGeometry(1.7, 1.7, 1.7, 1.7)
    var textureLoader = new THREE.TextureLoader()
    var boxMaterial = new THREE.MeshStandardMaterial({
        roughness: 1,
        color:0xff6645,
        map: textureLoader.load("./img/box.png"),
        normalMap: textureLoader.load("./img/nbox.png")
    })
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    // var wireframe = new THREE.WireframeGeometry(boxgeometry)
    // var line = new THREE.LineSegments(wireframe)
    return boxMesh
}

var createCone = () =>{
    var coneGeometry = new THREE.ConeGeometry(8, 3, 16, true)
    var textureLoader = new THREE.TextureLoader()
    var coneMaterial = new THREE.MeshStandardMaterial({
        color:0x735a3c,
        map: textureLoader.load("./img/roof.png"),
        roughness : 5.0,
    })
    var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
    return coneMesh
}

var createSpere = () =>{
    var sphereGeometry = new THREE.SphereGeometry(0.7)
    var textureLoader = new THREE.TextureLoader()
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color:0xffffff,
        map: textureLoader.load("./img/balll.png"),

    })
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    return sphereMesh
}

var createCylinder = () =>{
    var cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 7, 64)
    var cylinderMaterial = new THREE.MeshPhongMaterial({
        color:0x848c86,
        shininess : 3
    })
    var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    return cylinderMesh
}

var planeMesh = createPlane();
planeMesh.receiveShadow = true
scene.add(planeMesh)

var corner1 = createCylinder()
corner1.position.x = 4.2
corner1.position.z = 4.2
corner1.position.y = 3.55
corner1.castShadow = true
scene.add(corner1)

var corner2 = createCylinder()
corner2.position.x = -4.2
corner2.position.z = 4.2
corner2.position.y = 3.55
corner2.castShadow = true
scene.add(corner2)

var corner3 = createCylinder()
corner3.position.x = -4.2
corner3.position.z = -4.2
corner3.position.y = 3.55
corner3.castShadow = true
scene.add(corner3)

var corner4 = createCylinder()
corner4.position.x = 4.2
corner4.position.z = -4.2
corner4.position.y = 3.55
corner4.castShadow = true
scene.add(corner4)

var sphereMesh = createSpere()
sphereMesh.position.x = 3.5
sphereMesh.position.z = 3.2
sphereMesh.position.y = 0.7
sphereMesh.castShadow = true
sphereMesh.layers.enable(1)
scene.add(sphereMesh)

var coneMesh = createCone()
coneMesh.position.x = 0
coneMesh.position.y = 8
scene.add(coneMesh)

var box = createBox()
box.position.y = 0.9
box.position.x = -2.4
box.castShadow = true
scene.add(box)

var ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.y = 5

var pointLight = new THREE.PointLight(0xffffff, 1, 1000)
pointLight.position.y = 5

var spotLight = new THREE.SpotLight(0xffffff, 1, 1000)
spotLight.position.y = 3

var directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.position.x = 10
directionalLight.position.y = 20


var directinallightHelper = new THREE.DirectionalLightHelper(directionalLight)
var spotlightHelper = new THREE.SpotLightHelper(spotLight)
var pointLightHelper = new THREE.PointLightHelper(pointLight)

// scene.add(directinallightHelper)
// scene.add(pointLightHelper)
// scene.add(spotlightHelper)

scene.add(directionalLight)
scene.add(spotLight);
scene.add(ambientLight)


var gltfLoader = new GLTFLoader()

gltfLoader.load('shiba/scene.gltf', (object) => {
    var model = object.scene
    model.scale.set(1.2, 1.2, 1.2)
    model.position.x = -2.3
    model.position.z =1
    // model.layers.enable(1)
    model.position.y = 2.95
    model.castShadow = true
    scene.add(model)
})

gltfLoader.load('shiba_inu_dog/shibainu.gltf', (object) => {
    var model = object.scene
    model.scale.set(0.5, 0.5, 0.5)
    model.position.x = 2.3
    model.position.y = 0
    model.position.z =1
    model.rotation.y = 20
    model.castShadow = true
    scene.add(model)
})

gltfLoader.load('shiba_free_fire/scene.gltf', (object) => {
    var model = object.scene
    model.scale.set(6, 6, 6)
    model.position.x = 3
    model.position.y = 0
    model.position.z = -2
    model.rotation.y = 40
    model.castShadow = true
    scene.add(model)
})

gltfLoader.load('3d_dog_cute/scene.gltf', (object) => {
    var model = object.scene
    model.scale.set(0.015, 0.015, 0.015)
    model.position.x = -1.5
    model.position.y = 0
    model.position.z = 2.4
    model.rotation.y = 0
    model.rotation.x = 4.7
    model.rotation.z = -0.5


    model.castShadow = true
    scene.add(model)
})

gltfLoader.load('dog_harvest_moon/scene.gltf', (object) => {
    var model = object.scene
    model.scale.set(0.5, 0.5, 0.5)
    model.position.x = -1.5
    model.position.y = 1.05
    model.position.z = -2.4
    model.rotation.y = -40
    model.rotation.x = 0
    model.rotation.z = 0
    model.castShadow = true
    scene.add(model)
})

var controls = new OrbitControls(camera, renderer.domElement)
controls.update()

var raycaster = new THREE.Raycaster()
raycaster.layers.set(1)

var skyboxGeometry = new THREE.BoxGeometry(100, 100, 100, 100)
var textureLoader = new THREE.TextureLoader()

var skyboxMaterials = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_rt.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_lf.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_up.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_dn.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_ft.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./img/nightsky_bk.png'),
        side: THREE.BackSide
    })
]

var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials)
scene.add(skybox)

var onMouseMove = (e) => {
    var mouse = {}
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
}

var onMouseClick = (e) => {
    var intersectedObject = raycaster.intersectObjects(scene.children)

    if(intersectedObject.length > 0){
        var fontLoader = new FontLoader()
        fontLoader.load('./three.js/examples/fonts/helvetiker_regular.typeface.json', (font) =>{
        var textGeometry = new TextGeometry('Puppy Ministry',{
            font: font,
            size: 1,
            height: 0.1
        })
        textGeometry.center()
        var textMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        })
        var textMesh = new THREE.Mesh(textGeometry, textMaterial,textMaterial)
        textMesh.position.y = 11
        scene.add(textMesh)
        })
    }
}

var changecamera = (e) => {
    if(e.keyCode == 32){
        if(currentCamera == camera){
            currentCamera = camera2
        }else{
            currentCamera = camera
        }
    }
    
}

window.addEventListener('mousemove', onMouseMove)
window.addEventListener('pointerdown', onMouseClick)
window.addEventListener('keydown', changecamera)

var render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, currentCamera)
}

render()