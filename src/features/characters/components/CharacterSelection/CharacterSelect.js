import React, { useContext } from 'react';

/* Context */
import { CharacterContext } from '../../characterContext';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';

const CharacterSelect = () => {
    const { characters, setCurrentCharacter } = useContext(CharacterContext);

    return (
        <VStack gap={20}>
            <h2>Character Selection</h2>
            <div>
                <label htmlFor="name">Select Character: </label>
                <select id="name" onChange={(e) => setCurrentCharacter(e.target.value)}>
                    <option value={null}>Select Character</option>
                    {
                        Object.keys(characters).map((name, key) => {
                            return <option key={key} value={name}>{name}</option>
                        })
                    }
                </select>
            </div>
        </VStack>
    );
}

export default CharacterSelect;