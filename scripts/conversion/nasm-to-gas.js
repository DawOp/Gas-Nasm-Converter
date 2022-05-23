function convertToGas(splitedCode) {
    let convertedComments = changeCommentToSlash(splitedCode);
    
    let addPercents = addPercentToRegisters(convertedComments);
    addSuffixToInstruction(addPercents);
    return addPercents.join('\n');
}

function changeCommentToSlash(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll(';','//'));
    return replacedComment;
}

function addPercentToRegisters(splitedCode) {
    let replacedPercent = splitedCode;

    for (let i = 0; i < registers.length; i++) {
        let reg = new RegExp(`\\s${registers[i]}`,'gi');
        replacedPercent = replacedPercent.map(e => e.replace(reg,' ' + '%' + registers[i]));
        let reg_bracket = new RegExp(`\\[${registers[i]}`,'gi');
        replacedPercent = replacedPercent.map(e => e.replace(reg_bracket,'[' + '%' + registers[i]));
    }

    return replacedPercent;
}

function addSuffixToInstruction(splitedCode) {
    for (let i = 0; i < splitedCode.length; i++) {
        if (checkIfRegisterExist(splitedCode[i]) &&
            checkIfCommaExist(splitedCode[i]) &&
            checkNoCommentFirst(splitedCode[i])) {
            
            let notChanged = true;    
            // case 1: size specified
            for (let j = 0; j < splitedCode[i].length; j++) {
                for (let k = 0; k < operandSizesNasm.length; k++) {
                    let operandSizeReg = new RegExp(`\\s${operandSizesNasm[k]}\\sptr`,'gi');
                    let instructionReg = new RegExp(`\\w+`,'');

                    if (operandSizeReg.test(splitedCode[i])) {
                        splitedCode[i] = splitedCode[i].replace(operandSizeReg,'');
            
                        splitedCode[i] = splitedCode[i].replace(instructionReg, splitedCode[i].match(instructionReg)[0] + gasSuffixes[k]);
            
                        notChanged = false;
                    }
                }

            }

            // case 2: diffrent registers size
            if (notChanged) {

            }
        }
    }
}

