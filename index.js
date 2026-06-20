
import EventEmitter from './sequent/EventEmitter.js'
import EventElement from './sequent/EventElementClass.js'
import EventActionClass from './sequent/EventActionClass.js'

const main = args => {

}

const init = args => {
    
}

const createUI = args => {
    const input = document.createElement('div');
    const monitor = document.createElement('div');
    const ground = document.createElement('div');
    ground.classList.add('CenterElementClass')
    document.body.appendChild(ground)
    dragEventElement({ground, move: ({pos})=>{
        ground.style.left = pos.x;
        ground.style.top = pos.y;
    }});
}

const dragEventElement = args => {
    const { element, down, up, move, eventElement = new EventElement } = args || {}
    const emitterIn = EventEmitter.form(element);
    const emitterOut = EventEmitter.form(document);
    const rectOfElement = { x, y };
    if( element instanceof HTMLElement && typeof down === 'function' && typeof up === 'function' && typeof move === 'function' && eventElement instanceof EventElement ) {
        eventElement.push(
            new EventActionClass({
                callback: ({event})=>{ if(event instanceof MouseEvent) {
                    const thisRect = element.getBoundingClientRect();
                    rectOfElement.x = thisRect - event.clientX;
                    rectOfElement.y = thisRect - event.clientY;
                    return 'next';
                }},
                tag: 'mousedown',
                target: emitterIn,
            }),
            new EventActionClass({
                callback: ({event})=>{ if(event instanceof MouseEvent) {
                    const rect = { x, y };
                    rect.x = event.clientX - rectOfElement.x;
                    rect.y = event.clientY - rectOfElement.y;
                    const rt = move({pos: rect});
                    return 'loop';
                }},
                tag: 'mousemove',
                target: emitterOut,
            }),
            new EventActionClass({
                callback: () => {
                    return 'try';
                },
                tag: 'mouseup',
                target: emitterOut,
            })
        )
    }
}

createUI()