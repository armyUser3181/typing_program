
import EventEmitter from './sequent/EventEmitter.js'
import EventElement from './sequent/EventElementClass.js'
import EventActionClass from './sequent/EventActionClass.js'

const main = args => {

}

const init = args => {
    const nodes = createUI();
    keyDown({element: nodes.input});
}

const createUI = args => {
    const input = createInput();
    const monitor = createMonitor();
    const ground = createGround();
    appBInd(ground);
    appBInd(input, ground);
    dragEventElement({element: ground, move: ({pos})=>{
        ground.style.left = pos.x + 'px';
        ground.style.top = pos.y + 'px';
        //console.log(pos)
    }});
    return { input, monitor, ground };
}

const keyDown = args => {
    const { element, eventElement = new EventElement } = args || {};
    const emitter = EventEmitter.form(document);
    if( element instanceof HTMLDivElement && eventElement instanceof EventElement ) {
        eventElement.push(new EventActionClass({ callback: ({event})=>{ if( event instanceof KeyboardEvent ) {
            if( event.ctrlKey && event.key === 's' ) {
                event.preventDefault();
            }
            element.textContent += event.key;
            
        }}, tag: 'keydown', target: emitter}));
        eventElement.setup.classic;
    }
    emitter.bind
    
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
                    down && down(rect)
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
                    const rt = move && move({pos: rect});
                    return 'loop';
                }},
                tag: 'mousemove',
                target: emitterOut,
            }),
            new EventActionClass({
                callback: ({}) => {
                    up && up();
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

const createGround = args => {
    const ground = createDivElement();
    ground.style.width = '400px';
    ground.style.height = '600px';
    return ground;
}

const createInput = args => {
    const input = createDivElement();
    return input;
}

const createMonitor = args => {
    const monitor = createDivElement();
    return monitor;
}

const createDivElement = args => {
    const div = document.createElement('div');
    div.classList.add('CenterElementClass');
    return div;
}

const settingDivElement = args => {
    const { div } = args;
    if( div instanceof HTMLDivElement ) {
        div.style.left;
        const pr = div.parentElement.getBoundingClientRect();
        const dr = div.getBoundingClientRect();
        div.style.left = `${(pr.width - dr.width)/ 2}px`;
    }
    return div;
}

const appBInd = (element, parent = document.body) => {
    parent.appendChild(element);
    settingDivElement({div: element});
    return element;
}

init();