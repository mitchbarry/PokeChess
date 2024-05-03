import { badWords } from 'expletives';

const wordBoundryBefore = `(?<=[\\s,.:;!?"']|^)`
const wordBoundryAfter = `(?=[\\s,.:;!?"']|$)`
const badWordsRegex = new RegExp(
    `${wordBoundryBefore}(${badWords.join("|")})${wordBoundryAfter}`,
    "gim"
)

const profanityUtilities = {
    containsProfanity(inputString) {
        return badWordsRegex.test(inputString)
    }
}

export default profanityUtilities;