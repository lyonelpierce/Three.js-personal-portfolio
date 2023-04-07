import { EventEmitter } from "events";

export default class Preloader extends EventEmitter {
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

        this.on('worldready', () => {
            const myEvent = new CustomEvent('myCustomEvent', { detail: { message: 'Event triggered!' } });
            document.dispatchEvent(myEvent);
        });
    }
}