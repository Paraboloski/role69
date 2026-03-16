export const createInitialCharacterState = () => ({
  header: {
    name: "Nome Personaggio", class1: "Classe 1", class2: "Classe 2",
    race: "Razza", background: "Background", alignment: "Allineamento",
    level: "1", player: "Tuo Nome"
  },

  stats: { str: "10", dex: "10", con: "10", int: "10", wis: "10", cha: "10" },
  combat: {
    ac: "10", speed: "9m", maxHitPoints: "10", currentHitPoints: "10", temporaryHitPoints: "0",
    honor: "+0", sanity: "+0", occult: "+0", passive: "10",
    profBonus: "+0", heroPoints: "0"
  },
  skills: {}, 
  inventory: {
    proficiencies: [{ id: Date.now() + 1, label: "Nome:", value: "..." }],
    items: [{ id: Date.now() + 2, label: "Nome", value: "x?", description: "..." }],
    equipment: [{ id: Date.now() + 3, label: "Nome:", value: "..." }]
  },
  actions: {
    attacks: [{ id: Date.now() + 4, name: "Attacco 1", bonus: "+?", damage: "1d? + ?", notes: "..." }],
    features: [{ id: Date.now() + 5, name: "Tratto 1", effect: "Descrizione 1." }],
    traits: [{ id: Date.now() + 6, name: "Tratto 1", description: "Descrizione 1." }]
  }
})

export const INITIAL_CHARACTER_STATE = createInitialCharacterState()

export const formatSignedNumber = (value) => (value >= 0 ? `+${value}` : value.toString())

export const calculateModifier = (score) => {
  const parsedScore = parseInt(score, 10)
  if (Number.isNaN(parsedScore)) return 0
  return Math.floor((parsedScore - 10) / 2)
}

export const parseSignedNumber = (bonusText) => {
  const match = bonusText.match(/-?\d+/)
  return match ? parseInt(match[0], 10) : 0
}
