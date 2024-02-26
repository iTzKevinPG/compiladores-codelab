class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
    }

    peek() {
        if (this.position < this.input.length) {
            return this.input[this.position];
        }
        return null;
    }

    advance() {
        this.position++;
    }

    isWhiteSpace(char) {
        return /\s/.test(char);
    }

    isDigit(char) {
        return /\d/.test(char);
    }

    tokenize() {
        const tokens = [];

        while (this.position < this.input.length) {
            const char = this.peek();

            if (this.isWhiteSpace(char)) {
                this.advance();
                continue;
            }

            if (this.isDigit(char)) {
                let number = char;
                this.advance();

                while (this.isDigit(this.peek())) {
                    number += this.peek();
                    this.advance();
                }

                tokens.push(new Token('NUMBER', parseInt(number)));
                continue;
            }

            if (char === '+') {
                tokens.push(new Token('PLUS', char));
                this.advance();
                continue;
            }

            if (char === '-') {
                tokens.push(new Token('MINUS', char));
                this.advance();
                continue;
            }

            if (char === '*') {
                tokens.push(new Token('MULTIPLY', char));
                this.advance();
                continue;
            }

            if (char === '/') {
                tokens.push(new Token('DIVIDE', char));
                this.advance();
                continue;
            }

            throw new Error('Unexpected character: ' + char);
        }

        return tokens;
    }
}

