let convert_timer = 0;

function changeEditor() {
    input_editor.setValue("");
    output_editor.setValue("");
}

input_editor.on("change", function() {
    convert_timer = 3;
});

function convert_listener() {
    if (convert_timer == 0) {
        output_editor.setValue(input_editor.getValue());
        // output_editor.setValue("<Compilation Error>");
    }
    else {
        convert_timer--;
    }
}

setInterval(convert_listener,500); // 5