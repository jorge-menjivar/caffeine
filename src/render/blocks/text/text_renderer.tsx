import * as monaco from "monaco-editor";
import React, {ReactElement, useEffect, useRef} from "react";
import {TextLine} from "./line";
import {H1Text} from "./h1";
import {H2Text} from "./h2";
import {H3Text} from "./h3";
import {H4Text} from "./h4";
import {MonacoEditor} from "../code/monaco_editor";

export function TextRenderer(value: string) {
    let ref = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    let type = useRef('text-line');

    useEffect(() => {
        if (type.current === 'code' && ref.current) {
            editor = monaco.editor.create(
                ref.current,
                {
                    value: 'sample',
                    language: 'typescript',
                    theme: 'vs-dark',
                    fontSize: 16,
                    fontFamily: "'SF Mono','Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'"
                }
            );
            return () => {
                console.log('disposing monaco')
                editor.dispose();
            };
        }
    })

    if (value[0] === "#") {
        if (value[1] === " "){
            type.current = 'h1';
            console.log("h1")
        }
        else if (value[1] === "#") {
            if (value[2] === " ") {
                type.current = 'h2';
                console.log("h2")
            }
            else if (value[2] === "#") {
                if (value[3] === " ") {
                    type.current = 'h3';
                    console.log("h3")
                }
                else if (value[3] === "#" && value[4] === " ") {
                    type.current = 'h4';
                    console.log("h4")
                }
                else {
                    console.log("text-line")
                }
            }
        }
    }

    // Text is a command
    else if (value === "\\code") {
        console.log("code command")
        type.current = 'code';
    }

    let child: ReactElement;
    switch(type.current) {
        case 'text-line':
            child = TextLine(value);
            break;
        case 'h1':
            child = H1Text(value);
            break;
        case 'h2':
            child = H2Text(value);
            break;
        case 'h3':
            child = H3Text(value);
            break;
        case 'h4':
            child = H4Text(value);
            break;
        case 'code':
            child = MonacoEditor({innerRef: ref});
            break;
        default:
            child = TextLine(value);
            break;
    }

    return React.createElement(
        'div',
        {
            children: child
        }
    );
}