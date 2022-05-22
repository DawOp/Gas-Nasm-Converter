function convertToNasm(splitedCode) {
    let concatenated = changeCommentToSemicolon(splitedCode);
    return concatenated.join('\n');
}

function changeCommentToSemicolon(splitedCode) {
    let replacedComment = splitedCode.map(e =>  e.replace('//',';') );
    return replacedComment;
}