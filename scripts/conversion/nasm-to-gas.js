function convertToNasm(splitedCode) {
    let convertedComments = changeCommentToSemicolon(splitedCode);

    let removePercents = removePercentFromRegisters(convertedComments);

    return removePercents.join('\n');
}

function changeCommentToSemicolon(splitedCode) {
    let replacedComment = splitedCode.map(e =>  e.replaceAll('//',';') );
    return replacedComment;
}

function removePercentFromRegisters(splitedCode) {
    let replacedComment = splitedCode.map(e => e.replaceAll('%',''));
    return replacedComment;
}