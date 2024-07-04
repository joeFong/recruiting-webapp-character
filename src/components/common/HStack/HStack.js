import React from 'react';
import { style } from "typestyle";

function container(...args) {
    const [ alignItems, gap ] = args
    return {
        display: 'flex',
        flexDirection: 'row',
        gap: gap,
        alignItems: alignItems,
        justifyContent: 'space-evenly',
        padding: '10px',
        margin: '5px',
    }
}

const HStack = ({ alignItems = 'inherit', gap = '20px', children }) => {
    const styles = style(
        container(alignItems, gap)
    );

    return (
        <div className={styles}>
            {children}
        </div>
    );
}

export default HStack 