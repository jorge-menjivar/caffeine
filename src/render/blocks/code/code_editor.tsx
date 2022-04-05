import React from "react";

function CodeEditorCodeSection({children}: React.PropsWithChildren<{}>) {

    // let resizeObserver = new ResizeObserver(() => {
    //     console.log("The element was resized");
    // });
    //
    // resizeObserver.observe(this);

    return React.createElement(
        'div',
        {
            role: 'presentation',
            className: "code-editor-code-section",
            contentEditable: true,
            suppressContentEditableWarning: true,
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false",
            tabIndex: 0,
            id: "code-editor-cs-id",
            children: children
        }
    );
}

function CodeEditorLineNumbers({children}: React.PropsWithChildren<{}>) {
    return React.createElement(
        'div',
        {
            className: 'code-editor-line-numbers',
            id: "code-editor-lns-id",
            children: children
        }
    );
}

function CodeEditorLineNumber({children}: React.PropsWithChildren<{}>) {
    return React.createElement(
        'div',
        {
            role: 'presentation',
            className: 'code-editor-line-number',
            id: "code-editor-ln-id",
            children: children
        }
    );
}

export function CodeEditorBlock() {
    return React.createElement(
        'div',
        {
            role: 'presentation',
            className: 'code-editor',
            id: "code-editor-id",
            children: [
                <CodeEditorLineNumbers>
                    <CodeEditorLineNumber>1</CodeEditorLineNumber>
                    <CodeEditorLineNumber>2</CodeEditorLineNumber>
                    <CodeEditorLineNumber>3</CodeEditorLineNumber>
                    <CodeEditorLineNumber>4</CodeEditorLineNumber>
                    <CodeEditorLineNumber>5</CodeEditorLineNumber>
                </CodeEditorLineNumbers>
                ,
                <CodeEditorCodeSection>
                    <span className='comment'># </span>
                    <span className="comment">stripe-wallet<br/></span>
                    <span className="normal">hello<br/></span>
                    <span className="unknown">hello<br/></span>
                    <span className="bracket">&lt;</span>
                    <span className="class">TextEditorBlock</span>
                    <span className="bracket">&gt;<br/></span>
                    <span className="bracket">    &lt;</span>
                    <span className="class">div </span>
                    <span className="variable">className</span>
                    <span className="normal">=</span>
                    <span className="string">"text-editor-line"</span>
                    <span className="bracket">&gt;<br/></span>
                </CodeEditorCodeSection>
            ]
        }
    );
}