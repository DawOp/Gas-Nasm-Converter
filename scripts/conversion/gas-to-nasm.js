function convertToGas(splitedCode) {
    let convertedComments = changeCommentToSlash(splitedCode);
    
    let deletePercents = deletePercentFromRegisters(convertedComments);

    return deletePercents.join('\n');
}

function changeCommentToSlash(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll(';','//'));
    return replacedComment;
}

function deletePercentFromRegisters(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll('%',''));
    return replacedComment;
}