function convertToNasm(splitedCode) {
    let convertedComments = changeCommentToSemicolon(splitedCode);

    let addPercent = addPercentToRegisters(convertedComments);

    return addPercent.join('\n');
}

function changeCommentToSemicolon(splitedCode) {
    let replacedComment = splitedCode.map(e =>  e.replaceAll('//',';') );
    return replacedComment;
}

function addPercentToRegisters(splitedCode) {
    let replacedPercent = splitedCode;
    // console.log(registers[2]);
    for (let i = 0; i < registers.length; i++) {
        let re = new RegExp(`\\s${registers[i]}`,'g');
        console.log() 
        replacedPercent = replacedPercent.map(e => e.replace(re,' ' + '%' + registers[i]));
    }

    return replacedPercent;
}