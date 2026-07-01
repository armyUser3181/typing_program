/**
 * 파일 서비스
 * 파일 입력 처리 및 텍스트 로딩
 */

import FileInput from '../FileInput.js';

/**
 * 파일 서비스 클래스
 */
class FileService {
    constructor(monitorElement, onLoadCallback) {
        this.monitorElement = monitorElement;
        this.onLoadCallback = onLoadCallback;
        this.fileInput = new FileInput(monitorElement, this.handleFileLoad.bind(this));
    }

    /**
     * 파일 로드 처리
     * @param {string} text - 로드된 텍스트
     */
    handleFileLoad(text) {
        text = text.replace(/[\r\n]/g, '');
        if (this.onLoadCallback) {
            this.onLoadCallback(text);
        }
    }
}

export { FileService };
