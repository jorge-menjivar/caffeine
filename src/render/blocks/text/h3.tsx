import React from "react";

export function H3Text(value: string) {
    let text = value.substring(4)
    return React.createElement(
        'div',
        {
            className: "h3-text",
            children: text,
            key: 0
        }
    );
}