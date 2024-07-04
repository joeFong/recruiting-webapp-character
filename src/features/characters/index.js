import React, { useContext } from 'react';

/* Context */
import { CharacterContext } from './characterContext';

/* Common Components */
import Box from '../../components/common/Box/Box';
import HStack from '../../components/common/HStack/HStack';

/* Features */
import CharacterClasses from './components/CharacterClasses';
import CharacterAttributes from './components/CharacterAttributes';
import CharacterSkillSlider from './components/CharacterSkillSlider';
import CharacterSkillCheck from './components/CharacterSkillCheck';

const CharacterSheet = () => {
    const { characters } = useContext(CharacterContext);

    if(characters && Object.keys(characters).length === 0) {
        return <h2>No characters selected</h2>
    }

    return (
        <Box>
            <HStack>
                <CharacterSkillCheck/>
                <CharacterSkillCheck party/>
            </HStack>
            <HStack>
                {/* Section for Classes */}
                <CharacterClasses />

                {/* Section for Attributes */}
                <CharacterAttributes />

                {/* Section for Skills */}
                <CharacterSkillSlider/>
            </HStack>
        </Box>
    )
}

export default CharacterSheet;