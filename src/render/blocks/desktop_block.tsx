import React, {KeyboardEvent, useRef} from "react";
import {BlockRenderer} from "./block_renderer";
import {BlockEditor} from "./block_editor";
import { NotebookData } from '../../common/notebook_data'

export function BlockComponent(
    props: {
        onKeyPress: any,
        onClick:any, 
        onSave:any,
        id: number,
        innerRef: any,
        data: NotebookData
    }
) {
    const [editing, isEditing] = React.useState(true);
    const editorRef = React.createRef<HTMLDivElement>()
    const line = props.data.getLine(props.id)
    const text = line.value
    const type = line.type
    const textRenderer = BlockRenderer(text, type);
    const textEditor = BlockEditor(text, editorRef, props.id);

    function keyListener(event: KeyboardEvent) {
        if (!isCommand()) {
            let isEmpty = editorRef.current.textContent.length === 0;
            props.onKeyPress(event, props.id, isEmpty);

            if (event.key === "Enter") {
                save(event.currentTarget.textContent)
            }
        }

        if (event.ctrlKey && event.key === "s" || event.ctrlKey && event.key === "S") {
            console.log("save command")
            props.onSave(event)
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
            editorRef.current.focus();
        }
    }

    function save(value: string) {
        let t = getType(value)
        props.data.updateLine(props.id, t, value);
        isEditing(false);
    }

    function getType(value: string) {
        let t = 'text'
        if (value[0] === "#") {
            if (value[1] === " "){
                t = 'h1';
                console.log("h1")
            }
            else if (value[1] === "#") {
                if (value[2] === " ") {
                    t = 'h2';
                    console.log("h2")
                }
                else if (value[2] === "#") {
                    if (value[3] === " ") {
                        t = 'h3';
                        console.log("h3")
                    }
                    else if (value[3] === "#" && value[4] === " ") {
                        t = 'h4';
                        console.log("h4")
                    }
                    else {
                        console.log("text")
                    }
                }
            }
        }

        // Text is a command
        else if (value === "\\code") {
            console.log("code command")
            t = 'code';
        }

        return t;
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
