/**
 * 윈도우 컴포넌트
 * 드래그 가능한 윈도우 컨테이너 생성
 */

import { createDivElement, appBInd } from '../../utils/DOM.js';
import { dragEventElement } from '../../events/DragHandler.js';
import { windowCloseElement } from './CloseButton.js';
import { windowBarMaxMinElement } from './MaxMinButton.js';

/**
 * 윈도우 요소 생성
 * @param {Object} args - { element }
 * @returns {HTMLElement} 윈도우 요소
 */
const windowElement = (args) => {
    const { element = createDivElement() } = args || {};
    element.style.width || (element.style.width = '600px');
    element.style.height || (element.style.height = '400px');
    const bar = createDivElement();
    bar.classList.add('window_bar');

    const dragEvent = dragEventElement({
        element: bar,
        down: ({ pos }) => {
            const rect = element.getBoundingClientRect();
            for (const index of 'xy') pos[index] = rect[index];
        },
        move: ({ pos }) => {
            element.style.left = pos.x + 'px';
            element.style.top = pos.y + 'px';
        }
    });

    const closed = windowCloseElement({ target: element });

    const maxmined = windowBarMaxMinElement({
        target: element,
        action: (stus) => {
            if (stus === 'max') {
                dragEvent.unbind;
            } else if (stus === 'min') {
                dragEvent.actions[0].bind;
            }
            console.log('ell');
        },
    });

    appBInd(closed, bar);
    appBInd(maxmined, bar);
    appBInd(bar, element);

    return element;
};

export { windowElement };
