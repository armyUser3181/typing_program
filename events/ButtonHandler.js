/**
 * 버튼 이벤트 핸들러
 * 클릭 이벤트 및 전체화면 토글 기능 제공
 */

import EventEmitter from '../sequent/EventEmitter.js';
import EventElement from '../sequent/EventElementClass.js';
import EventActionClass from '../sequent/EventActionClass.js';

/**
 * 클릭 이벤트 래퍼
 * @param {Object} args - { element, eventElement, action }
 * @returns {EventElement} 이벤트 요소
 */
const buttonDownEvent = (args) => {
    const { element, eventElement = new EventElement, action = () => {} } = args || {};
    const emitter = EventEmitter.form(element);
    if (element instanceof HTMLElement && eventElement instanceof EventElement) {
        eventElement.push(new EventActionClass({
            callback: ({ event }) => {
                if (event instanceof MouseEvent) {
                    action();
                }
            },
            tag: 'click',
            target: emitter
        }));
        eventElement.setup.classic;
        emitter.bind;
        return eventElement;
    }
};

/**
 * 전체화면 토글 이벤트
 * @param {Object} args - { element, eventElement, target, action }
 * @returns {EventElement} 이벤트 요소
 */
const screenMaxElementEvent = (args) => {
    const { element, eventElement = new EventElement, target = element, action: func } = args || {};
    if (element instanceof HTMLElement && eventElement instanceof EventElement && target instanceof HTMLElement) {
        const setMap = new Map;
        setMap.set('width', '100%');
        setMap.set('height', '100%');
        setMap.set('left', '0%');
        setMap.set('top', '0%');
        const action = (args) => {
            func && func();
            setMap.forEach((val, key, map) => {
                const pv = target.style[key];
                target.style[key] = val;
                map.set(key, pv);
            });
        };
        buttonDownEvent({ element, eventElement, action });
        return eventElement;
    }
};

export { buttonDownEvent, screenMaxElementEvent };
