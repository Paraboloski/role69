import Editable from './Editable'
export default function Inventory({ data, addListItem, removeListItem, updateListItem }) {
    return (
        <>
            <div className="section-header">
                <div className="section-title">Competenze</div>
                <button
                    className="add-btn no-print"
                    onClick={() => addListItem('proficiencies')}
                    title="Aggiungi Competenza"
                >
                    +
                </button>
            </div>
            <ul id="lista-competenze">
                {data.proficiencies.map(item => (
                    <li key={item.id}>
                        <Editable
                            tagName="strong"
                            value={item.label}
                            onChange={(val) => updateListItem('proficiencies', item.id, 'label', val)}
                        />{' '}
                        <Editable
                            tagName="span"
                            value={item.value}
                            onChange={(val) => updateListItem('proficiencies', item.id, 'value', val)}
                        />
                        <button className="remove-btn no-print" onClick={() => removeListItem('proficiencies', item.id)}>-</button>
                    </li>
                ))}
            </ul>

            <div className="section-header">
                <div className="section-title">Inventario</div>
                <button
                    className="add-btn no-print"
                    onClick={() => addListItem('items')}
                    title="Aggiungi Oggetto"
                >
                    +
                </button>
            </div>
            <ul id="lista-inventario">
                {data.items.map(item => (
                    <li key={item.id}>
                        <Editable
                            tagName="strong"
                            value={item.label}
                            onChange={(val) => updateListItem('items', item.id, 'label', val)}
                        />{' '}
                        (<Editable
                            tagName="span"
                            value={item.value}
                            onChange={(val) => updateListItem('items', item.id, 'value', val)}
                        />) |{' '}
                        <Editable
                            tagName="span"
                            value={item.description}
                            onChange={(val) => updateListItem('items', item.id, 'description', val)}
                        />
                        <button className="remove-btn no-print" onClick={() => removeListItem('items', item.id)}>-</button>
                    </li>
                ))}
            </ul>

            <div className="section-header">
                <div className="section-title">Equipaggiamento</div>
                <button
                    className="add-btn no-print"
                    onClick={() => addListItem('equipment')}
                    title="Aggiungi Equipaggiamento"
                >
                    +
                </button>
            </div>
            <ul id="lista-equipaggiamento">
                {data.equipment.map(item => (
                    <li key={item.id}>
                        <Editable
                            tagName="strong"
                            value={item.label}
                            onChange={(val) => updateListItem('equipment', item.id, 'label', val)}
                        />{' '}
                        <Editable
                            tagName="span"
                            value={item.value}
                            onChange={(val) => updateListItem('equipment', item.id, 'value', val)}
                        />
                        <button className="remove-btn no-print" onClick={() => removeListItem('equipment', item.id)}>-</button>
                    </li>
                ))}
            </ul>
        </>
    )
}