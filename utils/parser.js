const parseIntRows = (contents) => {
    return contents.split('\n').map(n => parseInt(n))
}

module.exports = {
    parseIntRows,
}