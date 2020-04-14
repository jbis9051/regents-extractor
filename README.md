# NY Regents Extractor

Extracts multiple choice questions from [NY State Regents](https://www.nysedregents.org/). 

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
