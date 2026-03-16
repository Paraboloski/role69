import Editable from './Editable'
export default function Inventory({ inventoryData, onAddItem, onRemoveItem, onUpdateItem }) {
  return (
    <section className="inventory-section">
      <div className="section-header">
        <div className="section-title">COMPETENZE & LINGUAGGI</div>
        <button
          className="icon-btn icon-btn--add no-print"
          onClick={() => onAddItem('proficiencies')}
          title="Aggiungi Competenza"
        >
          +
        </button>
      </div>
      <ul className="list">
        {inventoryData.proficiencies.map((item) => (
          <li className="list-item" key={item.id}>
            <Editable
              tagName="strong"
              value={item.label}
              defaultValue="Nome:"
              onChange={(val) => onUpdateItem('proficiencies', item.id, 'label', val)}
            />{' '}
            <Editable
              tagName="span"
              value={item.value}
              defaultValue="..."
              onChange={(val) => onUpdateItem('proficiencies', item.id, 'value', val)}
            />
            <button className="icon-btn icon-btn--remove no-print" onClick={() => onRemoveItem('proficiencies', item.id)}>-</button>
          </li>
        ))}
      </ul>

      <div className="section-header">
        <div className="section-title">Inventario</div>
        <button
          className="icon-btn icon-btn--add no-print"
          onClick={() => onAddItem('items')}
          title="Aggiungi Oggetto"
        >
          +
        </button>
      </div>
      <ul className="list">
        {inventoryData.items.map((item) => (
          <li className="list-item" key={item.id}>
            <Editable
              tagName="strong"
              value={item.label}
              defaultValue="Nome"
              onChange={(val) => onUpdateItem('items', item.id, 'label', val)}
            />{' '}
            (
            <Editable
              tagName="span"
              value={item.value}
              defaultValue="x1"
              onChange={(val) => onUpdateItem('items', item.id, 'value', val)}
            />
            ) |{' '}
            <Editable
              tagName="span"
              value={item.description}
              defaultValue="Descrizione..."
              onChange={(val) => onUpdateItem('items', item.id, 'description', val)}
            />
            <button className="icon-btn icon-btn--remove no-print" onClick={() => onRemoveItem('items', item.id)}>-</button>
          </li>
        ))}
      </ul>

      <div className="section-header">
        <div className="section-title">Equipaggiamento</div>
        <button
          className="icon-btn icon-btn--add no-print"
          onClick={() => onAddItem('equipment')}
          title="Aggiungi Equipaggiamento"
        >
          +
        </button>
      </div>
      <ul className="list">
        {inventoryData.equipment.map((item) => (
          <li className="list-item" key={item.id}>
            <Editable
              tagName="strong"
              value={item.label}
              defaultValue="Nome:"
              onChange={(val) => onUpdateItem('equipment', item.id, 'label', val)}
            />{' '}
            <Editable
              tagName="span"
              value={item.value}
              defaultValue="..."
              onChange={(val) => onUpdateItem('equipment', item.id, 'value', val)}
            />
            <button className="icon-btn icon-btn--remove no-print" onClick={() => onRemoveItem('equipment', item.id)}>-</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
