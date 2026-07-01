/**
 * 타이핑 속도 서비스
 * WPM(분당 단어 수) 계산 및 표시
 */

import FrameEmitter from '../frameEmitter.js';

/**
 * 타이핑 속도 서비스 클래스
 */
class TypingSpeedService {
    constructor(statusElement) {
        this.statusElement = statusElement;
        this.frameEmitter = new FrameEmitter();
        this.frameCount = 0;
        this.typingCount = 0;
        this.lastTimestamp = 0;
        this.timeCount = 0;
        this.binded = false;
        this.setupSpeedTracking();
    }

    /**
     * 속도 추적 설정
     */
    setupSpeedTracking() {
        this.frameEmitter.push('speed', (timestamp) => {
            if (this.lastTimestamp === 0) {
                this.lastTimestamp = timestamp;
                return;
            }
            this.frameCount++;
            if (this.frameCount >= 10) {
                this.frameCount = 0;
                this.timeCount += timestamp - this.lastTimestamp;
                this.updateDisplay();
                this.lastTimestamp = timestamp;
            }
        });
    }

    /**
     * 속도 표시 업데이트
     */
    updateDisplay() {
        if (this.statusElement && this.statusElement.children[0]) {
            const wpm = (this.typingCount / this.timeCount * 60 * 1000).toFixed(2);
            this.statusElement.children[0].textContent = 'typing speed: ' + wpm + ' wpm';
        }
    }

    /**
     * 타이핑 시작
     */
    start() {
        if (!this.binded) {
            this.frameEmitter.bind();
            this.binded = true;
        }
        this.lastTimestamp = 0;
        this.typingCount = 0;
        this.timeCount = 0;
    }

    /**
     * 타이핑 카운트 증가
     */
    incrementTypingCount() {
        this.typingCount++;
    }

    /**
     * 속도 추적 중지
     */
    stop() {
        this.frameEmitter.unbind('speed');
        this.binded = false;
    }

    /**
     * 리셋
     */
    reset() {
        this.lastTimestamp = 0;
        this.typingCount = 0;
        this.timeCount = 0;
        this.frameCount = 0;
    }
}

export { TypingSpeedService };
