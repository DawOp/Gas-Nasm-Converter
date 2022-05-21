let myArray = "";

function start_conversion(editor) {
    myArray = splitInputIntoLines(editor);
    if (conversionType() == "gas") {
        output_editor.setValue(myArray[0][3]);
    }
    else {
        output_editor.setValue(myArray[0][3]);
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