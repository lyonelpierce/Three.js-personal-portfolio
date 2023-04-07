import * as THREE from 'three';
import GSAP from 'gsap';

import Experience from "../Model";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.05,        
        }

        this.setModel();
        // this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // if(child.name === 'Plane'){
            //     this.room.scene.children[3].children[12].material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen,
            //     });
            // }
            // console.log(child.children);
        })

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(2, 2, 2);
        this.actualRoom.position.set(0, -1.2, 0);
    }
    
    onMouseMove(){
        window.addEventListener('mousemove', (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.5;
        })
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.idle = this.mixer.clipAction(this.room.animations[0]);
        this.idle.play();

        // console.log(this.room);
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );

        // this.actualRoom.rotation.y = this.lerp.current;
        this.room.scene.children[1].children[0].children[0].children[0].children[0].children[0].children[0].rotation.y = this.lerp.current;
        this.room.scene.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[1].rotation.y = this.lerp.current;
        this.room.scene.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[2].rotation.y = this.lerp.current;
        // this.mixer.update(this.time.delta * 0.0009);
    }
}