function startConversion(editor) {
    let splitedCode = splitInputIntoLines(editor);
    if (conversionType() == "gas") {
        let output = convertToGas(splitedCode);
        outputEditor.setValue(output);
    }
    else {
        let output = convertToNasm(splitedCode);
        outputEditor.setValue(output);
    }
}

function splitInputIntoLines(editor) {
    const text = editor.getValue();
    return text.split('\n');
};

function conversionType() {
    let select = document.getElementById('select-syntax');
    let value = select.options[select.selectedIndex].value;
    if (value == "G") 
        return "gas";

    return "nasm";
}