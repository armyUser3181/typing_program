
import EventEmitter from './sequent/EventEmitter.js'

export default class FrameEmitter {
    constructor() {
        this.eventEmitter = new EventEmitter();
        this.binded = false;
    }

    push(tag, event) {
        this.eventEmitter.push(tag, event);
    }

    remove(tag, event) {
        this.eventEmitter.remove(tag, event);
    }

    clear(tag) {
        this.eventEmitter.clear(tag);
    }

    bind() {
        const action = () => {
            if(!this.binded) return;
            this.eventEmitter.map.forEach((value) => {
                value.forEach(event => {
                    event();
                });
            });
            requestAnimationFrame(action);
        }
        this.binded = true;
        this.action = requestAnimationFrame(action);
    }

    unbind() {
        //cancelAnimationFrame(this.action);
        this.binded = false;
    }
}
