import React, { useEffect, useState, useContext } from "react";
import HStack from "../../../../components/common/HStack/HStack"
import { style } from "typestyle";

/* Context */
import { CharacterContext } from "../../characterContext";

const SkillSlider = ({ name }) => {
    const { currentCharacter, characters, updateCharacter } = useContext(CharacterContext);
    const [ attributeValue, setAttributeValue ] = useState(characters?.[currentCharacter]?.skills?.[name]?.value);
    const [ modifierValue, setModifierValue ] = useState(characters?.[currentCharacter]?.skills?.[name]?.modifier);

    useEffect(() => {
        if(currentCharacter === null) return;
        setAttributeValue(characters?.[currentCharacter]?.skills?.[name]?.value);
        setModifierValue(characters?.[currentCharacter]?.skills?.[name]?.modifier);
    }, [name, currentCharacter, characters]);

    useEffect(() => {
        //Update context value
        if(typeof attributeValue === 'undefined' || attributeValue < 0) return;
        
        let updatedCharacter = { ...characters[currentCharacter] };
        updatedCharacter.skills[name].value = attributeValue;
        updateCharacter(updatedCharacter);
    }, [attributeValue]);

    const increment = (e) => {
        if(characters?.[currentCharacter]?.availableSkills > 0) {
            setAttributeValue(attributeValue + 1);
        }
    }

    const decrement = (e) => {
        if (attributeValue !== 0) {
            setAttributeValue(attributeValue - 1);
        }
    }

    return (
        <HStack gap="25">
            <p className={style({ alignSelf: 'center' })}>{name}</p>
            <p className={style({ marginLeft: "2px", marginRight: "2px" })}><b>{attributeValue}</b></p>
            {
                characters[currentCharacter]?.skills[name]?.modifier !== null &&
                <p className={style({ alignSelf: 'center' })}> 
                    - Modifier ({modifierValue}) ({characters[currentCharacter]?.stats?.[modifierValue]?.modifier})
                </p>
            }
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>

            <p className={style({ alignSelf: 'center' })}>
            {characters[currentCharacter]?.skills?.[name]?.intrinsicValue}
            </p>
        </HStack>
    )
}

export default SkillSlider