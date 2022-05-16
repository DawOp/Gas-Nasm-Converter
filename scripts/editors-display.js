function changeEditor() {
    var selectBox = document.getElementById("select-syntax");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue == "G") {
        input_editor.refresh();
    }
    else {
        input_editor.refresh();
    }
}