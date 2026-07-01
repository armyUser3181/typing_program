/**
 * 닫기 버튼 컴포넌트
 * 윈도우 닫기 버튼 생성
 */

import { createDivElement } from '../../utils/DOM.js';
import { buttonDownEvent } from '../../events/ButtonHandler.js';

/**
 * 닫기 버튼 생성
 * @param {Object} args - { element, target }
 * @returns {HTMLElement} 닫기 버튼 요소
 */
const windowCloseElement = (args) => {
    const { element = createDivElement(), target: element_target } = args || {};
    if (element instanceof HTMLElement && element_target instanceof HTMLElement) {
        element.classList.add('window_bar_button', 'window_bar_close');
        buttonDownEvent({
            element,
            action: () => {
                element_target.classList.add('element_close');
            }
        });
        return element;
    }
};

export { windowCloseElement };
