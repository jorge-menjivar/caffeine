import React, {useRef} from "react";
import {BlockRenderer} from "./block_renderer";
import {BlockEditor} from "./block_editor";

export function BlockComponent(
    props: {onKeyPress: any, onClick:any, onSave:any, id: number, innerRef: any}) {
    const [text, setText] = React.useState("");
    const [editing, isEditing] = React.useState(true);
    const editorRef = React.createRef<HTMLDivElement>()
    const textRenderer = BlockRenderer(text);
    const textEditor = BlockEditor(text, editorRef, props.id);

    function keyListener(event: any) {
        if (!isCommand()) {
            let isEmpty = editorRef.current.textContent.length === 0;
            props.onKeyPress(event, props.id, isEmpty);

            // console.log(`Text: ${text}`)
            if (event.key === "Enter") {
                // save(editorRef.current.textContent)
                save(event.currentTarget.textContent)
            }
        }
    }

    function isCommand() {
        switch (text) {
            case "\\code": return true;
            case "\\image": return true;
            default: return false;
        }
    }

    function clickListener(event: any) {
        // console.log("click listener");
        props.onClick(event, props.id);

        if (!editing && !isCommand()) {
            isEditing(true);
        }

        if (editorRef.current) {
            // console.log('editorRef current')
            // if (text.length > 0) {
            //     // console.log("in effect")
            //     let range = document.createRange();
            //     let set = window.getSelection();
            //     range.setStart( editorRef.current.childNodes[0], text.leqngth);
            //     range.collapse(true);
            //     set.removeAllRanges();
            //     set.addRange(range);
            // }

            editorRef.current.focus();
        }
    }

    function save(value: string) {
        setText(value);
        isEditing(false);
    }

    return React.createElement(
        'div',
        {
            children: editing ? textEditor : textRenderer,
            id: props.id.toString(),
            onClick: clickListener,
            onKeyDown: keyListener,
            ref: props.innerRef
        }
    )
}
