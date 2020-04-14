const TextCollection = require('./TextsCollection');

class Question {
    constructor(questionObjs, num) {
        this.num = num;



        this.objs = questionObjs;
        this.sortObjs();
        this.answers = [[], [], [], []];
        this.questionObjs = [];

        this.fillQuestionAndAnswerObjs();

        this.answers = this.answers.map(answerArr => new TextCollection(answerArr));
        this.questionObjs = new TextCollection(this.questionObjs);
    }


    sortObjs() {
        this.objs = this.objs.sort(((a, b) => {
            const aAnswerMatch = a.str.match(/^\(([1-4])\)\s?/);
            const bAnswerMatch = b.str.match(/^\(([1-4])\)\s?/);

            if (aAnswerMatch && bAnswerMatch) {
                return parseInt(aAnswerMatch[1]) - parseInt(bAnswerMatch[1]);
            }

            const yDiff = a.y - b.y;
            const xDiff = a.x - b.x;

            if (yDiff < 0 && Math.abs(yDiff) > 2) {
                return -1;
            }

            if (yDiff > 0 && Math.abs(yDiff) > 2) {
                return 1;
            }

            if (xDiff < 0) {
                return -1;
            }

            return 1;

        }));
    }

    fillQuestionAndAnswerObjs() {
        let answerNum = 0;

        this.objs.forEach(obj => {
//            const match = obj.str.match(new RegExp(`^\\(\\s?(${answerNum + 1})\\s?\\)`));
            const match = obj.str.match(new RegExp(`^\\(\\s?([1234])\\s?\\)`));
            if (match) {
                answerNum = match[1];
                this.answers[answerNum - 1].push(obj);
                return;
            }
            if (answerNum > 0) {
                this.answers[answerNum - 1].push(obj);
                return;
            }
            this.questionObjs.push(obj);
        });
    }

    setSolutionIndex(solutionIndex) {
        this.solutionIndex = solutionIndex;
    }

}


module.exports = Question;
