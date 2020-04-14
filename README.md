# NY Regents Extractor

Extracts multiple choice questions from [NY State Regents](https://www.nysedregents.org/).

Currently, output is only regular strings however this can be changed, see [Formatting](#Formatting). 

**Images are not supported and won't be extracted** .

# Install

```shell script
npm install regents-extractor
```

# Usage

```js
const {Exam, Document, Page, Question, TextsCollection} = require('regents-extractor');
```

Exam accepts a `string` or a `buffer` for the PDF and an optional `string` for the answers. If the answer string is provided, there must be a `\t` (tab) between questions and answers and a `\n` (line break) between questions. For example:

```js
    "1\t4\n" +
    "2\t3\n" +
```

# Example 

See the examples folder in the repo. 

**Note**: You must download the example regents from the commented URL for the example to work.


# Formatting

Currently, the `TextsCollection` class toString() method simply prints the string, however this can be changed. If you would like to detect super and subscripts you can be replacing the TextsCollection toString method with your own implementation. `textCollection.objs` contains PDFJS objects with x, y, height, width, font size, etc. information. 

I may add some simple HTML output soon, but probably not.
