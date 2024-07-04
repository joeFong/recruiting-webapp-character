import React, { createContext, useState, useEffect } from "react";
import { importCharacters, exportCharacters } from '../../services/api'
import { CLASS_LIST, ATTRIBUTE_LIST, SKILL_LIST } from "../../contants/const";

// Characters need to hold data about their stats, eligible class and skills 
// only one can be selected at one time 
// character schema 
// {
//     name: string,
//     class: string [],
//     selected: boolean,
//     availableStats: number, 
//     availableSkills: number,
//     stats: {
//         Strength: {
//             value: number,
//             modifier: number
//         },
//         Dexterity:  {
//             value: number,
//             modifier: number
//         },
//         Constitution:  {
//             value: number,
//             modifier: number
//         },
//         Intelligence:  {
//             value: number,
//             modifier: number
//         },
//         Wisdom:  {
//             value: number,
//             modifier: number
//         },
//         Charisma:  {
//             value: number,
//             modifier: number
//         },
//     },
//     skills: {
//      ... skills * SKILL_LIST.length
//     }
// }

// skills schema 
// {
//     name: string,
//     modifier: string
//     value: number
// }

const DEFAULT_ATTRIBUTE_STAT = 10 
const DEFAULT_MODIFIER_STAT = 0
const DEFAULT_TOTAL_ALLOWED_STATS = 70
const DEFAULT_SKILLS = 10

export const CharacterContext = createContext({
    characters: {},
    currentCharacter: ""
});

export const CharacterProvider = (props) => {
    const { children } = props 
    const [ characters, setCharacters ] = useState({})
    const [ currentCharacter, setCurrentCharacter ] = useState("")

    //On Mount Fetch Characters
    useEffect(() => {
        const fetchCharacters = async () => {
            const data = await importCharacters()
            
            setCharacters(data)
            setCurrentCharacter(Object.keys(data)[0])
        }
        fetchCharacters()
    }, [])

    const saveCharacters = async () => {
        return await exportCharacters(characters)
    }

    const determineEligibleClasses = (character) => {
        if(!character.stats) return []

        return Object.keys(CLASS_LIST).filter((c) => {
            const classStats = CLASS_LIST[c]
            return Object.keys(classStats).every((s) => {
                return character.stats[s].value >= classStats[s]
            })
        })
    }

    const determineStatsAvailability = (character) => {
        if(!character.stats) return false
        const totalStats = Object.keys(character.stats).reduce((acc, key) => {
            return acc + character.stats[key].value
        }, 0)

        return DEFAULT_TOTAL_ALLOWED_STATS - totalStats
    }

    const determineSkillsAvailability = (character) => {
        const totalSkills = Object.keys(character.skills).reduce((acc, key) => {
            return acc + character.skills[key].value
        }, 0)
        return (DEFAULT_SKILLS + (4 * character.stats.Intelligence.modifier)) - totalSkills
    }

    
    const determineSkillModifiers = (character) => {
        if(!character.skills) return {}
        if(!character.stats) return {}

        Object.keys(character.skills).forEach((skill) => {
            const s = character.skills[skill]
            s.intrinsicValue = s.value + character.stats[s.modifier].modifier
            character.skills[skill] = s
        })

        return character.skills
    }

    const updateCharacter = async (character) => {
        const eligible = determineEligibleClasses(character)
        character.class = eligible
        const availableStats = determineStatsAvailability(character)
        character.availableStats = availableStats
        const remainingSkills = determineSkillsAvailability(character)
        character.availableSkills = remainingSkills
        const skillMod = determineSkillModifiers(characters[currentCharacter])
        character.skills = skillMod

        const newCharacters = { ...characters, [character.name]: character }
        setCharacters(newCharacters)
    }

    const createCharacter = async (character) => {
        character = {
            ...character, 
            selected: true, 
            availableSkills: DEFAULT_SKILLS + (4 * DEFAULT_MODIFIER_STAT),
            availableStats: DEFAULT_TOTAL_ALLOWED_STATS - (ATTRIBUTE_LIST.length * DEFAULT_ATTRIBUTE_STAT),
            class: [], 
            stats: Object.keys(ATTRIBUTE_LIST).reduce((acc, key) => {
              return { ...acc, [ATTRIBUTE_LIST[key]]: {
                value: DEFAULT_ATTRIBUTE_STAT,
                modifier: DEFAULT_MODIFIER_STAT
              } }
            }, {}),
            skills: SKILL_LIST.reduce((acc, key) => {
                return {...acc, [key.name]: {
                    name: key.name, 
                    value: 0,
                    intrinsicValue: 0,
                    modifier: key.attributeModifier, 
                }}
            }, {})
        }
        // All Other Characters are deselected 
        let newCharacters = Object.keys(characters).reduce((acc, key) => {
            const c = characters[key]
            return { ...acc, [c.name]: { ...c, selected: false } }
        }, {})
        newCharacters = { ...newCharacters, [character.name]: character }
        setCharacters(newCharacters)
        setCurrentCharacter(character.name)
    }

    const deleteCharacter = async (characterKey) => {
        const newCharacters = { ...characters }
        delete newCharacters[characterKey]
        setCharacters(newCharacters)
        console.log('deleting')
        //Set Current Character to the first character in the list if found
        const keys = Object.keys(newCharacters)
        if(keys.length > 0) {
            setCurrentCharacter(keys[0])
        } else {
            setCurrentCharacter("")
        }
    }

    return (
        <CharacterContext.Provider value={{ 
            characters,
            currentCharacter,
            setCurrentCharacter,
            createCharacter,
            updateCharacter,
            deleteCharacter,
            saveCharacters
        }}>
          {children}
        </CharacterContext.Provider>
    );
}