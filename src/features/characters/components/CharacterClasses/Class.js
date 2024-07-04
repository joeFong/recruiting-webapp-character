import React, { useState, useEffect, useContext } from "react";
import { style } from "typestyle";

/* Common Components */
import Box from "../../../../components/common/Box/Box";
import HStack from "../../../../components/common/HStack/HStack";

/* Constants */
import { CLASS_LIST } from '../../../../contants/const';

/* Context */
import { CharacterContext } from "../../characterContext";

function avatar(...args) {
    const [ eligible, selected ] = args
    return {
        height: '100%',
        width: '80px',
        opacity: eligible ? 1 : 0.3,
        border: selected ? '2px solid white' : '2px solid transparent',
        borderRadius: '50%',
    };
}

const Class = ({ name }) => {
    const [selected, setSelected] = useState(false);
    const [eligible, setEligible] = useState()
    const { currentCharacter, characters } = useContext(CharacterContext);

    useEffect(() => {
        if(currentCharacter === null) return;
        setEligible(characters?.[currentCharacter]?.class.indexOf(name) !== -1);
    }, [name, currentCharacter, characters])

    const styles = style(
        avatar(eligible, selected)
    );

    const toggleSelected = (e) => {
        setSelected(!selected)
    }

    return (
        <div onClick={toggleSelected}>
            <img className={styles} src={`https://api.multiavatar.com/${name}.png`} alt={name} />
            <p>{name}</p>
            {
                selected && (
                    <Box>
                        {
                            Object.keys(CLASS_LIST[name]).map((key) => {
                                return (
                                    <HStack alignItems="center" gap={"10px"}>
                                        <label>{key}</label>
                                        <p>{CLASS_LIST[name][key]}</p>
                                    </HStack>
                                )
                            })
                        }
                    </Box>
                )
            }
        </div>
    )  
}

export default Class;