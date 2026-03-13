import { numFormat } from '../utils.js'
const SAVES = [
    { id: 'ts_str', label: 'TS Forza:', stat: 'str' }, { id: 'ts_dex', label: 'TS Destrezza:', stat: 'dex' },
    { id: 'ts_con', label: 'TS Costituzione:', stat: 'con' }, { id: 'ts_int', label: 'TS Intelligenza:', stat: 'int' },
    { id: 'ts_wis', label: 'TS Saggezza:', stat: 'wis' }, { id: 'ts_cha', label: 'TS Carisma:', stat: 'cha' }
]

const SKILLS = [
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

export default function TS({ skillsData, mods, profBonus, toggleSkill }) {
    const renderRow = ({ id, label, stat }) => {
        const isProficient = !!skillsData[id]
        const total = mods[stat] + (isProficient ? profBonus : 0)

        return (
            <li className="skill-row" style={{ marginBottom: '4px' }} key={id}>
                <input
                    type="checkbox"
                    className="prof-check"
                    style={{ marginRight: '8px' }}
                    checked={isProficient}
                    onChange={() => toggleSkill(id)}
                />
                <strong>{label}</strong> <span className="calc-val">{numFormat(total)}</span>
            </li>
        )
    }

    return (
        <>
            <div className="section-header">
                <div className="section-title">Tiri salvezza</div>
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '5px' }}>
                {SAVES.map(renderRow)}
                <hr style={{ border: 0, borderTop: '1px solid #e1e1e1', margin: '12px 0' }} />
                {SKILLS.map(renderRow)}
                <hr style={{ border: 0, borderTop: '1px solid #e1e1e1', margin: '12px 0' }} />
            </ul>
        </>
    )
}