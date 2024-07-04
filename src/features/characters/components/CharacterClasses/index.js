import React from 'react';
/* Constants */
import { CLASS_LIST } from '../../../../contants/const';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';
import Box from '../../../../components/common/Box/Box';
import Item from '../../../../components/common/Item/Item';
import Class from './Class';

const CharacterClasses = (props) => {
    return (
        <Box>
            <h2>Classes</h2>
            <VStack textAlign="center">
                {
                    Object.keys(CLASS_LIST).map((key, i) => {
                        return (
                            <Item key={key}>
                                <Class name={key}/>
                            </Item>
                        )
                    })
                }
            </VStack>
        </Box>
    );
}

export default CharacterClasses 