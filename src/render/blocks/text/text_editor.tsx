import React, {useEffect} from "react";

export function TextEditor(value: string, ref: any, id: any) {
    // const ref = useRef(null)
    useEffect(() => {
        // Position caret at the end of the line
        if (ref.current) {
            if (value.length > 0 && ref.current) {
                console.log("in effect")
                console.log(ref.current)
                let range = document.createRange();
                let set = window.getSelection();
                range.setStart(ref.current.childNodes[0], value.length);
                range.collapse(true);
                set.removeAllRanges();
                set.addRange(range);
            }
            ref.current.focus();
        }
    })

    return React.createElement(
        'div',
        {
            className: "text-editor",
            contentEditable: true,
            dir: 'auto',
            children: value,
            ref: ref,
            id: id,
            suppressContentEditableWarning: true
        }
    );
}
