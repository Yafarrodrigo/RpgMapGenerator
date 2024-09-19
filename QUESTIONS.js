const QUESTIONS = [
    {
        key: "age",
        question: "What's your character age?",
        options: [
            {txt: "young", changes: {con: 1,agi: 1,int: -1}},
            {txt: "middle age", changes: {str: 1,con: 1,agi: -1}},
            {txt: "old", changes: {str: -1,agi: -1,int: +2}}
        ],
        default: 1
    },
    {
        key: "body",
        question: "Describe your character's physical appearance",
        options: [
            {txt: "skinny", changes: {agi: 1,str: -1}},
            {txt: "average", changes: {con: 1}},
            {txt: "strong", changes: {str: 1,agi: -1}}
        ],
        default: 1
    },
    {
        key: "location",
        question: "Where did your character grow up?",
        options: [
            {txt: "unknown", changes: {}},
            {txt: "village", changes: {oneHandedWeapons:1,rangedWeapons:1,shields:1}},
            {txt: "wilderness", changes: {herbalism:2,rangedWeapons:1,quivers:1}},
            {txt: "jail", changes: {twoHandedWeapons:2}},
            {txt: "church",changes: {arcaneMastery: 1,fireMastery: 1,waterMastery: 1,
                                    earthMastery: 1,airMastery: 1,books: 2,orbs: 2,}}
        ],
        default: 0
    },
    {
        key: "fear",
        question: "What does your character fear the most?",
        options: [
            {txt: "unknown", changes:{}},
            {txt: "nothing", changes: {str:2,int:-1}},
            {txt: "dying", changes: {con:2, agi:-1}},
            {txt: "confrontation", changes: {agi:2, con:-1}},
            {txt: "sickness", changes: {con:2, str:-1}}
        ],
        default: 0
    },
    {
        key: "belief",
        question: "Does your character see the world governed by mystical forces, tangible realities, or is it indifferent?",
        options: [
            {txt: "unknown", changes:{}},
            {txt: "none", changes:{}},
            {txt: "material", changes:{str:1,agi:1,int:-1}},
            {txt: "mystical", changes:{str:-1,agi:-1,int:2}}
        ],
        default: 0
    }
]

export default QUESTIONS

