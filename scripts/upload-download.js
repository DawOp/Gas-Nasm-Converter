// Upload file

let upload_button = document.getElementById("upload-button");
let real_upload = document.getElementById("real-upload");

upload_button.addEventListener("click", function() {
    real_upload.click();    
});

function readFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
    
    reader.onload = function() {
        input_editor.setValue(reader.result);
    };
  
    reader.onerror = function() {
        console.log(reader.error);
    };
    
    document.getElementById('real-upload').value = "";
}

// Download file

let download_button = document.getElementById("download-button");

function downloadOutput(code) {
    let element = document.createElement('a');
    
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download','source.asm');
    element.style.display = 'none';
    
    document.body.appendChild(element);
    
    element.click();

    document.body.removeChild(element);
}

download_button.addEventListener("click", function() {
    downloadOutput(output_editor.getValue());
})