const PDFExtract = require('pdf.js-extract').PDFExtract;
const Document = require('./Document');
const fs = require('fs');

const pdfExtract = new PDFExtract();
const options = {}; /* see below */

class Exam {
    /**
     *
     * @param {Buffer|String} exam
     * @param {String|undefined} answersString
     */
    constructor(exam, answersString) {
        this.exam = exam;
        this.answerString = answersString;
    }

     init() {
        return new Promise((resolve) => {
            if (Buffer && Buffer.isBuffer(this.exam)) {
                pdfExtract.extractBuffer(this.exam, options, (err, data) => this.handleCallback(err, data, resolve));
            }
            pdfExtract.extract(this.exam, options, (err, data) => this.handleCallback(err, data, resolve));
        });
    }

    handleCallback(err, data, cb) {
        if (err) {
            throw err;
        }
        this.doc = new Document(data, this.answerString);
        this.questions = this.doc.questions;
        cb();
    }
}

module.exports = Exam;
