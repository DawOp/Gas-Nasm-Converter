registers = [ 'ah', 'al', 'bh', 'bl', 'ch', 'cl', 'dh', 'dl', 'ax', 
'bx', 'cx', 'dx', 'eax', 'ebx', 'ecx', 'edx', 'rax', 'rbx', 'rcx',    
'rdx', 'cr0', 'cr1', 'cr2', 'cr3', 'dr0', 'dr1', 'dr2', 'dr3', 
'dr4', 'dr5', 'dr6', 'dr7', 'si', 'di', 'sp', 'bp', 'esi', 
'edi', 'esp', 'ebp', 'rsi', 'rdi', 'rsp', 'rbp', 'tr6', 'tr7', 
'st0', 'st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'mm0', 
'mm1', 'mm2', 'mm3', 'mm4', 'mm5', 'mm6', 'mm7', 'mm8', 'mm9', 
'mm10', 'mm11', 'mm12', 'mm13', 'mm14', 'mm15', 'xmm0', 'xmm1', 
'xmm2', 'xmm3', 'xmm4', 'xmm5', 'xmm6', 'xmm7', 'xmm8', 'xmm9', 
'xmm10', 'xmm11', 'xmm12', 'xmm13', 'xmm14', 'xmm15', 'zmm0', 'zmm1', 
'zmm2', 'zmm3', 'zmm4', 'zmm5', 'zmm6', 'zmm7', 'zmm8', 'zmm9', 
'zmm10', 'zmm11', 'zmm12', 'zmm13', 'zmm14', 'zmm15', 'r0', 'r1', 
'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 
'r12', 'r13', 'r14', 'r15' ];

operandSizesNasm = ['BYTE', 'WORD', 'DWORD', 'QWORD', 'OWORD'];

gasSuffixes = ['b', 'w', 'l', 'q', 'o'];


function startConversion(editor) {
    let splitedCode = splitInputIntoLines(editor);
    if (conversionType() == "gas") {
        let output = convertToGas(splitedCode);
        outputEditor.setValue(output);
    }
    else {
        let output = convertToNasm(splitedCode);
        outputEditor.setValue(output);
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

function checkIfCommaExist(lineOfCode) {
    const comma_index = lineOfCode.indexOf(',');
    const semicolon_index = lineOfCode.indexOf(';');
    const slash_index = lineOfCode.indexOf('/');

    return (comma_index > -1) &&
        (semicolon_index > comma_index || semicolon_index == -1) &&
        (slash_index > comma_index || slash_index == -1);  // make sure that comma is not commented
}

function checkIfRegisterExist(lineOfCode) {
    for (let i = 0; i < registers.length; i++) {
        let reg = new RegExp('%' + registers[i],'gi');
        
        if (reg.test(lineOfCode)) {
            return true;
        }
    }

    return false;
}

function checkNoCommentFirst(lineOfCode) {
    for (let i = 0; i < lineOfCode.length; i++) {
        if (lineOfCode[i] != ' ') {
            return !(lineOfCode[i] == ';' || lineOfCode[i] == '/');
        }
    }
    return true;
}

function removeMultipleSpaces(splitedCode) {
    let remSpaceReg = new RegExp('\\s\\s+','g');
    let removedSpaced = splitedCode.map(e =>  e.replace(remSpaceReg,' ') );
    return removedSpaced;
}

function convertTabsToSpaces(splitedCode) {
    let remTabsReg = new RegExp('\\t','g');
    let removedTabs = splitedCode.map(e =>  e.replace(remTabsReg,' ') );
    return removedTabs;
}

function convertFrontSpacesToTabs(splitedCode) {
    let remTabsReg = new RegExp('^\\s','g');
    let removedTabs = splitedCode.map(e =>  e.replace(remTabsReg,'\t') );
    return removedTabs;
}

function swapSides(splitedCode) {
    let toSwapReg = new RegExp(`\\t*[a-zA-Z]+.+,\\s[-\\[\\]()\\$%a-zA-Z0-9]+`,'');
    for (let i = 0; i < splitedCode.length; i++) {
        if (checkIfRegisterExist(splitedCode[i]) &&
            checkIfCommaExist(splitedCode[i]) &&
            checkNoCommentFirst(splitedCode[i])) {
            
            let matchOperation = splitedCode[i].match(toSwapReg)[0];
            let twoParts = matchOperation.split(',');
            let secondSide = twoParts[1].trim();
            let firstSide = twoParts[0].substr(twoParts[0].indexOf(" ") + 1).trim();
            let opperation = twoParts[0].split(" ")[0];

            splitedCode[i] = splitedCode[i].replace(toSwapReg, opperation + ' ' + secondSide + ', ' + firstSide);
        }
    }
    return splitedCode;
}