const PDFDocument = require('pdfkit');
const text = 'Что такое Lorem Ipsum?\n' +
    'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной ' +
    '"рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию ' +
    'размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без' +
    ' заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили ' +
    'публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной ' +
    'вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n' +
    '\n' +
    'Почему он используется?\n' +
    'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют' +
    ' потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв ' +
    'и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш ' +
    'текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по ' +
    'умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё' +
    ' дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые' +
    ' версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).';
// Create a document
const doc = new PDFDocument;
const fs = require('fs');

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc.font('./sans.ttf')
    .fontSize(25)
    .text(text, 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('./trex.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
});

// Add another page
doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

// Add some text with annotations
doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, {color: "#0000FF"})
    .link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();