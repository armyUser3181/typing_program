
import { HangulClass } from "./hangulClass.js";

class Feld {

    constructor() {
        
    }

    #buffer = '';
    #seek = '';

    get #getSeek() {
        const index = this.#buffer.length-1;
        return this.#seek = this.#buffer[index];
    }

    get seek() {
        return this.#seek || ( this.#seek = this.#getSeek );
    }

    #bufferPush(value = '') {
        this.#buffer = this.#buffer + value;
    }

    get buffer() {
        return this.#buffer;
        //return { ...this.#buffer, push: this.#bufferPush  }
    }

    set buffer(val) {
        this.#buffer = val;
        //this.#bufferPush(val);
    }

    #order = 0;

    get order() {
        return this.#order;
    }

    set order(val) {
        this.#order = val;
    }
    
    static same(a, b) {
        if(a instanceof Feld && b instanceof Feld) {
            return a.buffer[a.order] === b.buffer[b.order];
        }
    }

}

export default class KeyboardClass {
    constructor() {
        this.hangulClass = new HangulClass();
        this.lang = 'en'; 
        this.input = new Feld();
        this.output = new Feld();
        this.target = new Feld();
        this.target.buffer = 'hello world';
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
                //this.output.buffer += key;
                //this.order++;
                
                return key;
            }

            this.output.buffer += key;
        }
        if( this.lang === 'en' ) {

            if( this.target.buffer[this.target.order] === key ) {
                this.output.buffer += key;
                this.output.order++;
                this.target.order++;
            }
            return key;
        }

        
    }

    processEnd() {

    }

    getOutput() {
        return this.output.buffer;
    }
    
}