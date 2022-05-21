let convert_timer = 0;
let isChange = false;

function changeEditor() {
    input_editor.setValue("");
    output_editor.setValue("<No File>");
}

input_editor.on("change", function() {
    if (input_editor.getValue() != "") {
        document.getElementById("conversion-loader").style.visibility = "visible";
        isChange = true;
        convert_timer = 3;
    }
    else {
        convert_timer = 2;
        isChange = true;
    }
});

function convert_listener() {
    if (convert_timer == 0 && isChange) {
        if (input_editor.getValue() == "") {
            output_editor.setValue("<No File>");
        } else {
            start_conversion(input_editor);
        }
        
        document.getElementById("conversion-loader").style.visibility = "hidden";
        isChange = false;
    }
    else {
        convert_timer--;
    }
}

setInterval(convert_listener,500); // 5