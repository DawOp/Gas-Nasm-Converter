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
        input_editor.setValue(reader.result)
    };
  
    reader.onerror = function() {
        console.log(reader.error);
    };
}