import React, { useContext, useState } from 'react';

/* Context */
import { CharacterContext } from '../../characterContext';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';

/* Constants */
import { SKILL_LIST } from '../../../../contants/const';

const DC_UPPER = 20
const CharacterSkillCheck = ({ party }) => {
    const [ chosenSkill, setChosenSkill ] = useState(null);
    const [ DC, setDC ] = useState(10);
    const [ results, setResults ] = useState(null);
    const [ rollResults, setRollResults ] = useState(null);
    const [ resultLabel, setResultLabel ] = useState(null);
    const [ roller, setRoller ] = useState(null);
    const { characters, currentCharacter } = useContext(CharacterContext);

    const handleOnRoll = () => {
        if(!chosenSkill) {
            alert('Please select a skill')
            return
        }

        console.log('Rolling...')

        if(party) {
            let partyRoller = -1 //set to -1 to always update past 0 value
            let partyRollerCharacter = null
            //Find the highest skill value in the party
            for (const key in characters) {
                let character = characters[key]
                if(character.skills[chosenSkill].intrinsicValue >= partyRoller) {
                    partyRoller = character.skills[chosenSkill].intrinsicValue
                    partyRollerCharacter = character
                }
            }
            const roll = Math.floor(Math.random() * DC_UPPER + 1) + partyRollerCharacter.skills[chosenSkill].intrinsicValue
            setRoller(partyRollerCharacter)
            updateResults(roll)
            return 
        }

        //incluse 0 inclusive 20 + skill value
        const roll = Math.floor(Math.random() * DC_UPPER + 1) + characters[currentCharacter].skills[chosenSkill].intrinsicValue
        setRoller(characters[currentCharacter])
        updateResults(roll)
    }

    const updateResults = (roll) => {
        const res = roll >= DC
        let resLabel = res ? 'Success!' : 'Failure!'

        if(roll >= DC_UPPER) {
            resLabel = 'Critical Success!'
        }

        setRollResults(roll) 
        setResults(res) 
        setResultLabel(resLabel)
    }

    return (
        <VStack gap={20}>
            <h2>{ party ? "Party Skill Check" : "Skill Check"}</h2>
            <div>
                <label htmlFor="name">Select Skill: </label>
                <select id="name" onChange={(e) => setChosenSkill(e.target.value)}>
                    <option value={null}>Skill</option>
                    {
                        SKILL_LIST.map((skill, key) => {
                            return <option key={key} value={skill?.name}>{skill?.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label>DC: </label>
                <input type="number" value={DC} onChange={(e) => setDC(e.target.value)} />
            </div>

            <div>
                <button onClick={handleOnRoll}>Roll</button>
            </div>

            {
                results !== null ? (
                    <div>
                        <h3>Character: {roller?.name}</h3>
                        <h3>{resultLabel}</h3>
                        <p>Roll: {rollResults}</p>
                    </div>
                ) : (
                    <></>
                )
            }
        </VStack>
    );
}

export default CharacterSkillCheck;