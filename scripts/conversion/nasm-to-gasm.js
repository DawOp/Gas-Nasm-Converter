function convertToNasm(splited_code) {
    console.log("nasm")
    let concatenated = changeCommentToSemicolon(splited_code);
    return concatenated.join('\n');
}

function changeCommentToSemicolon(splited_code) {
    let replacedComment = splited_code.map(e =>  e.replace('//',';') );
    return replacedComment;
}