import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';

export function MonacoEditorLoad(ref: React.MutableRefObject<HTMLDivElement>) {
    let editor: monaco.editor.IStandaloneCodeEditor;
    useEffect(() => {
        if (ref.current) {
            editor = monaco.editor.create(
                ref.current,
                {
                    value: 'sample',
                    language: 'typescript',
                    theme: 'vs-dark',
                    fontSize: 16
                }
            );
        }
        return () => {
            editor.dispose();
        };
    }, []);
}

export function MonacoEditor(props: {innerRef: any}) {
    return React.createElement(
        'div',
        {
            className: 'monaco-editor-block',
            ref: props.innerRef
        }
    )
}