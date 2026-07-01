/**
 * 드래그 이벤트 핸들러
 * 마우스 드래그 앤 드롭 기능 제공
 */

import EventEmitter from '../sequent/EventEmitter.js';
import EventElement from '../sequent/EventElementClass.js';
import EventActionClass from '../sequent/EventActionClass.js';

/**
 * 드래그 이벤트 요소 생성
 * @param {Object} args - { element, down, up, move, eventElement }
 * @returns {EventElement} 이벤트 요소
 */
const dragEventElement = (args) => {
    const { element, down, up, move, eventElement = new EventElement } = args || {};
    const emitterIn = EventEmitter.form(element);
    const emitterOut = EventEmitter.form(document);
    const rectOfElement = {};
    rectOfElement.x = 0;
    rectOfElement.y = 0;
    if (element instanceof HTMLElement && eventElement instanceof EventElement) {
        eventElement.push(
            new EventActionClass({
                callback: ({ event }) => {
                    if (event instanceof MouseEvent) {
                        const rect = {};
                        let pos;
                        down && down({ pos: pos = {} }) || (pos = element.getBoundingClientRect());

                        rect.x = pos.x - event.clientX;
                        rect.y = pos.y - event.clientY;
                        for (const index of 'xy') rectOfElement[index] = rect[index];

                        return 'next';
                    }
                },
                tag: 'mousedown',
                target: emitterIn,
            }),
            new EventActionClass({
                callback: ({ event }) => {
                    if (event instanceof MouseEvent) {
                        const rect = {};
                        rect.x = event.clientX + rectOfElement.x;
                        rect.y = event.clientY + rectOfElement.y;
                        const rt = move && move({ pos: rect });
                        return 'loop';
                    }
                },
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
        );
        eventElement.setup.call;
        emitterIn.bind;
        return eventElement;
    }
};

export { dragEventElement };
