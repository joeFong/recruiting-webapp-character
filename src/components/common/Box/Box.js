import React from 'react';
import { style } from "typestyle";


function maxHeightStyle(height) {
    return {
      maxHeight: height || '100%'
    };
}

function overFlowStyle(overflow) {
    return {
      overflow: overflow || 'auto'
    };
}

const Box = ({ maxHeight, overFlow, children }) => {
    const styles = style(
        maxHeightStyle(maxHeight),
        overFlowStyle(overFlow)
    );
    return (
        <div className={styles}>
            {children}
        </div>
    );
}

export default Box 