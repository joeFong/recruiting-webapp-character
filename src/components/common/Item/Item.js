import React from 'react';
import { style } from "typestyle";

const Item = (props) => {
    return (
        <div className={container}>
            {props.children}
        </div>
    );
}

const container = style({
    padding: '5',
    margin: '5px',
});

export default Item 