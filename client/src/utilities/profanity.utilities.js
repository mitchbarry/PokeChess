import { hasBadWords } from 'expletives'

profanityUtilities = {
    containsProfanity(inputString) {
        return hasBadWords(inputString)
    }
}

export default profanityUtilities