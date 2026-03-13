import Editable from './Editable';
import { numFormat } from '../utils';

const STAT_NAMES = [
    { key: 'str', label: 'FOR' }, { key: 'dex', label: 'DES' }, { key: 'con', label: 'COS' },
    { key: 'int', label: 'INT' }, { key: 'wis', label: 'SAG' }, { key: 'cha', label: 'CAR' }
];

export default function Stats({ stats, mods, updatePath }) {
    return (
        <>
            <div className="abilities">
                {STAT_NAMES.map(({ key, label }) => (
                    <div className="ability-box" key={key}>
                        <div className="ability-name">{label}</div>
                        <div className="ability-mod">{numFormat(mods[key])}</div>
                        <Editable
                            className="ability-score input-score"
                            tagName="div"
                            value={stats[key]}
                            onChange={(val) => updatePath('stats', key, val)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
