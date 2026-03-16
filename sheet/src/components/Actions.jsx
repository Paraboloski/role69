import Editable from './Editable'
export default function Actions({ actionsData, onAddRow, onRemoveRow, onUpdateRow }) {
  return (
    <section className="actions-section">
      <div className="section-header">
        <div className="section-title">ATTACCHI & INCANTESIMI</div>
        <button className="icon-btn icon-btn--add no-print" onClick={() => onAddRow('attacks')} title="Aggiungi Attacco">+</button>
      </div>
      <table className="action-table">
        <thead>
          <tr>
            <th className="action-table__col action-table__col--name">Nome</th>
            <th className="action-table__col action-table__col--bonus">Bonus</th>
            <th className="action-table__col action-table__col--damage">Danno</th>
            <th className="action-table__col action-table__col--notes">Note</th>
            <th className="action-table__col action-table__col--tools no-print"></th>
          </tr>
        </thead>
        <tbody>
          {actionsData.attacks.map((attack) => (
            <tr key={attack.id}>
              <td>
                <Editable tagName="strong" value={attack.name} defaultValue="Nuovo Attacco" updateOnInput={false} onChange={(val) => onUpdateRow('attacks', attack.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={attack.bonus} defaultValue="+0" updateOnInput={false} onChange={(val) => onUpdateRow('attacks', attack.id, 'bonus', val)} />
              </td>
              <td>
                <Editable tagName="span" value={attack.damage} defaultValue="1d?" updateOnInput={false} onChange={(val) => onUpdateRow('attacks', attack.id, 'damage', val)} />
              </td>
              <td>
                <Editable tagName="span" value={attack.notes} defaultValue="-" updateOnInput={false} onChange={(val) => onUpdateRow('attacks', attack.id, 'notes', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="icon-btn icon-btn--remove" onClick={() => onRemoveRow('attacks', attack.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <div className="section-title">PRIVILEGI & TRATTI</div>
        <button className="icon-btn icon-btn--add no-print" onClick={() => onAddRow('features')} title="Aggiungi Tratto">+</button>
      </div>
      <table className="action-table action-table--wide">
        <thead>
          <tr>
            <th className="action-table__col action-table__col--name">Nome</th>
            <th className="action-table__col action-table__col--notes">Effetto</th>
            <th className="action-table__col action-table__col--tools no-print"></th>
          </tr>
        </thead>
        <tbody>
          {actionsData.features.map((feature) => (
            <tr key={feature.id}>
              <td>
                <Editable tagName="strong" className="feature-name" value={feature.name} defaultValue="Nuovo Elemento" updateOnInput={false} onChange={(val) => onUpdateRow('features', feature.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={feature.effect} defaultValue="Descrizione." updateOnInput={false} onChange={(val) => onUpdateRow('features', feature.id, 'effect', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="icon-btn icon-btn--remove" onClick={() => onRemoveRow('features', feature.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <div className="section-title">PROFILO PSICOLOGICO</div>
        <button className="icon-btn icon-btn--add no-print" onClick={() => onAddRow('traits')} title="Aggiungi Elemento">+</button>
      </div>
      <table className="action-table action-table--wide">
        <thead>
          <tr>
            <th className="action-table__col action-table__col--name">Nome</th>
            <th className="action-table__col action-table__col--notes">Descrizione</th>
            <th className="action-table__col action-table__col--tools no-print"></th>
          </tr>
        </thead>
        <tbody>
          {actionsData.traits.map((trait) => (
            <tr key={trait.id}>
              <td>
                <Editable tagName="strong" value={trait.name} defaultValue="Nuovo Tratto" updateOnInput={false} onChange={(val) => onUpdateRow('traits', trait.id, 'name', val)} />
              </td>
              <td>
                <Editable tagName="span" value={trait.description} defaultValue="Descrizione." updateOnInput={false} onChange={(val) => onUpdateRow('traits', trait.id, 'description', val)} />
              </td>
              <td className="action-cell no-print">
                <button className="icon-btn icon-btn--remove" onClick={() => onRemoveRow('traits', trait.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
