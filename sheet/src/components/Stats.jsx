import Editable from './Editable'
import { formatSignedNumber } from '../utils'

const STAT_DEFINITIONS = [
  { key: 'str', label: 'FOR' }, { key: 'dex', label: 'DES' }, { key: 'con', label: 'COS' },
  { key: 'int', label: 'INT' }, { key: 'wis', label: 'SAG' }, { key: 'cha', label: 'CAR' }
]

export default function Stats({ stats, modifiers, onFieldChange }) {
  const sanitizeUnsignedNumber = (value) => {
    const match = value.match(/\d+/)
    if (!match) return ''
    const number = Math.min(parseInt(match[0], 10), 999)
    return `${number}`
  }

  return (
    <div className="ability-grid">
      {STAT_DEFINITIONS.map(({ key, label }) => (
        <div className="ability-card" key={key}>
          <div className="ability-name">{label}</div>
          <div className="ability-mod">{formatSignedNumber(modifiers[key])}</div>
          <Editable
            className="ability-score"
            tagName="div"
            value={stats[key]}
            defaultValue="10"
            sanitize={sanitizeUnsignedNumber}
            inputMode="numeric"
            updateOnInput={false}
            onChange={(val) => onFieldChange('stats', key, val)}
          />
        </div>
      ))}
    </div>
  )
}
