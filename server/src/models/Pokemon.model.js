import { model, Schema } from 'mongoose'

const PokemonSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        pokedexNumber: {
            type: Number,
            required: true
        },
        types: {
            type: Array,
            required: true
        },
        abilities: {
            type: Array,
            required: true
        },
        spriteFrontDefault: {
            type: String,
            required: false
        },
        spriteOfficialArtwork: {
            type: String,
            required: false
        },
        stats: {
            hp: {
                type: Number,
                required: true
            },
            attack: {
                type: Number,
                required: true
            },
            defense: {
                type: Number,
                required: true
            },
            specialAttack: {
                type: Number,
                required: true
            },
            specialDefense: {
                type: Number,
                required: true
            },
            speed: {
                type: Number,
                required: true
            },
        },
        heldItems: {
            type: Array,
            required: false,
            default: []
        }
    },
    { timestamps: true }
)

const Pokemon = model('Pokemon', PokemonSchema)

export default Pokemon