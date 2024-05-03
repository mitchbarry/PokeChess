import { badWords } from 'expletives'

const badWordsArray = [badWords];
const boundaryBefore = `(?<=[\\s,.:!?''-]|^)`
const boundaryAfter = `(?=[\\s,.:!?''-]|$)`
const badWordsRegex = new RegExp(
    `${boundaryBefore}(${badWordsArray.join('|')})${boundaryAfter}`,
    'gim'
)

const profanityUtilities = {
    containsProfanity(inputString) {
        return badWordsRegex.test(inputString)
    }
}

export default profanityUtilities