import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter{
    constructor(){
        super();

        const experienceEl = document.querySelector('.experience');
        const experienceStyles = getComputedStyle(experienceEl);
        const width = parseInt(experienceStyles.getPropertyValue('width'), 10);
        const height = parseInt(experienceStyles.getPropertyValue('height'), 10);
        // console.log(width, height);

        this.width = width;
        this.height = height;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize', () => {
            const experienceEl = document.querySelector('.experience');
            const experienceStyles = getComputedStyle(experienceEl);
            const width = parseInt(experienceStyles.getPropertyValue('width'), 10);
            const height = parseInt(experienceStyles.getPropertyValue('height'), 10);

            this.width = width
            this.height = height;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit('resize');
        })
    }
}