/**
 * 모니터 컴포넌트
 * 텍스트 디스플레이 모니터 생성
 */

import { createDivElement, appBInd } from '../../utils/DOM.js';

/**
 * 모니터 생성
 * @returns {HTMLElement} 모니터 요소
 */
const createMonitor = () => {
    const monitor = createDivElement();
    monitor.style.top = '50px';
    monitor.style.width = '600px';
    monitor.style.borderWidth = '1px 0px';
    monitor.classList.add('monitor');
    const intext = document.createElement('p');
    intext.classList.add('intext');
    appBInd(intext, monitor);
    return monitor;
};

export { createMonitor };
