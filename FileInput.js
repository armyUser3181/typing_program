/**
 * FileInput.js
 * 
 * 파일 드래그 앤 드롭을 통한 텍스트 입력 처리 클래스
 * 드롭된 파일의 텍스트 내용을 콜백 함수로 전달
 * EventElementClass 패턴을 활용한 이벤트 관리
 */

import EventEmitter from './sequent/EventEmitter.js';
import EventElementClass from './sequent/EventElementClass.js';
import EventActionClass from './sequent/EventActionClass.js';

export class FileInput {
    /**
     * @param {HTMLElement} element - 드래그 앤 드롭을 적용할 DOM 요소
     * @param {Function} callback - 파일 텍스트를 전달받을 콜백 함수
     * @param {Object} options - 추가 옵션
     * @param {string[]} options.acceptedTypes - 허용할 파일 타입 (예: ['text/plain', '.txt'])
     */
    constructor(element, callback, options = {}) {
        this.element = element;
        this.callback = callback;
        this.acceptedTypes = options.acceptedTypes || [];
        
        this.eventEmitter = EventEmitter.form(element);
        this.eventElement = new EventElementClass();
        
        this.init();
    }

    /**
     * 드래그 앤 드롭 이벤트 초기화
     */
    init() {
        // 드래그 오버 시 기본 동작 방지 및 스타일 추가
        this.eventElement.push(
            new EventActionClass({
                callback: ({ event }) => {
                    if (event instanceof DragEvent) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.element.classList.add('drag-over');
                    }
                },
                tag: 'dragover',
                target: this.eventEmitter
            })
        );

        // 드래그 떠날 때 스타일 제거
        this.eventElement.push(
            new EventActionClass({
                callback: ({ event }) => {
                    if (event instanceof DragEvent) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.element.classList.remove('drag-over');
                    }
                },
                tag: 'dragleave',
                target: this.eventEmitter
            })
        );

        // 드롭 시 파일 처리
        this.eventElement.push(
            new EventActionClass({
                callback: ({ event }) => {
                    if (event instanceof DragEvent) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.element.classList.remove('drag-over');

                        const files = event.dataTransfer.files;
                        if (files.length > 0) {
                            this.handleFile(files[0]);
                        }
                    }
                },
                tag: 'drop',
                target: this.eventEmitter
            })
        );

        // classic 모드로 이벤트 바인딩
        this.eventElement.setup.classic;
        this.eventEmitter.bind;
    }

    /**
     * 파일 처리
     * @param {File} file - 처리할 파일 객체
     */
    handleFile(file) {
        // 파일 타입 검사
        if (this.acceptedTypes.length > 0) {
            const isAccepted = this.acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return file.name.endsWith(type);
                }
                return file.type === type;
            });

            if (!isAccepted) {
                console.warn(`허용되지 않는 파일 타입: ${file.type}`);
                return;
            }
        }

        // 파일 읽기
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const text = e.target.result;
            this.callback(text, file);
        };

        reader.onerror = () => {
            console.error('파일 읽기 오류:', file.name);
        };

        reader.readAsText(file);
    }

    /**
     * 이벤트 리스너 제거
     */
    destroy() {
        this.eventElement.unbind;
        this.eventEmitter.claer();
    }
}

export default FileInput;
