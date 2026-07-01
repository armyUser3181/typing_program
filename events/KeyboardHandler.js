/**
 * 키보드 이벤트 핸들러
 * 키보드 입력, 언어 전환, 백스페이스 처리
 */

import EventEmitter from '../sequent/EventEmitter.js';
import EventElement from '../sequent/EventElementClass.js';
import EventActionClass from '../sequent/EventActionClass.js';

/**
 * 키보드 입력 이벤트 바인딩
 * @param {Object} args - { element, eventElement, keyboard }
 * @returns {EventElement} 이벤트 요소
 */
const keyDown = (args) => {
    const { element, eventElement = new EventElement, keyboard } = args || {};
    const emitter = EventEmitter.form(document);
    let lang = 'ko';

    if (element instanceof HTMLElement && eventElement instanceof EventElement) {
        eventElement.push(new EventActionClass({
            callback: ({ event }) => {
                if (event instanceof KeyboardEvent) {
                    if (event.ctrlKey && event.key === 's') {
                        event.preventDefault();
                    }

                    if (event.key === 'HangulMode') {
                        const kepLang = keyboard.lang;
                        keyboard.lang = lang;
                        lang = kepLang;
                    }

                    if (event.key === 'Backspace') {
                        keyboard.Backspace();
                    } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey) {
                        keyboard.processKey(event.key);
                        element.textContent = keyboard.getOutput();
                    }
                }
            },
            tag: 'keydown',
            target: emitter
        }));

        eventElement.setup.classic;
    }
    emitter.bind;
    return EventElement;
};

export { keyDown };
