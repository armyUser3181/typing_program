
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
import { createDivElement, settingDivElement, settingButtonElement, appBInd } from './utils/DOM.js'
import { buttonDownEvent, screenMaxElementEvent } from './events/ButtonHandler.js'
import { dragEventElement } from './events/DragHandler.js'
import { reclosed } from './events/DocumentHandler.js'
import { keyDown } from './events/KeyboardHandler.js'
import { createInput } from './ui/components/Input.js'
import { createMonitor } from './ui/components/Monitor.js'
import { createStatus } from './ui/components/Status.js'
import { createGround } from './ui/components/Ground.js'
import { windowCloseElement } from './ui/window/CloseButton.js'
import { windowBarMaxMinElement } from './ui/window/MaxMinButton.js'
import { windowElement } from './ui/window/Window.js'
import { TypingSpeedService } from './services/TypingSpeedService.js'
import { FileService } from './services/FileService.js'

const mainStart = args => {
    init();
}

const init = args => {
    const nodes = createUI();
    const keyboard = new KeyboardClass();
    keyDown({element: nodes.input.getElementsByClassName('intext').item(0), keyboard});
    nodes.monitor.children[0].textContent = keyboard.target.buffer;
    let firstClick = true;
    
    const typingSpeedService = new TypingSpeedService(nodes.status);
    
    const fileService = new FileService(nodes.monitor, (text) => {
        text = text.replace(/[\r\n]/g, '');
        keyboard.output.order = 0;
        keyboard.output.buffer = '';
        keyboard.target.order = 0;
        keyboard.target.buffer = text;
        firstClick = true;
        nodes.monitor.children[0].textContent = text;
    });
    
    keyboard.processAppendEvent = () => {
        if (firstClick) {
            firstClick = false;
            typingSpeedService.start();
            return;
        }
        typingSpeedService.incrementTypingCount();
        if(keyboard.target.buffer.length - 1 === keyboard.output.buffer.length) {
            firstClick = true;
            typingSpeedService.stop();
        }
    };
}


const createUI = args => {
    const input = createInput();
    const monitor = createMonitor();
    const ground = createGround(windowElement);
    const status = createStatus();
    appBInd(ground);
    appBInd(monitor, ground);
    appBInd(input, ground);
    appBInd(status, ground);
    reclosed({element: ground});
    return { input, monitor, ground, status };
}

















mainStart();