function add(n1: number, n2: number) {
    return n1 + n2
}

const num1 = 5
const num2 = 5

let result = add(num1, num2);

    (function (window: Window, document: Document, undefined: undefined) {

        window.onload = init

        function init() {
            let output = document.getElementById("output")

            if (output) output.innerText = `${result}`
        }
    })(window, document, undefined)