export default function Navbar({ onSave, onReportBug }) {
  return (
    <nav className="toolbar no-print">
      <button className="btn btn--save" onClick={onSave}>Salva</button>
      <button className="btn btn--print" onClick={() => window.print()}>Stampa PDF</button>
      <button className="btn btn--bug" onClick={onReportBug}>Report a bug</button>
    </nav>
  )
}
