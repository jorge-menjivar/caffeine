import React, {KeyboardEventHandler} from "react";

export function H1Text(value: string) {
    let text = value.substring(2)
    return React.createElement(
        'div',
        {
            className: "h1-text",
            children: text,
            key: 0
        }
    );
}