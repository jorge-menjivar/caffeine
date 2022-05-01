import * as monaco from "monaco-editor";
import React, {ReactElement, useEffect, useRef} from "react";
import {TextLine} from "./text/line";
import {H1Text} from "./text/h1";
import {H2Text} from "./text/h2";
import {H3Text} from "./text/h3";
import {H4Text} from "./text/h4";
import {MonacoEditor} from "./code/monaco_editor";

export function BlockRenderer(value: string, type: string) {
    let ref = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        if (type === 'code' && ref.current) {
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

    let child: ReactElement;
    switch(type) {
        case 'text':
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