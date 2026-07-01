
/**
 * index.js
 *
 * Demo application entrypoint for the sequent event system.
 * This file builds a small UI surface, attaches event handlers,
 * and illustrates how EventEmitter, EventElement, and EventActionClass
 * can be combined for custom DOM event flow management.
 */

import EventEmitter from './sequent/EventEmitter.js'
import EventElement from './sequent/EventElementClass.js'
import EventActionClass from './sequent/EventActionClass.js'
import HangulClass from './hangulClass.js'
import KeyboardClass from './keyboardClass.js'
import FileInput from './FileInput.js'
import FrameEmitter from './frameEmitter.js'

const mainStart = args => {
    init();
    //tast();
}

const main = args => {

}

const tast = args => {

    const h = new HangulClass();
    console.log(h.processKey('s'), h.cho, h.jung, h.jong);
    console.log(h.processKey('h'), h.cho, h.jung, h.jong);
    console.log(h.processKey('k'), h.cho, h.jung, h.jong);

}

const init = args => {
    const nodes = createUI();
    const keyboard = new KeyboardClass();
    keyDown({element: nodes.input.getElementsByClassName('intext').item(0), keyboard});
    nodes.monitor.children[0].textContent = keyboard.target.buffer;
    let firstClick = true;
    const fileInput = new FileInput(nodes.monitor, (text) => {
        text = text.replace(/[\r\n]/g, '');
        keyboard.output.order = 0;
        keyboard.output.buffer = '';
        keyboard.target.order = 0;
        keyboard.target.buffer = text;
        firstClick = true
        nodes.monitor.children[0].textContent = text;
    });
    const frameEmitter = new FrameEmitter();
    let frameCount = 0;
    let typingCount = 0;
    let lastTimestamp = 0;
    let timeCount = 0;
    
    frameEmitter.push('speed', (timestamp) => {
        frameCount++;
        if (frameCount >= 10) {
            frameCount = 0;
            timeCount += timestamp - lastTimestamp;
            nodes.status.children[0].textContent = 'typing speed: ' + (typingCount / timeCount * 60 * 1000).toFixed(2) + ' wpm';
            //console.log('typing speed:', typingCount / tigCount * 60);
            lastTimestamp = timestamp;
        }
    });
    keyboard.processAppendEvent = () => {
        if (firstClick) {
            firstClick = false;
            if(!frameEmitter.binded) {
                frameEmitter.bind();
            }
            timeCount = 0;
            return;
        }
        console.log('processAppendEvent');
        typingCount++;
        if(keyboard.target.buffer.length === keyboard.output.buffer.length) {
            firstClick = true;
            typingCount = 0;
            timeCount = 0;
            frameEmitter.unbind('speed');
        }
    };
    frameEmitter.bind();
}


const createUI = args => {
    const input = createInput();
    const monitor = createMonitor();
    const ground = createGround();
    const status = createStatus();
    appBInd(ground);
    appBInd(monitor, ground);
    appBInd(input, ground);
    appBInd(status, ground);
    reclosed({element: ground});
    return { input, monitor, ground, status };
}

const reclosed = args => {
    const { element, eventElement = new EventElement } = args || {};
    const emitter = EventEmitter.form(document);
    if( element instanceof HTMLElement && eventElement instanceof EventElement ) {
        eventElement.push( new EventActionClass({ callback: ({event})=>{
            if(event instanceof MouseEvent) {
                event.target === document.getRootNode().childNodes.item(1) && element.classList.remove('element_close');
            }
        }, tag: 'click', target: emitter}))
        eventElement.setup.classic;
    }
}

/**
 * Bind a simple keyboard event sequence to the given element.
 * The event element manages an EventActionClass instance that
 * listens for keydown events through a shared EventEmitter.
 */
const keyDown = args => {
    const { element, eventElement = new EventElement, keyboard } = args || {};
    const emitter = EventEmitter.form(document);
    let lang = 'ko';
    
    if( element instanceof HTMLElement && eventElement instanceof EventElement ) {
        eventElement.push(new EventActionClass({ callback: ({event})=>{ if( event instanceof KeyboardEvent ) {
            if( event.ctrlKey && event.key === 's' ) {
                event.preventDefault();
            }

            if( event.key === 'HangulMode') {
                const kepLang = keyboard.lang;
                keyboard.lang = lang;
                lang = kepLang;
            }
            
            if( event.key === 'Backspace' ) {
                keyboard.Backspace();
            } else if( event.key.length === 1 && !event.ctrlKey && !event.altKey ) {
                keyboard.processKey(event.key);
                element.textContent = keyboard.getOutput();
            }
        }}, tag: 'keydown', target: emitter}));
        
        eventElement.setup.classic;
    }
    emitter.bind
    return EventElement;
}



/**
 * Create a click-like button event action for a target element.
 * This helper wraps EventActionClass so callers can provide a simple
 * action callback for mouse down behavior.
 */
const buttonDownEvent = args => {
    const { element, eventElement = new EventElement, action = ()=>{} } = args || {};
    const emitter = EventEmitter.form(element);
    if( element instanceof HTMLElement && eventElement instanceof EventElement ) {
        eventElement.push( new EventActionClass({ callback: ({event})=>{ if(event instanceof MouseEvent) {
            action()
        }}, tag: 'click', target: emitter }))
        eventElement.setup.classic
        emitter.bind
        return eventElement;
    }
    
}

/**
 * Attach a full-screen maximize behavior to the provided element.
 * This demonstrates custom event composition by reusing buttonDownEvent
 * with a generated action that updates the target element styles.
 */
const screenMaxElementEvent = args => {
    const { element, eventElement = new EventElement, target = element, action: func } = args || {};
    //const emitter = EventEmitter.form(element);
    if( element instanceof HTMLElement && eventElement instanceof EventElement && target instanceof HTMLElement ) {
        const setMap = new Map;
        setMap.set('width', '100%')
        setMap.set('height', '100%')
        setMap.set('left', '0%')
        setMap.set('top', '0%')
        const action = args => {
            func && func();
            setMap.forEach((val, key, map)=>{
                const pv = target.style[key];
                target.style[key] = val;
                map.set(key, pv);
            })
        }
        buttonDownEvent({ element, eventElement, action })
        return eventElement;
    }
    
}

const windowBarMaxMinElement = args => {
    const {element = createDivElement(), target : element_target, action : append_action } = args || {};
    if( element instanceof HTMLElement ) {
        element.classList.add('window_bar_maxmin', 'window_bar_button');
        const max = document.createElement('div');
        max.classList.add('window_bar_maxmin_max');
        const min = document.createElement('div');
        min.classList.add('window_bar_maxmin_min');
        appBInd(max, element);
        appBInd(min, element);
        //element.removeChild(max);
        element.removeChild(max);
        let stus = 'min';
        screenMaxElementEvent({ element: element, target: element_target, action: ()=>{
            switch(stus) {
                case 'min':
                    stus = 'max';
                    element.removeChild(min);
                    element.appendChild(max);
                    break;
                case 'max':
                    stus = 'min';
                    element.removeChild(max);
                    element.appendChild(min);
                    break;
            }
            append_action && append_action(stus);
        }, });
        return element;
    }
}

const windowCloseElement = args => {
    const {element = createDivElement(), target : element_target} = args || {};
    if( element instanceof HTMLElement && element_target instanceof HTMLElement ) {
        element.classList.add('window_bar_button', 'window_bar_close');
        buttonDownEvent({element, action: ()=>{
            element_target.classList.add('element_close');
        }});
        return element;
    }
}

const windowElement = args => {
    const { element = createDivElement() } = args || {};
    element.style.width || (element.style.width = '600px');
    element.style.height || (element.style.height = '400px');
    const bar = createDivElement();
    bar.classList.add('window_bar');

    const dragEvent = dragEventElement({element: bar, down: ({pos})=>{
        const rect = element.getBoundingClientRect();
        for( const index of 'xy') pos[index] = rect[index];
    }, move: ({pos})=>{
        element.style.left = pos.x + 'px';
        element.style.top = pos.y + 'px';
    }});

    const closed = windowCloseElement({target: element});

    const maxmined = windowBarMaxMinElement({target: element, action: (stus)=>{
        if(stus === 'max') {
            dragEvent.unbind;
        } else if(stus === 'min') {
            dragEvent.actions[0].bind;
        }
        console.log('ell')
    }});
    
    appBInd(closed, bar);
    appBInd(maxmined, bar);
    appBInd(bar, element);

    

    return element;
}



const createGround = args => {
    const ground = createDivElement();
    ground.style.width = '860px';
    ground.style.height = '320px';
    ground.classList.add('ground');
    windowElement({element: ground})
    return ground;
}

const createInput = args => {
    const input = createDivElement();
    input.style.top = 'auto';
    input.style.bottom = '30px';
    input.style.width = '600px';
    input.style.borderWidth = '1px 0px';
    input.classList.add('input')
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, input);
    
    return input;
}

const createMonitor = args => {
    const monitor = createDivElement();
    monitor.style.top = '50px';
    monitor.style.width = '600px';
    monitor.style.borderWidth = '1px 0px';
    monitor.classList.add('monitor')
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, monitor);
    return monitor;
}

const createStatus = args => {
    const status = createDivElement();
    status.style.top = '5px';
    status.style.width = '600px';
    status.style.height = '30px';
    //status.style.borderWidth = '1px 0px';
    status.style.border = '0px solid black';
    status.classList.add('status')
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, status);
    return status;
}

const createDivElement = args => {
    const div = document.createElement('div');
    div.classList.add('CenterElementClass');
    // metadata container for appended children/actions
    div.appends = {};
    // default appendAction stub — can be overridden by callers
    div.appends.appendAction_maxmin = ({ status } = {}) => {};

    return div;
}

const settingDivElement = args => {
    const { element } = args;
    if( element instanceof HTMLElement ) {
        const pr = element.parentElement.getBoundingClientRect();
        const dr = element.getBoundingClientRect();
        element.style.left = `${(pr.width - dr.width)/ 2}px`;
    }
    return element;
}

const settingButtonElement = args => {
    const { button } = args;
    if( button instanceof HTMLButtonElement ) {
        // 버튼 특화 설정이 필요하다면 여기에 추가
    }
    return button;
}

const appBInd = (element, parent = document.body) => {
    parent.appendChild(element);
    if( element instanceof HTMLDivElement ) {
        settingDivElement({element});
    } else if( element instanceof HTMLButtonElement ) {
        settingButtonElement({button: element});
    }
    return element;
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
                    const rect = {};
                    let pos;
                    down && down({pos: pos = {}}) || (pos = element.getBoundingClientRect());

                    rect.x = pos.x - event.clientX;
                    rect.y = pos.y - event.clientY;
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
        return eventElement;
    }
}

mainStart();
///tast()