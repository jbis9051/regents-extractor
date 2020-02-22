const PDFExtract = require('pdf.js-extract').PDFExtract;
const Document = require('./Document');
const fs = require('fs');

const pdfExtract = new PDFExtract();
const options = {}; /* see below */

class Exam {
    constructor(pathToExam, pathToAnswers, hitString) {
        this.exam = pathToExam;
        this.pathToAnswers = pathToAnswers;
        this.hitString = hitString;
    }

    init() {
        return new Promise(resolve => {
            pdfExtract.extract(this.exam, options, (err, data) => {
                this.doc = new Document(data, this.hitString);
                this.questions = {};
                this.doc.pages.forEach(page => {
                   page.questions.forEach(question => {
                      this.questions[question.num] = question;
                   });
                });
                
            });
        });
    }
}

module.exports = Exam;
