import Editable from './Editable'
export default function Header({ data, updatePath }) {
    return (
        <>
            <div className="header">
                <div>
                    <h1><Editable value={data.name} onChange={(val) => updatePath('header', 'name', val)} /></h1>
                    <div className="sub-info">
                        <Editable value={data.class1} onChange={(val) => updatePath('header', 'class1', val)} /> |{' '}
                        <Editable value={data.class2} onChange={(val) => updatePath('header', 'class2', val)} /> |{' '}
                        <Editable value={data.race} onChange={(val) => updatePath('header', 'race', val)} /> |{' '}
                        <Editable value={data.background} onChange={(val) => updatePath('header', 'background', val)} /> |{' '}
                        <Editable value={data.alignment} onChange={(val) => updatePath('header', 'alignment', val)} />
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Livello <Editable value={data.level} onChange={(val) => updatePath('header', 'level', val)} />
                    </div>
                    <div className="sub-info">
                        Giocatore: <Editable value={data.player} onChange={(val) => updatePath('header', 'player', val)} />
                    </div>
                </div>
            </div>
        </>
    )
}