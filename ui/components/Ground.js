/**
 * 그라운드 컴포넌트
 * 메인 컨테이너 생성
 */

import { createDivElement } from '../../utils/DOM.js';

/**
 * 그라운드 생성
 * @param {Function} windowElement - 윈도우 요소 생성 함수
 * @returns {HTMLElement} 그라운드 요소
 */
const createGround = (windowElement) => {
    const ground = createDivElement();
    ground.style.width = '860px';
    ground.style.height = '320px';
    ground.classList.add('ground');
    windowElement({ element: ground });
    return ground;
};

export { createGround };
