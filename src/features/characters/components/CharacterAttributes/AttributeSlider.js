import React, { useEffect, useState, useContext } from "react";
import { style } from "typestyle";

/* Common Components */
import HStack from "../../../../components/common/HStack/HStack"

/* Context */
import { CharacterContext } from "../../characterContext";

const AttributeSlider = ({ name }) => {
    const { currentCharacter, characters, updateCharacter } = useContext(CharacterContext);
    const [ attributeValue, setAttributeValue ] = useState(characters?.[currentCharacter]?.stats?.[name]?.value);
    const [ modifierValue, setModifierValue ] = useState(characters?.[currentCharacter]?.stats?.[name]?.modifier);

    useEffect(() => {
        if(currentCharacter === null) return;
        setAttributeValue(characters?.[currentCharacter]?.stats?.[name]?.value);
        setModifierValue(characters?.[currentCharacter]?.stats?.[name]?.modifier);
    }, [name, currentCharacter, characters]);

    useEffect(() => {
        //Update context value
        if(currentCharacter === null || typeof attributeValue === 'undefined' || attributeValue < 0) return;
        let updatedCharacter = { ...characters[currentCharacter] };
        updatedCharacter.stats[name].value = attributeValue;
        updatedCharacter.stats[name].modifier = Math.floor((attributeValue - 10) / 2);

        updateCharacter(updatedCharacter);

    }, [attributeValue]);

    const increment = (e) => {
        if(characters?.[currentCharacter]?.availableStats > 0) {
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
            <p><b>{attributeValue}</b></p>
            {
                characters[currentCharacter]?.stats[name]?.modifier !== null &&
                <p className={style({ alignSelf: 'center' })}> - Modifier ({modifierValue})</p>
            }
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </HStack>
    )
}

export default AttributeSlider