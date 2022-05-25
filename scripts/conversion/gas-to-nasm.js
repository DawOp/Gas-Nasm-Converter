function convertToNasm(splitedCode) {
    let convertedComments = changeCommentToSemicolon(splitedCode);

    let addSize = addOperandSize(convertedComments);

    let replacedNumbers = removeDolarFromNumber(addSize);

    let convertAddress = convertAdressingToNasm(replacedNumbers);

    let format = removeMultipleSpaces(convertAddress);
    format = convertTabsToSpaces(format);
    format = convertFrontSpacesToTabs(format);
    
    let swapped = swapSides(format);

    let removePercents = removePercentFromRegisters(swapped);

    return removePercents.join('\n');
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

function convertAdressingToNasm(splitedCode) {
    let gasReg = new RegExp(`[-+][0-9]+\\(\\%\\w+\\)`,'');
    let registerReg = new RegExp(`\[\\%a-zA-z\]+`,'');
    let numberReg = new RegExp(`[-+]+[0-9]+`,'');

    for (let i = 0; i < splitedCode.length; i++) {
        if (gasReg.test(splitedCode[i])) {
            let addressingMatch = splitedCode[i].match(gasReg)[0];

            let register = addressingMatch.match(registerReg);
            let number = addressingMatch.match(numberReg);
            let nasmAddressing = '['+ register + number + ']';
            
            splitedCode[i] = splitedCode[i].replace(gasReg, nasmAddressing);
        }
    }

    return splitedCode;
}