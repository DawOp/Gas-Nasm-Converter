let convert_timer = 0;

function changeEditor() {
    input_editor.setValue("");
    output_editor.setValue("");
}

input_editor.on("change", function() {
    document.getElementById("conversion-loader").style.visibility = "visible";
    convert_timer = 2;
});

function convert_listener() {
    if (convert_timer == 0) {
        output_editor.setValue("<Compilation Error>");
        document.getElementById("conversion-loader").style.visibility = "hidden";
    }
    else {
        convert_timer--;
    }
}

setInterval(convert_listener,1000); // 5