import { formatSignedNumber } from '../utils.js'

const SAVE_DEFINITIONS = [
  { id: 'ts_str', label: 'TS Forza:', stat: 'str' }, { id: 'ts_dex', label: 'TS Destrezza:', stat: 'dex' },
  { id: 'ts_con', label: 'TS Costituzione:', stat: 'con' }, { id: 'ts_int', label: 'TS Intelligenza:', stat: 'int' },
  { id: 'ts_wis', label: 'TS Saggezza:', stat: 'wis' }, { id: 'ts_cha', label: 'TS Carisma:', stat: 'cha' }
]

const SKILL_DEFINITIONS = [
  { id: 'acrobatics', label: 'Acrobazia (Des):', stat: 'dex' }, { id: 'animal', label: 'Addestrare animali (Sag):', stat: 'wis' },
  { id: 'arcana', label: 'Arcano (Int):', stat: 'int' }, { id: 'athletics', label: 'Atletica (For):', stat: 'str' },
  { id: 'stealth', label: 'Furtività (Des):', stat: 'dex' }, { id: 'investigation', label: 'Indagare (Int):', stat: 'int' },
  { id: 'deception', label: 'Inganno (Car):', stat: 'cha' }, { id: 'intimidation', label: 'Intimidire (Car):', stat: 'cha' },
  { id: 'performance', label: 'Intrattenere (Car):', stat: 'cha' }, { id: 'insight', label: 'Intuizione (Sag):', stat: 'wis' },
  { id: 'sleight', label: 'Mano lesta (Des):', stat: 'dex' }, { id: 'medicine', label: 'Medicina (Sag):', stat: 'wis' },
  { id: 'nature', label: 'Natura (Int):', stat: 'int' }, { id: 'perception', label: 'Percezione (Sag):', stat: 'wis' },
  { id: 'persuasion', label: 'Persuasione (Car):', stat: 'cha' }, { id: 'religion', label: 'Religione (Int):', stat: 'int' },
  { id: 'survival', label: 'Sopravvivenza (Sag):', stat: 'wis' }, { id: 'history', label: 'Storia (Int):', stat: 'int' }
]

export default function SavingThrows({ skillsData, modifiers, proficiencyBonus, onToggleSkill }) {
  const renderRow = ({ id, label, stat }) => {
    const isProficient = Boolean(skillsData[id])
    const total = modifiers[stat] + (isProficient ? proficiencyBonus : 0)

    return (
      <li className="skill-row" key={id}>
        <input
          type="checkbox"
          className="prof-check"
          checked={isProficient}
          onChange={() => onToggleSkill(id)}
        />
        <strong>{label}</strong> <span className="calc-val">{formatSignedNumber(total)}</span>
      </li>
    )
  }

  return (
    <section className="saving-throws">
      <div className="section-header">
        <div className="section-title">Tiri salvezza</div>
      </div>
      <ul className="skill-list">
        {SAVE_DEFINITIONS.map(renderRow)}
        <hr className="skill-divider" />
        {SKILL_DEFINITIONS.map(renderRow)}
        <hr className="skill-divider" />
      </ul>
    </section>
  )
}
