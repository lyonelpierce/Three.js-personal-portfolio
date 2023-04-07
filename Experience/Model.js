import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GSAP from 'gsap';

export default class Model{
    constructor(){
        const canvas = document.querySelector('canvas.myCanvas')

        const myCanvas = document.querySelector('.myCanvas');
        const myCanvasStyles = getComputedStyle(myCanvas);
        const width = parseInt(myCanvasStyles.getPropertyValue('width'), 10);
        const height = parseInt(myCanvasStyles.getPropertyValue('height'), 10);

        const scene = new THREE.Scene()

        /**
         * Models
         */
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)
        
        let mixer = null

        gltfLoader.load(
            '/models/aboutme.glb',
            (glb) =>
            {
                glb.scene.scale.set(0.8, 0.8, 0.8)
                glb.scene.position.set(0, 0, 0)
                console.log(glb)
                scene.add(glb.scene)

                // Animation
                mixer = new THREE.AnimationMixer(glb.scene)
                const action = mixer.clipAction(glb.animations[0])
                action.play()
            }
        )
        
        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight('#ffffff', 1)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(2048, 2048)
        directionalLight.shadow.camera.far = 20
        directionalLight.shadow.normalBias = 0.05;
        directionalLight.position.set(1.5, 7, 3)
        scene.add(directionalLight)

        // const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
        // scene.add(helper);
        /**
         * Sizes
         */
        const sizes = {
            width: width,
            height: height
        }
        
        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = width
            sizes.height = height
        
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
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(-1.5, 1.7, 2)
        scene.add(camera)
        
        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false
        
        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
        })
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.useLegacyLights = true;
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap
        renderer.toneMapping = THREE.CineonToneMapping;
        renderer.toneMappingExposure = 1
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        /**
         * Animate
         */
        const clock = new THREE.Clock()
        let previousTime = 0
        
        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime
        
            // Model animation
            if(mixer !== null)
            {
                mixer.update(deltaTime)
            }
        
            // Update controls
            controls.update()
        
            // Render
            renderer.render(scene, camera)
        
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        
        tick()
    }
}