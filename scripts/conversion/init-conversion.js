function start_conversion(editor) {
    let splited_code = splitInputIntoLines(editor);
    if (conversionType() == "gas") {
        let output = convertToGas(splited_code);
        output_editor.setValue(output);
    }
    else {
        let output = convertToNasm(splited_code);
        output_editor.setValue(output);
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