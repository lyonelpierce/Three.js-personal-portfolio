import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter{
    constructor(){
        super();

        const myCanvas = document.querySelector('.myCanvas');
        const myCanvasStyle = getComputedStyle(myCanvas);
        const width = parseInt(myCanvasStyle.getPropertyValue('width'), 10);
        const height = parseInt(myCanvasStyle.getPropertyValue('height'), 10);
        // console.log(height);

        // console.log(width, height);

        this.width = width;
        this.height = height;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize', () => {
            const myCanvas = document.querySelector('.myCanvas');
            const myCanvasStyle = getComputedStyle(myCanvas);
            const width = parseInt(myCanvasStyle.getPropertyValue('width'), 10);
            const height = parseInt(myCanvasStyle.getPropertyValue('height'), 10);
            // console.log(height);


            this.width = width
            this.height = height;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit('resize');
        })
    }
}