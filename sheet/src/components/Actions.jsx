import Editable from './Editable'
export default function Actions({ data, addActionRow, removeActionRow, updateActionRow }) {
  return (
    <>
      <div className="section-header">
        <div className="section-title">AZIONI E ATTACCHI</div>
        <button className="add-btn no-print" onClick={() => addActionRow('attacks')} title="Aggiungi Attacco">+</button>
      </div>
      <table className="attack-table">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Nome</th>
            <th style={{ width: '15%' }}>Bonus</th>
            <th style={{ width: '25%' }}>Danno</th>
            <th style={{ width: '30%' }}>Note</th>
            <th style={{ width: '5%' }} className="no-print"></th>
          </tr>
        </thead>
        <tbody>
          {data.attacks.map(atk => (
            <tr key={atk.id}>
              <td>
                <Editable tagName="strong" value={atk.name} onChange={(val) => updateActionRow('attacks', atk.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={atk.bonus} onChange={(val) => updateActionRow('attacks', atk.id, 'bonus', val)} />
              </td>
              <td>
                <Editable tagName="span" value={atk.damage} onChange={(val) => updateActionRow('attacks', atk.id, 'damage', val)} />
              </td>
              <td>
                <Editable tagName="span" value={atk.notes} onChange={(val) => updateActionRow('attacks', atk.id, 'notes', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="remove-btn" onClick={() => removeActionRow('attacks', atk.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <div className="section-title">Abilità & Tratti</div>
        <button className="add-btn no-print" onClick={() => addActionRow('features')} title="Aggiungi Tratto">+</button>
      </div>
      <table className="attack-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Nome</th>
            <th style={{ width: '65%' }}>Effetto</th>
            <th style={{ width: '5%' }} className="no-print"></th>
          </tr>
        </thead>
        <tbody>
          {data.features.map(feat => (
            <tr key={feat.id}>
              <td>
                <Editable tagName="strong" className="feature-name" value={feat.name} onChange={(val) => updateActionRow('features', feat.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={feat.effect} onChange={(val) => updateActionRow('features', feat.id, 'effect', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="remove-btn" onClick={() => removeActionRow('features', feat.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <div className="section-title">TRATTI CARATTERIALI</div>
        <button className="add-btn no-print" onClick={() => addActionRow('traits')} title="Aggiungi Elemento">+</button>
      </div>
      <table className="attack-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Nome</th>
            <th style={{ width: '65%' }}>Descrizione</th>
            <th style={{ width: '5%' }} className="no-print"></th>
          </tr>
        </thead>
        <tbody>
          {data.traits.map(trait => (
            <tr key={trait.id}>
              <td>
                <Editable tagName="strong" value={trait.name} onChange={(val) => updateActionRow('traits', trait.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={trait.description} onChange={(val) => updateActionRow('traits', trait.id, 'description', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="remove-btn" onClick={() => removeActionRow('traits', trait.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
