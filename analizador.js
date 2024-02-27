const keywords = [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield'
];


const operators = [
    '+', '-', '*', '/', '%', '++', '--', '=',
    '==', '!=', '===', '!==', '>', '<', '>=', '<=',
    '&&', '||', '?', ':', '&', '|', '^', '<<', '>>'
];

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

    tokenize() {
        const tokens = [];

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (char === ' ' || char === '\n' || char === '\t') {
                this.position++;
                continue;
            }

            if (char === '/' && this.input[this.position + 1] === '/') {
                this.consumeComment();
                continue;
            }

            if (char === '/' && this.input[this.position + 1] === '*') {
                this.consumeMultiLineComment();
                continue;
            }

            if (char === '"') {
                const string = this.consumeString();
                tokens.push(new Token('STRING', string));
                continue;
            }

            if (keywords.includes(char)) {
                const word = this.consumeKeyword();
                tokens.push(new Token('KEYWORD', word));
                continue;
            }

            if (operators.includes(char)) {
                tokens.push(new Token('OPERATOR', char));
                this.position++;
                continue;
            }

            if (this.isLetter(char)) {
                const identifier = this.consumeIdentifier();
                tokens.push(new Token('IDENTIFIER', identifier));
                continue;
            }

            if (this.isDigit(char)) {
                const number = this.consumeNumber();
                tokens.push(new Token('NUMBER', number));
                continue;
            }

            tokens.push(new Token('SYMBOL', char));
            this.position++;
        }

        return tokens;
    }

    isLetter(char) {
        return /[a-zA-Z]/.test(char);
    }

    isDigit(char) {
        return /\d/.test(char);
    }

    consumeKeyword() {
        let word = '';

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (!this.isLetter(char)) {
                break;
            }

            word += char;
            this.position++;
        }

        return word;
    }

    consumeIdentifier() {
        let identifier = '';

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (!this.isLetter(char) && !this.isDigit(char)) {
                break;
            }

            identifier += char;
            this.position++;
        }

        return identifier;
    }

    consumeNumber() {
        let number = '';

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (!this.isDigit(char)) {
                break;
            }

            number += char;
            this.position++;
        }

        return parseInt(number);
    }

    consumeString() {
        let string = '';

        this.position++;

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (char === '"') {
                this.position++;
                return string;
            }

            string += char;
            this.position++;
        }
    }

    consumeComment() {
        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (char === '\n') {
                break;
            }

            this.position++;
        }
    }

    consumeMultiLineComment() {
        this.position += 2;

        while (this.position < this.input.length) {
            const char = this.input[this.position];

            if (char === '*' && this.input[this.position + 1] === '/') {
                this.position += 2;
                break;
            }

            this.position++;
        }
    }

}

let lex = new Lexer("function prueba(){return 2 + 2;}prueba();")

console.log(lex.tokenize());