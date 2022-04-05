import React from "react";

export function H4Text(value: string) {
    let text = value.substring(5)
    return React.createElement(
        'div',
        {
            className: "h4-text",
            children: text,
            key: 0
        }
    );
}