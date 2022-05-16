import "../styles/main.css";

let nasm_editor = CodeMirror.fromTextArea(document.getElementById('gas-editor'), { 
    mode: "gas",
    theme: "dracula",
    tabSize: 4
});

let gas_editor = CodeMirror.fromTextArea(document.getElementById('nasm-editor'), { 
    mode: "gas",
    theme: "dracula",
    tabSize: 4
});

let output_editor = CodeMirror.fromTextArea(document.getElementById('output-editor'), { 
    mode: "gas",
    theme: "dracula",
    tabSize: 4
});