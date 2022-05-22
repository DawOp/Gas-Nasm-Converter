function convertToGas(splited_code) {
    let concatenated = changeCommentToSlash(splited_code);   
    console.log(concatenated);
    return concatenated.join('\n');
}

function changeCommentToSlash(splited_code) {
    let replaced_comment = splited_code.map(e  => e.replace(';','//'));
    return replaced_comment;
}