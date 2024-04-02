const gameStateUtilities = {
    newGameState() {
        const gameState = {
            stage: 0,
            players: [],
            pool: {
                1: {
                    0 : 522, // total number of common units in the pool
                    1: 29, // Bulbasaur (#001) - Grass/Poison
                    4: 29, // Charmander (#004) - Fire
                    7: 29, // Squirtle (#007) - Water
                    10: 29, // Caterpie (#010) - Bug
                    13: 29, // Weedle (#013) - Bug/Poison
                    16: 29, // Pidgey (#016) - Normal/Flying
                    19: 29, // Rattata (#019) - Normal
                    21: 29, // Spearow (#021) - Normal/Flying
                    23: 29, // Ekans (#023) - Poison
                    25: 29, // Pikachu (#025) - Electric
                    27: 29, // Sandshrew (#027) - Ground
                    29: 29, // Nidoran♀ (#029) - Poison
                    32: 29, // Nidoran♂ (#032) - Poison
                    35: 29, // Clefairy (#035) - Fairy
                    37: 29, // Vulpix (#037) - Fire
                    39: 29, // Jigglypuff (#039) - Normal/Fairy
                    41: 29, // Zubat (#041) - Poison/Flying
                    43: 29 // Oddish (#043) - Grass/Poison
                },
                2: {
                    0: 459, // total number of uncommon units in the pool
                    46: 27, // Paras (#046) - Bug/Grass
                    48: 27, // Venonat (#048) - Bug/Poison
                    50: 27, // Diglett (#050) - Ground
                    52: 27, // Meowth (#052) - Normal
                    54: 27, // Psyduck (#054) - Water
                    56: 27, // Mankey (#056) - Fighting
                    58: 27, // Growlithe (#058) - Fire
                    60: 27, // Poliwag (#060) - Water
                    63: 27, // Abra (#063) - Psychic
                    66: 27, // Machop (#066) - Fighting
                    69: 27, // Bellsprout (#069) - Grass/Poison
                    72: 27, // Tentacool (#072) - Water/Poison
                    74: 27, // Geodude (#074) - Rock/Ground
                    77: 27, // Ponyta (#077) - Fire
                    79: 27, // Slowpoke (#079) - Water/Psychic
                    81: 27, // Magnemite (#081) - Electric
                    83: 27 // Farfetch'd (#083) - Normal/Flying
                },
                3: {
                    0: 368, // total number of rare units in the pool
                    84: 23, // Doduo (#084) - Normal/Flying
                    86: 23, // Seel (#086) - Water
                    88: 23, // Grimer (#088) - Poison
                    90: 23, // Shellder (#090) - Water
                    92: 23, // Gastly (#092) - Ghost/Poison
                    95: 23, // Onix (#095) - Rock/Ground
                    96: 23, // Drowzee (#096) - Psychic
                    98: 23, // Krabby (#098) - Water
                    100: 23, // Voltorb (#100) - Electric
                    102: 23, // Exeggcute (#102) - Grass/Psychic
                    104: 23, // Cubone (#104) - Ground
                    106: 23, // Hitmonlee (#106) - Fighting
                    107: 23, // Hitmonchan (#107) - Fighting
                    108: 23, // Lickitung (#108) - Normal
                    109: 23, // Koffing (#109) - Poison
                    111: 23 // Rhyhorn (#111) - Ground/Rock
                },
                4: {
                    0: 195, // total number of epic units in the pool
                    114: 13, // Tangela (#114) - Grass
                    115: 13, // Kangaskhan (#115) - Normal
                    116: 13, // Horsea (#116) - Water
                    118: 13, // Goldeen (#118) - Water
                    120: 13, // Staryu (#120) - Water
                    122: 13, // Mr. Mime (#122) - Psychic/Fairy
                    123: 13, // Scyther (#123) - Bug/Flying
                    124: 13, // Jynx (#124) - Ice/Psychic
                    125: 13, // Electabuzz (#125) - Electric
                    126: 13, // Magmar (#126) - Fire
                    127: 13, // Pinsir (#127) - Bug
                    128: 13, // Tauros (#128) - Normal
                    129: 13, // Magikarp (#129) - Water
                    131: 13, // Lapras (#131) - Water/Ice
                    132: 13 // Ditto (#132) - Normal
                },
                5: {
                    0: 144, // total number of legendary units in the pool
                    133: 12, // Eevee (#133) - Normal
                    137: 12, // Porygon (#137) - Normal
                    138: 12, // Omanyte (#138) - Rock/Water
                    140: 12, // Kabuto (#140) - Rock/Water
                    142: 12, // Aerodactyl (#142) - Rock/Flying
                    143: 12, // Snorlax (#143) - Normal
                    144: 12, // Articuno (#144) - Ice/Flying
                    145: 12, // Zapdos (#145) - Electric/Flying
                    146: 12, // Moltres (#146) - Fire/Flying
                    147: 12, // Dratini (#147) - Dragon
                    150: 12, // Mewtwo (#150) - Psychic
                    151: 12 // Mew (#151) - Psychic
                }
            }
        }
        return gameState
    }
}

export default gameStateUtilities;