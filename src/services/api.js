import { CHARACTER_ID, API_DOMAIN } from '../contants/const'

/**
 * This function exports characters asynchronously.
 * @param payload - characters to be updated in database
 */
export const exportCharacters = async (characters) => {
    if(!CHARACTER_ID) throw new Error('No character ID provided')

    if(!characters) throw new Error('No payload provided')

    if(!Object.keys(characters).length) throw new Error('No characters provided in characters')

    let res = await fetch(`${API_DOMAIN}/api/{${CHARACTER_ID}}/character`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characters)
        }
    )
    let data = await res.json()

    return data
}

/**
 * This function is named requests data for latest updated set of characters.
 */
export const importCharacters = async () => {
    if(!CHARACTER_ID) throw new Error('No character ID provided')

    let res = await fetch(`${API_DOMAIN}/api/{${CHARACTER_ID}}/character`)
    let data = await res.json()

    if(data?.message === 'Item not found') {
        return null 
    }

    if(data?.statusCode !== 200) {
        return null
    }

    return data?.body
}