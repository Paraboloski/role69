export default function Navbar({ onSave, onReset }) {
    return (
        <>
            <div className="button-container no-print">
                <button className="btn save-btn" onClick={onSave}>Salva</button>
                <button className="btn print-btn" onClick={() => window.print()}>Stampa PDF</button>
                <button className="btn clear-btn" onClick={onReset}>Reset</button>
            </div>
        </>
    )
}