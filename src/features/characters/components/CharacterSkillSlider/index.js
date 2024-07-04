import React, { useContext } from 'react';

/* Constants */
import { SKILL_LIST } from '../../../../contants/const';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';
import Box from '../../../../components/common/Box/Box';
import Item from '../../../../components/common/Item/Item';

/* Components */
import SkillSlider from './SkillSlider';

/* Context */
import { CharacterContext } from '../../characterContext';

const SkillSelect = () => {
    const { currentCharacter, characters } = useContext(CharacterContext);
    return (
        <Box>
            <h2>Skills</h2>
            <p>Remaining Allocatable Skills: { characters?.[currentCharacter]?.availableSkills }</p>
            <VStack>
                {
                    SKILL_LIST.map((skill, key) => {
                        return (
                            <Item key={key}>
                                <SkillSlider name={skill.name} />
                            </Item>
                        )
                    })
                }
            </VStack>
        </Box>
    );
}

export default SkillSelect 