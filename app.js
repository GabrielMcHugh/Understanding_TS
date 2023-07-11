function add(n1, n2) {
    return n1 + n2;
}
var num1 = 5;
var num2 = 5;
var result = add(num1, num2);
(function (window, document, undefined) {
    window.onload = init;
    function init() {
        var output = document.getElementById("output");
        if (output)
            output.innerText = result;
    }
})(window, document, undefined);
