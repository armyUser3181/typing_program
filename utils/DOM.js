/**
 * DOM 유틸리티 함수
 * 요소 생성, 스타일 설정, 추가 기능 제공
 */

/**
 * 스타일된 div 요소 생성
 * @returns {HTMLDivElement} CenterElementClass 클래스가 추가된 div
 */
const createDivElement = () => {
    const div = document.createElement('div');
    div.classList.add('CenterElementClass');
    // metadata container for appended children/actions
    div.appends = {};
    // default appendAction stub — can be overridden by callers
    div.appends.appendAction_maxmin = ({ status } = {}) => {};

    return div;
};

/**
 * div 요소를 부모의 중앙에 정렬
 * @param {Object} args - { element: HTMLElement }
 * @returns {HTMLElement} 정렬된 요소
 */
const settingDivElement = (args) => {
    const { element } = args;
    if (element instanceof HTMLElement) {
        const pr = element.parentElement.getBoundingClientRect();
        const dr = element.getBoundingClientRect();
        element.style.left = `${(pr.width - dr.width) / 2}px`;
    }
    return element;
};

/**
 * 버튼 요소 특정 설정
 * @param {Object} args - { button: HTMLButtonElement }
 * @returns {HTMLButtonElement} 설정된 버튼
 */
const settingButtonElement = (args) => {
    const { button } = args;
    if (button instanceof HTMLButtonElement) {
        // 버튼 특화 설정이 필요하다면 여기에 추가
    }
    return button;
};

/**
 * 요소를 부모에 추가하고 중앙 정렬 적용
 * @param {HTMLElement} element - 추가할 요소
 * @param {HTMLElement} parent - 부모 요소 (기본값: document.body)
 * @returns {HTMLElement} 추가된 요소
 */
const appBInd = (element, parent = document.body) => {
    parent.appendChild(element);
    if (element instanceof HTMLDivElement) {
        settingDivElement({ element });
    } else if (element instanceof HTMLButtonElement) {
        settingButtonElement({ button: element });
    }
    return element;
};

export { createDivElement, settingDivElement, settingButtonElement, appBInd };
