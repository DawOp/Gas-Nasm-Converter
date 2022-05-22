function convertToGas(splitedCode) {
    let concatenated = changeCommentToSlash(splitedCode);   
    console.log(concatenated);
    return concatenated.join('\n');
}

function changeCommentToSlash(splitedCode) {
    let replacedComment = splitedCode.map(e  => e.replace(';','//'));
    return replacedComment;
}