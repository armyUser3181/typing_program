/**
 * 문서 수준 이벤트 핸들러
 * 문서 클릭 이벤트 처리
 */

import EventEmitter from '../sequent/EventEmitter.js';
import EventElement from '../sequent/EventElementClass.js';
import EventActionClass from '../sequent/EventActionClass.js';

/**
 * 문서 클릭 시 요소 닫기 처리
 * @param {Object} args - { element, eventElement }
 */
const reclosed = (args) => {
    const { element, eventElement = new EventElement } = args || {};
    const emitter = EventEmitter.form(document);
    if (element instanceof HTMLElement && eventElement instanceof EventElement) {
        eventElement.push(new EventActionClass({
            callback: ({ event }) => {
                if (event instanceof MouseEvent) {
                    event.target === document.getRootNode().childNodes.item(1) && element.classList.remove('element_close');
                }
            },
            tag: 'click',
            target: emitter
        }));
        eventElement.setup.classic;
    }
};

export { reclosed };
