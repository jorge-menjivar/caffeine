import React from "react";

export function H2Text(value: string) {
    let text = value.substring(3)
    return React.createElement(
        'div',
        {
            className: "h2-text",
            children: text,
            key: 0
        }
    );
}