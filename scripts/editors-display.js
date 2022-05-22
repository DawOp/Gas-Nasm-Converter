let convertTimer = 0;
let isChange = false;

function changeEditor() {
    inputEditor.setValue("");
    outputEditor.setValue("<No File>");
}

inputEditor.on("change", function() {
    if (inputEditor.getValue() != "") {
        document.getElementById("conversion-loader").style.visibility = "visible";
        isChange = true;
        convertTimer = 3;
    }
    else {
        convertTimer = 2;
        isChange = true;
    }
});

function convertListener() {
    if (convertTimer == 0 && isChange) {
        if (inputEditor.getValue() == "") {
            outputEditor.setValue("<No File>");
        } else {
            startConversion(inputEditor);
        }
        
        document.getElementById("conversion-loader").style.visibility = "hidden";
        isChange = false;
    }
    else {
        convertTimer--;
    }
}

setInterval(convertListener,500); // 5