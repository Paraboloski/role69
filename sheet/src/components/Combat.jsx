import Editable from './Editable'
import { numFormat } from '../utils.js'
export default function Combat({ data, initMod, updatePath }) {
    return (
        <>
            <div className="combat-stats">
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.ac} onChange={(val) => updatePath('combat', 'ac', val)} />
                    <div className="label">Classe Armatura</div>
                </div>
                <div className="combat-box">
                    <div className="val" id="initiative-val">{numFormat(initMod)}</div>
                    <div className="label">Iniziativa</div>
                </div>
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.speed} onChange={(val) => updatePath('combat', 'speed', val)} />
                    <div className="label">Velocità</div>
                </div>
                <div className="combat-box" style={{ borderColor: '#c53131' }}>
                    <Editable
                        className="val"
                        style={{ color: '#c53131' }}
                        tagName="div"
                        value={data.hp}
                        onChange={(val) => updatePath('combat', 'hp', val)}
                    />
                    <div className="label">Punti Ferita</div>
                </div>
            </div>

            <div className="combat-stats">
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.honor} onChange={(val) => updatePath('combat', 'honor', val)} />
                    <div className="label">Onore</div>
                </div>
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.sanity} onChange={(val) => updatePath('combat', 'sanity', val)} />
                    <div className="label">Sanità Mentale</div>
                </div>
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.occult} onChange={(val) => updatePath('combat', 'occult', val)} />
                    <div className="label">Percezione occulta</div>
                </div>
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.passive} onChange={(val) => updatePath('combat', 'passive', val)} />
                    <div className="label">Percezione passiva</div>
                </div>
            </div>

            <div className="combat-stats">
                <div className="combat-box" style={{ borderColor: '#c53131' }}>
                    <Editable
                        className="val"
                        id="prof-bonus-val"
                        style={{ color: '#c53131' }}
                        tagName="div"
                        value={data.profBonus}
                        onChange={(val) => updatePath('combat', 'profBonus', val)}
                    />
                    <div className="label" style={{ color: '#c53131', fontWeight: 'bold' }}>Bonus Competenza</div>
                </div>
                <div className="combat-box">
                    <Editable className="val" tagName="div" value={data.heroPoints} onChange={(val) => updatePath('combat', 'heroPoints', val)} />
                    <div className="label">Punti Eroe</div>
                </div>
            </div>
        </>
    )
}