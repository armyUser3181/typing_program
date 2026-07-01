/**
 * 최대화/최소화 버튼 컴포넌트
 * 윈도우 최대화/최소화 버튼 생성
 */

import { createDivElement, appBInd } from '../../utils/DOM.js';
import { screenMaxElementEvent } from '../../events/ButtonHandler.js';

/**
 * 최대화/최소화 버튼 생성
 * @param {Object} args - { element, target, action }
 * @returns {HTMLElement} 최대화/최소화 버튼 요소
 */
const windowBarMaxMinElement = (args) => {
    const { element = createDivElement(), target: element_target, action: append_action } = args || {};
    if (element instanceof HTMLElement) {
        element.classList.add('window_bar_maxmin', 'window_bar_button');
        const max = document.createElement('div');
        max.classList.add('window_bar_maxmin_max');
        const min = document.createElement('div');
        min.classList.add('window_bar_maxmin_min');
        appBInd(max, element);
        appBInd(min, element);
        element.removeChild(max);
        let stus = 'min';
        screenMaxElementEvent({
            element: element,
            target: element_target,
            action: () => {
                switch (stus) {
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
            },
        });
        return element;
    }
};

export { windowBarMaxMinElement };
