import React, { useContext } from 'react';

/* Constants */
import { ATTRIBUTE_LIST } from '../../../../contants/const';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';
import Box from '../../../../components/common/Box/Box';
import Item from '../../../../components/common/Item/Item';
import AttributeSlider from './AttributeSlider';

/* Context */
import { CharacterContext } from '../../characterContext';

const CharacterAttributes = (props) => {
    const { currentCharacter, characters  } = useContext(CharacterContext);
    return (
        <Box>
            <h2>Attributes</h2>
            <p>Remaining Allocatable Stats: { characters?.[currentCharacter]?.availableStats }</p>
            <VStack>
                {
                    ATTRIBUTE_LIST.map((attribute) => {
                        return (
                            <Item key={attribute}>
                                <AttributeSlider  
                                    name={attribute}/>
                            </Item>
                        )
                    })
                }
            </VStack>
        </Box>
    );
}

export default CharacterAttributes 