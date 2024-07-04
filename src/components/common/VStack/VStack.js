import React from 'react';
import { style } from "typestyle";

function textAlignStyle(align = 'left') {
    return {
      'textAlign': align,
    }
}

function container(...args) {
    const [ gap ] = args
    return {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      gap: gap,
      margin: '5px',
      justifyContent: 'space-evenly',
    }
}

const VStack = ({ textAlign = 'left', gap = 'inherit', children }) => {
    const styles = style(
        textAlignStyle(textAlign || 'left'), 
        container(gap)
    );
    return (
        <div className={styles}>
            {children}
        </div>
    );
}

export default VStack 