const Question = require('./Question');

class Page {
    constructor(page, firstQuestionNum) {
        this.info = page.pageInfo;
        this.isDud = false;
        this.content = page.content;
        this.startingQuestionNum = firstQuestionNum;
        this.normalizeWhitespace();

        const firstQObjEl = this.getStartingQuestionObj(firstQuestionNum);
        if (!firstQObjEl) {
            this.isDud = true;
            return;
        }
        this.contentBoundry = {
            upper: Math.floor(firstQObjEl.y),
            lower: Math.floor(this.findPageNumIntObj().y)
        };
        this.removeOutOfBoundContent();
        this.allStartingQuestionObjs = this.getAllStartingQuestionObjs();
        this.lastQuestionNum = this.allStartingQuestionObjs[this.allStartingQuestionObjs.length - 1].num;

        this.questionBoundares = this.getQuestionBoundaries();
        this.questionsWithElements = this.getQuestionsWithElements();
        this.questions = this.questionsWithElements.map(objs => new Question(objs.elements, objs.num));

    }

    normalizeWhitespace() {
        this.content.forEach(contentObj => {
            contentObj.str = contentObj.str.trim();
        });
    }

    findPageNumIntObj() {
        return this.content.slice().sort((a, b) => {
            return b.y - a.y
        }).find(item => {
            return item.str === `[${this.info.num}]`;
        });
    }

    removeOutOfBoundContent() {
        this.content = this.content.filter(item => {
            return item.y >= this.contentBoundry.upper && item.y < this.contentBoundry.lower
        });
    }

    getStartingQuestionObj(num) {
        return this.content.find(item => {
            return new RegExp(`^${num}\\s+`).test(item.str);
        });
    }

    getAllStartingQuestionObjs() {
        const checkedObj = [];
        for (let num = this.startingQuestionNum; ; num++) {
            const questionStart = this.getStartingQuestionObj(num);
            if (!questionStart) {
                break;
            }
            checkedObj.push({
                num: num,
                obj: questionStart
            });
        }
        return checkedObj;
    }

    getQuestionBoundaries() {
        return this.allStartingQuestionObjs.map((value, index) => {
            const halfway = (this.info.width / 2);

            let bottom;


            if (this.allStartingQuestionObjs[index + 1] && this.allStartingQuestionObjs[index + 1].obj.y > value.obj.y) {
                bottom = this.allStartingQuestionObjs[index + 1].obj.y;
            } else {
                bottom = this.info.height;
            }

            const isCenterBounds = {
                num: value.num,
                boundaries: {
                    top: value.obj.y,
                    bottom: bottom,
                    left: value.obj.x,
                    right: this.info.width
                }
            };

            const isNotCenterBounds = {
                num: value.num,
                boundaries: {
                    top: value.obj.y,
                    bottom: bottom,
                    left: value.obj.x,
                    right: halfway
                }
            };


            if (
                value.obj.x < halfway &&
                (
                    this.getElementsInBoundary(isCenterBounds).find(e => e.str.match(new RegExp(`^\\(\\s?(4)\\s?\\)`)))
             /*       || (value.obj.x + value.obj.width > halfway)  // math */
                )
            ) { //
                return isCenterBounds;
            } else {
                return isNotCenterBounds;
            }

        });
    }

    getElementsInBoundary(boundaries) {
        return this.content.filter(contentObj => {
            return (
                contentObj.y >= boundaries.top
                && contentObj.y < boundaries.bottom
                && contentObj.x >= boundaries.left
                && contentObj.x < boundaries.right
            );
        });
    }

    getQuestionsWithElements() {
        return this.questionBoundares.map(value => {
            return {
                num: value.num,
                elements: this.getElementsInBoundary(value.boundaries)
            }

        });
    }

}

module.exports = Page;
