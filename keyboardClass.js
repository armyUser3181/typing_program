
import { HangulClass } from "./hangulClass.js";

class Feld {

    constructor() {
        
    }

    #buffer = '';
    #seek = '';

    get #getSeek() {
        const index = this.#buffer.length-1;
        this.#seek = this.#buffer[index];
    }

    get seek() {

    }

    #bufferPush(value = '') {
        this.#buffer = this.#buffer + value;
        
    }

    get buffer() {
        return { ...this.#buffer, push: this.#bufferPush  }
    }

    set buffer(val) {
        this.#bufferPush(val);
    }

}

export default class KeyboardClass {
    constructor() {
        this.hangulClass = new HangulClass();
        this.lang = 'en'; 
        this.input = new Feld();
        this.output = new Feld();
        this.target = new Feld();
    }


    setLang(lang) {
        this.lang = lang;
        this.input.buffer = '';
    }


    processKey(key) {
        this.input.buffer += key;

        if( this.lang === 'ko' ) {
            key = this.hangulClass.processKey(key);

            if(key === this.target.buffer[this.order]) {
                this.hangulClass.reset();
                this.output.buffer += key;
                //this.order++;
                
                return key;
            }

            this.output.buffer += key;
        }
        if( this.lang === 'en' ) {
            
            this.output.buffer += key;
            return key;
        }
    }

    processEnd() {

    }

    getOutput() {
        return this.output.buffer;
    }
    
}