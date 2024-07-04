import React, { useContext } from 'react';
import { style } from "typestyle";

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';
import Box from '../../../../components/common/Box/Box';
import CharacterForm from './CharacterForm';

/* Context */
import { CharacterContext } from '../../characterContext';

const CharacterSelection = (props) => {
    const { currentCharacter } = useContext(CharacterContext);
    return (
        <Box>
            <VStack>
                {
                    currentCharacter ? 
                    <h2 className={style({textAlign: 'center'})}>Current Character</h2> :
                    <h2 className={style({textAlign: 'center'})}>Character Selection</h2>
                }
                <CharacterForm />
            </VStack>
        </Box>
    );
}

export default CharacterSelection 