var path = require('path');
var xtend = require('xtend');
var convert = require('ebook-convert');
// see more options at https://manual.calibre-ebook.com/generated/en/ebook-convert.html
var options = {
    input: path.join(__dirname, 'Resume.docx.pdf'),
    output: path.join(__dirname, 'foliomark-diagram.epub'),
    authors: '"Seth Vincent"',
    pageBreaksBefore: '//h:h1',
    chapter: '//h:h1',
    insertBlankLine: true,
    insertBlankLineSize: '1',
    lineHeight: '12',
    marginTop: '50',
    marginRight: '50',
    marginBottom: '50',
    marginLeft: '50'
};
/*
 * create epub file
 */
convert(options, function (err) {
    if (err)
        console.log(err);
});
