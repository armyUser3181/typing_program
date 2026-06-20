
import EventEmitter from './sequent/EventEmitter.js'
import EventElement from './sequent/EventElementClass.js'
import EventActionClass from './sequent/EventActionClass.js'

const main = args => {

}

const init = args => {
    
}

const createUI = args => {
    const input = createDivElement();
    const monitor = createDivElement();
    const ground = createDivElement();
    document.body.appendChild(ground);
    dragEventElement({element: ground, move: ({pos})=>{
        ground.style.left = pos.x + 'px';
        ground.style.top = pos.y + 'px';
        //console.log(pos)
    }});

}

const dragEventElement = args => {
    const { element, down, up, move, eventElement = new EventElement } = args || {}
    const emitterIn = EventEmitter.form(element);
    const emitterOut = EventEmitter.form(document);
    const rectOfElement = {};
    rectOfElement.x = 0;
    rectOfElement.y = 0;
    if( element instanceof HTMLElement && eventElement instanceof EventElement ) {
        eventElement.push(
            new EventActionClass({
                callback: ({event})=>{ if(event instanceof MouseEvent) {
                    const thisRect = element.getBoundingClientRect();
                    const rect = {};
                    rect.x = thisRect.x - event.clientX;
                    rect.y = thisRect.y - event.clientY;
                    for( const index of 'xy') rectOfElement[index] = rect[index];
                    return 'next';
                }},
                tag: 'mousedown',
                target: emitterIn,
            }),
            new EventActionClass({
                callback: ({event})=>{ if(event instanceof MouseEvent) {
                    const rect = {};
                    rect.x = event.clientX + rectOfElement.x;
                    rect.y = event.clientY + rectOfElement.y;
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
        eventElement.setup.call
        emitterIn.bind
    }
}

const createDivElement = args => {
    const div = document.createElement('div');
    div.classList.add('CenterElementClass');
    return div;
}

createUI()