import React from "react";

export function TextLine(value: string) {
    return React.createElement(
        'div',
        {
            className: "text-line",
            children: value,
            key: 0
        }
    );
}