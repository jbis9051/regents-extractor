class TextsCollection {
    constructor(objs) {
        this.objs = objs;
    }

    toString(){
        return this.objs.map(obj => obj.str).join(" ");
    }
}

module.exports = TextsCollection;
