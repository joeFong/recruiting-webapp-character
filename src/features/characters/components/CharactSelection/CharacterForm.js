import React, { useState, useContext } from 'react';

/* Context */
import { CharacterContext } from '../../characterContext';

/* Common Components */
import Box from '../../../../components/common/Box/Box';
import HStack from '../../../../components/common/HStack/HStack';
import VStack from '../../../../components/common/VStack/VStack';
import CreateNewCharacter from './CreateNewCharacter';
import CharacterSelect from './CharacterSelect';

const CharacterForm = () => {
    const { characters, currentCharacter, deleteCharacter, saveCharacters } = useContext(CharacterContext);
    
    const [ toggle, setToggle ] = useState({
        create: false,
        select: false,
        delete: false,
        save: false
    });

    const toggleMenu = (type) => {
        let temp = {...toggle}

        temp = Object.keys(temp).reduce((acc, key) => {
            if(key !== type) {
                acc[key] = false;
            }
            return {...acc, [type]: !temp[type]};
        }, {});

        setToggle(temp);
    }

    const handleDeleteCharacter = () => {
        const confirm = window.confirm('Are you sure you want to delete this character?');

        if(!confirm) {
            alert('At least one character must be selected to delete');
            return
        }
        
        deleteCharacter(currentCharacter);
    }

    const handleSaveCharacters = async () => {
        const save = await saveCharacters();
        if(save && save.body === 'Record Added') {
            alert('Characters Saved Successfully');
        } else { 
            alert('Error Saving Characters');
        }
    }

    return (
        <Box>
            <HStack>
                <h2>{ currentCharacter }</h2>
            </HStack>
            <HStack>
                <button onClick={toggleMenu.bind(this, 'create')}>
                    Create Character
                </button>

                <button onClick={toggleMenu.bind(this, 'select')}>
                    Select Character
                </button>

                <button disabled={!currentCharacter} onClick={handleDeleteCharacter}>
                    Delete Character
                </button>

                <button disabled={!Object.keys(characters).length} onClick={handleSaveCharacters}>
                    Save Characters
                </button>
            </HStack>

            <VStack>
                {
                    toggle.select && <CharacterSelect onCharacterSelect={toggleMenu.bind(this, 'select')}/>
                }
                {
                    toggle.delete && <p>Delete Character</p>
                }
                {
                    toggle.create && <CreateNewCharacter onCharacterCreated={toggleMenu.bind(this, 'create')}/>
                }
            </VStack>
        </Box>
    );
    
}

export default CharacterForm;