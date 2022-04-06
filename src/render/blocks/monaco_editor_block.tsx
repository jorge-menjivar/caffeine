import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';

export const MonacoEditorBlock: React.FC = () => {
    const divEl = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(
                divEl.current,
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
    return <div className="monaco-editor-block" ref={divEl}/>;
};