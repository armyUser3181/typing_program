/**
 * 상태 표시줄 컴포넌트
 * 타이핑 속도 등 상태 정보 표시
 */

import { createDivElement, appBInd } from '../../utils/DOM.js';

/**
 * 상태 표시줄 생성
 * @returns {HTMLElement} 상태 표시줄 요소
 */
const createStatus = () => {
    const status = createDivElement();
    status.style.top = '5px';
    status.style.width = '600px';
    status.style.height = '30px';
    status.style.border = '0px solid black';
    status.classList.add('status');
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, status);
    return status;
};

export { createStatus };
