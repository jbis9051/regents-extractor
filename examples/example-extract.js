const Exam = require('../models/Exam');

const answers = "1\t4\n" +
    "2\t3\n" +
    "3\t2\n" +
    "4\t4\n" +
    "5\t2\n" +
    "6\t1\n" +
    "7\t1\n" +
    "8\t1\n" +
    "9\t4\n" +
    "10\t1\n" +
    "11\t1\n" +
    "12\t3\n" +
    "13\t4\n" +
    "14\t1\n" +
    "15\t2\n" +
    "16\t2\n" +
    "17\t2\n" +
    "18\t3\n" +
    "19\t3\n" +
    "20\t1\n" +
    "21\t1\n" +
    "22\t3\n" +
    "23\t4\n" +
    "24\t2\n" +
    "25\t1\n" +
    "26\t2\n" +
    "27\t3\n" +
    "28\t4\n" +
    "29\t1\n" +
    "30\t2\n" +
    "31\t3\n" +
    "32\t3\n" +
    "33\t1\n" +
    "34\t3\n" +
    "35\t3\n" +
    "36\t3\n" +
    "37\t3\n" +
    "38\t1\n" +
    "39\t1\n" +
    "40\t3\n" +
    "41\t2\n" +
    "42\t4\n" +
    "43\t4\n" +
    "44\t1\n" +
    "45\t2\n" +
    "46\t1\n" +
    "47\t2\n" +
    "48\t3\n" +
    "49\t4\n" +
    "50\t1"; // copy and pasted from the excel spreadsheet https://www.nysedregents.org/physics/619/phys62019-sk.xlsx


const exam = new Exam(
    __dirname + '/docs/20100622exam.pdf',  /* https://www.nysedregents.org/physics/619/phys62019-exam.pdf */
    answers
);

exam.init().then(() => {
    console.log(exam.questions.map(q => q.questionObjs.toString() + ": " + q.answers[q.solutionIndex]).join("\n"));
});

