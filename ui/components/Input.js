/**
 * 입력 필드 컴포넌트
 * 사용자 입력을 받는 필드 생성
 */

import { createDivElement, appBInd } from '../../utils/DOM.js';

/**
 * 입력 필드 생성
 * @returns {HTMLElement} 입력 필드 요소
 */
const createInput = () => {
    const input = createDivElement();
    input.style.top = 'auto';
    input.style.bottom = '30px';
    input.style.width = '600px';
    input.style.borderWidth = '1px 0px';
    input.classList.add('input');
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, input);

    return input;
};

export { createInput };
