function convertToNasm(splitedCode) {
    let convertedComments = changeCommentToSemicolon(splitedCode);

    let addSize = addOperandSize(convertedComments);

    let removePercents = removePercentFromRegisters(addSize);

    let replacedNumbers = removeDolarFromNumber(removePercents);

    return replacedNumbers.join('\n');
}

function changeCommentToSemicolon(splitedCode) {
    let replacedComment = splitedCode.map(e =>  e.replaceAll('//',';') );
    return replacedComment;
}

function removePercentFromRegisters(splitedCode) {
    let replacedRegisters = splitedCode.map(e => e.replaceAll('%',''));
    return replacedRegisters;
}

function removeDolarFromNumber(splitedCode) {
    let replacedNumbers = splitedCode.map(e => e.replaceAll('$',''));
    return replacedNumbers;
}

function addOperandSize(splitedCode) {
    for (let i = 0; i < splitedCode.length; i++) {
        if (checkIfRegisterExist(splitedCode[i]) &&
            checkNoCommentFirst(splitedCode[i])) {

            let instructionReg = new RegExp(`\\w+`,'');
            let instruction = splitedCode[i].match(instructionReg)[0];
            
            for (let l = 0; l < gasSuffixes.length; l++) {
                if (instruction.slice(-1) == gasSuffixes[l]) {
                    instruction = instruction.slice(0,-1);
                    splitedCode[i] = splitedCode[i].replace(instructionReg, instruction + ' ' + operandSizesNasm[l] + ' PTR')
                }
            }    
        }
    }

    return splitedCode;
}