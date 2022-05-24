function convertToGas(splitedCode) {
    let convertedComments = changeCommentToSlash(splitedCode);
    
    let convertAdresses = convertAdressingToGas(convertedComments);
    
    let addPercents = addPercentToRegisters(convertAdresses);
    
    let addSufix = addSuffixToInstruction(addPercents);

    let addDolar = addDolarToNumber(addSufix);
    
    return addDolar.join('\n');
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
        let reg_bracket = new RegExp(`\\(${registers[i]}`,'gi');
        replacedPercent = replacedPercent.map(e => e.replace(reg_bracket,'(' + '%' + registers[i]));
    }

    return replacedPercent;
}

function addDolarToNumber(splitedCode) {
    let addedDolar = splitedCode;
    let hexReg = new RegExp(`0[xX][0-9a-fA-F]+`,'');
    let numberReg = new RegExp(`[0-9]+\\s|\\s[0-9]+`,'');

    for (let i = 0; i < splitedCode.length; i++) {
        if (checkIfRegisterExist(splitedCode[i]) &&
            checkIfCommaExist(splitedCode[i]) &&
            checkNoCommentFirst(splitedCode[i])) {
            
            if (hexReg.test(splitedCode[i])) {
                addedDolar[i] = splitedCode[i].replace(hexReg, ' $' + splitedCode[i].match(hexReg)[0]);
            }
            else {
                if (numberReg.test(splitedCode[i])) {
                    addedDolar[i] = splitedCode[i].replace(numberReg, ' $' + splitedCode[i].match(numberReg)[0].trim());
                }
            }
        }
    }

    return addedDolar;
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
    
    return splitedCode;
}

function convertAdressingToGas(splitedCode) {
    let nasmReg = new RegExp(`\\[\\w+[-+]+[0-9]+\\]`,'');
    let registerReg = new RegExp(`\\w+`,'');
    let numberReg = new RegExp(`[-+]+[0-9]+`,'');

    for (let i = 0; i < splitedCode.length; i++) {
        if (nasmReg.test(splitedCode[i])) {
            let addressingMatch = splitedCode[i].match(nasmReg)[0];
            let register = addressingMatch.match(registerReg);
            let number = addressingMatch.match(numberReg);
            let gasAddressing = number + '(' + register + ')';
            
            splitedCode[i] = splitedCode[i].replace(nasmReg, gasAddressing);
        }
    }

    return splitedCode;
}