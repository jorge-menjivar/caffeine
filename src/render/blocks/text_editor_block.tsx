import React from "react";

export function TextEditorBlock({children}: React.PropsWithChildren<{}>) {
    function tac() {
        console.log('change');
    }
    return React.createElement(
        'div',
        {
            role: 'presentation',
            className: "text-editor",
            contentEditable: true,
            suppressContentEditableWarning: true,
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "true",
            tabIndex: 0,
            id: "text-editor-id",
            onChange: tac,
            children: [
                <TextEditorLine>
                    <span role="presentation">hello</span>
                </TextEditorLine>
            ]
        }
    );
}

function TextEditorLine({children}: React.PropsWithChildren<{}>) {
    return React.createElement(
        'div',
        {
            role: 'presentation',
            className: "text-editor-line",
            dir: 'auto',
            id: "text-editor-line",
            children: children
        }
    );
}
