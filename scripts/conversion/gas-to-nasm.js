function convertToGas(splitedCode) {
    let convertedComments = changeCommentToSlash(splitedCode);
    
    let deletePercents = removePercentFromRegisters(convertedComments);

    return deletePercents.join('\n');
}

function changeCommentToSlash(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll(';','//'));
    return replacedComment;
}

function removePercentFromRegisters(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll('%',''));
    return replacedComment;
}