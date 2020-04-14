const Page = require('./Page');

class Document {
    constructor(data, answersData) {
        this.pages = [];
        data.pages.slice(1).forEach((page, index) => {
            if (this.pages.length === 0 || this.pages[index - 1].isDud) {
                this.pages.push(new Page(page, 1));
            } else {
                this.pages.push(new Page(page, this.pages[index - 1].lastQuestionNum + 1));
            }
        });
        this.questions = this.pages.map(page => page.questions).flat().filter(q => !!q);

        if (!answersData) {
            return;
        }
        const answers = answersData.split("\n").map(str => str.split("\t").map(str2 => parseInt(str2.trim())));
        answers.forEach(qna => {
            const q = this.questions.find(question => question.num === qna[0]);
            if (q) {
                q.setSolutionIndex(qna[1] - 1);
            }
        });

    }

}

module.exports = Document;
