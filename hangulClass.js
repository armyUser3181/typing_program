/**
 * hangulClass.js
 * 
 * 한글 입력 처리를 위한 클래스
 * 두벌식 키보드 매핑과 hangul-js를 이용한 한글 조합
 */

export class HangulClass {
    static keyMap = new Map();
    static choMap = new Map();
    static jungMap = new Map();
    static jongMap = new Map();

    static {
        // 두벌식 자음 매핑
        this.keyMap.set('r', 'ㄱ');
        this.keyMap.set('R', 'ㄲ');
        this.keyMap.set('s', 'ㄴ');
        this.keyMap.set('e', 'ㄷ');
        this.keyMap.set('E', 'ㄸ');
        this.keyMap.set('f', 'ㄹ');
        this.keyMap.set('a', 'ㅁ');
        this.keyMap.set('q', 'ㅂ');
        this.keyMap.set('Q', 'ㅃ');
        this.keyMap.set('t', 'ㅅ');
        this.keyMap.set('T', 'ㅆ');
        this.keyMap.set('d', 'ㅇ');
        this.keyMap.set('w', 'ㅈ');
        this.keyMap.set('W', 'ㅉ');
        this.keyMap.set('c', 'ㅊ');
        this.keyMap.set('z', 'ㅋ');
        this.keyMap.set('x', 'ㅌ');
        this.keyMap.set('v', 'ㅍ');

        // 두벌식 모음 매핑
        this.keyMap.set('k', 'ㅏ');
        this.keyMap.set('o', 'ㅐ');
        this.keyMap.set('i', 'ㅔ');
        this.keyMap.set('O', 'ㅒ');
        this.keyMap.set('j', 'ㅗ');
        this.keyMap.set('p', 'ㅗ');
        this.keyMap.set('u', 'ㅜ');
        this.keyMap.set('P', 'ㅜ');
        this.keyMap.set('h', 'ㅗ');
        this.keyMap.set('y', 'ㅛ');
        this.keyMap.set('n', 'ㅜ');
        this.keyMap.set('b', 'ㅠ');
        this.keyMap.set('m', 'ㅡ');
        this.keyMap.set('l', 'ㅣ');

        // 초성 매핑
        this.choMap.set('ㄱ', 0);
        this.choMap.set('ㄲ', 1);
        this.choMap.set('ㄴ', 2);
        this.choMap.set('ㄷ', 3);
        this.choMap.set('ㄸ', 4);
        this.choMap.set('ㄹ', 5);
        this.choMap.set('ㅁ', 6);
        this.choMap.set('ㅂ', 7);
        this.choMap.set('ㅃ', 8);
        this.choMap.set('ㅅ', 9);
        this.choMap.set('ㅆ', 10);
        this.choMap.set('ㅇ', 11);
        this.choMap.set('ㅈ', 12);
        this.choMap.set('ㅉ', 13);
        this.choMap.set('ㅊ', 14);
        this.choMap.set('ㅋ', 15);
        this.choMap.set('ㅌ', 16);
        this.choMap.set('ㅍ', 17);
        this.choMap.set('ㅎ', 18);

        // 중성 매핑
        this.jungMap.set('ㅏ', 0);
        this.jungMap.set('ㅐ', 1);
        this.jungMap.set('ㅑ', 2);
        this.jungMap.set('ㅒ', 3);
        this.jungMap.set('ㅓ', 4);
        this.jungMap.set('ㅔ', 5);
        this.jungMap.set('ㅕ', 6);
        this.jungMap.set('ㅖ', 7);
        this.jungMap.set('ㅗ', 8);
        this.jungMap.set('ㅘ', 9);
        this.jungMap.set('ㅙ', 10);
        this.jungMap.set('ㅚ', 11);
        this.jungMap.set('ㅛ', 12);
        this.jungMap.set('ㅜ', 13);
        this.jungMap.set('ㅝ', 14);
        this.jungMap.set('ㅞ', 15);
        this.jungMap.set('ㅟ', 16);
        this.jungMap.set('ㅠ', 17);
        this.jungMap.set('ㅡ', 18);
        this.jungMap.set('ㅢ', 19);
        this.jungMap.set('ㅣ', 20);

        // 종성 매핑
        this.jongMap.set('', 0);
        this.jongMap.set('ㄱ', 1);
        this.jongMap.set('ㄲ', 2);
        this.jongMap.set('ㄳ', 3);
        this.jongMap.set('ㄴ', 4);
        this.jongMap.set('ㄵ', 5);
        this.jongMap.set('ㄶ', 6);
        this.jongMap.set('ㄷ', 7);
        this.jongMap.set('ㄹ', 8);
        this.jongMap.set('ㄺ', 9);
        this.jongMap.set('ㄻ', 10);
        this.jongMap.set('ㄼ', 11);
        this.jongMap.set('ㄽ', 12);
        this.jongMap.set('ㄾ', 13);
        this.jongMap.set('ㄿ', 14);
        this.jongMap.set('ㅀ', 15);
        this.jongMap.set('ㅁ', 16);
        this.jongMap.set('ㅂ', 17);
        this.jongMap.set('ㅄ', 18);
        this.jongMap.set('ㅅ', 19);
        this.jongMap.set('ㅆ', 20);
        this.jongMap.set('ㅇ', 21);
        this.jongMap.set('ㅈ', 22);
        this.jongMap.set('ㅊ', 23);
        this.jongMap.set('ㅋ', 24);
        this.jongMap.set('ㅌ', 25);
        this.jongMap.set('ㅍ', 26);
        this.jongMap.set('ㅎ', 27);
    }

    constructor() {
        this.currentJamo = [];
        this.cho = '';
        this.jung = '';
        this.jong = '';
    }

    /**
     * 키를 자모로 변환
     */
    keyToJamo(key) {
        return HangulClass.keyMap.get(key) || null;
    }

    /**
     * 자모 조합
     */
    assemble() {
        if (this.cho && this.jung) {
            const choIndex = HangulClass.choMap.get(this.cho);
            const jungIndex = HangulClass.jungMap.get(this.jung);
            const jongIndex = this.jong ? HangulClass.jongMap.get(this.jong) : 0;

            if (choIndex !== undefined && jungIndex !== undefined && jongIndex !== undefined) {
                const code = 0xAC00 + (choIndex * 21 * 28) + (jungIndex * 28) + jongIndex;
                return String.fromCharCode(code);
            }
        }
        return '';
    }

    /**
     * 키 입력 처리
     */
    processKey(key) {
        const jamo = this.keyToJamo(key);
        if (!jamo) return null;

        if (!HangulClass.keyMap.has(jamo)) {
            return jamo;
        }

        // 초성
        if (!this.cho && HangulClass.choMap.has(jamo)) {
            this.cho = jamo;
            return this.assemble();
        }

        // 중성
        if (this.cho && !this.jung && HangulClass.jungMap.has(jamo)) {
            this.jung = jamo;
            return this.assemble();
        }

        // 종성
        if (this.cho && this.jung && !this.jong && HangulClass.jongMap.has(jamo)) {
            this.jong = jamo;
            return this.assemble();
        }

        // 새 글자 시작
        if (this.cho && this.jung) {
            const result = this.assemble();
            this.reset();
            this.cho = jamo;
            return result;
        }

        return null;
    }

    /**
     * 상태 초기화
     */
    reset() {
        this.cho = '';
        this.jung = '';
        this.jong = '';
    }

    /**
     * 백스페이스 처리
     */
    backspace() {
        if (this.jong) {
            this.jong = '';
        } else if (this.jung) {
            this.jung = '';
        } else if (this.cho) {
            this.cho = '';
        }
        return this.assemble();
    }
}

export default HangulClass;
