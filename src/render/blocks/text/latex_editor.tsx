import { parse, HtmlGenerator } from 'latex.js'
// import { createHTMLWindow } from 'svgdom'
//
// let window = createHTMLWindow()
// let htmlDoc = window.document

let latex = "Hi, this is a line of text."

let generator = new HtmlGenerator({ hyphenate: false })

let doc = parse(latex, { generator: generator })

console.log(doc)