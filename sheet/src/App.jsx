import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Stats from './components/Stats'
import SavingThrows from './components/SavingThrows'
import Combat from './components/Combat'
import Inventory from './components/Inventory'
import Actions from './components/Actions'
import { createInitialCharacterState, calculateModifier, parseSignedNumber } from './utils'

export default function App() {
  const [characterData, setCharacterData] = useState(() => createInitialCharacterState())
  const lastSavedRef = useRef(JSON.stringify(createInitialCharacterState()))
  const ipcRendererRef = useRef(null)
  const [isBugModalOpen, setIsBugModalOpen] = useState(false)
  const [bugReporterName, setBugReporterName] = useState('')
  const [bugDescription, setBugDescription] = useState('')

  useEffect(() => {
    try {
      const electron = window.require ? window.require('electron') : null
      ipcRendererRef.current = electron ? electron.ipcRenderer : null
    } catch {
      ipcRendererRef.current = null
    }

    const savedState = localStorage.getItem('dnd_react_sheet')
    if (savedState) {
      try {
        setCharacterData(JSON.parse(savedState))
        lastSavedRef.current = savedState
      } catch (error) {
        console.error('Errore nel caricamento dei dati', error)
      }
    }
  }, [])

  const statModifiers = useMemo(() => {
    const modifiers = {}
    for (const key in characterData.stats) {
      modifiers[key] = calculateModifier(characterData.stats[key])
    }
    return modifiers
  }, [characterData.stats])

  const proficiencyBonusValue = useMemo(
    () => parseSignedNumber(characterData.combat.profBonus),
    [characterData.combat.profBonus],
  )

  const updateSectionField = (section, key, value) => {
    setCharacterData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }

  const toggleSkill = (skillId) => {
    setCharacterData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skillId]: !prev.skills[skillId] }
    }))
  }

  const handleSave = () => {
    localStorage.setItem('dnd_react_sheet', JSON.stringify(characterData))
    lastSavedRef.current = JSON.stringify(characterData)
    alert("Scheda salvata con successo! Puoi chiudere l'app.")
  }

  const openBugReport = () => {
    const title = `Bug report - ${bugReporterName || 'Anonimo'}`
    const bodyLines = [
      `Nome: ${bugReporterName || 'Anonimo'}`,
      '',
      'Descrizione bug:',
      bugDescription || '(vuoto)'
    ]
    const issueUrl = `https://github.com/Paraboloski/asgaroth_dnd_sheet_apk/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

    try {
      const electron = window.require ? window.require('electron') : null
      if (electron?.shell) {
        electron.shell.openExternal(issueUrl)
      } else {
        window.open(issueUrl, '_blank', 'noopener,noreferrer')
      }
    } catch {
      window.open(issueUrl, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(characterData) !== lastSavedRef.current
    if (ipcRendererRef.current) {
      ipcRendererRef.current.send('set-unsaved-changes', hasUnsavedChanges)
    }
  }, [characterData])

  const addInventoryItem = (listName) => {
    const newItem = { id: Date.now() }
    
    if (listName === 'items') {
      newItem.label = "Nuovo Oggetto"
      newItem.value = "x1"
      newItem.description = "Descrizione..."
    } else {
      newItem.label = "Nuovo:"
      newItem.value = "Valore..."
    }

    setCharacterData((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: [...prev.inventory[listName], newItem]
      }
    }))
  }

  const removeInventoryItem = (listName, id) => {
    setCharacterData((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: prev.inventory[listName].filter(item => item.id !== id)
      }
    }))
  }

  const updateInventoryItem = (listName, id, field, newValue) => {
    setCharacterData((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: prev.inventory[listName].map(item => 
          item.id === id ? { ...item, [field]: newValue } : item
        )
      }
    }))
  }

  const addActionEntry = (listName) => {
    const newRow = { id: Date.now() }
    
    if (listName === 'attacks') {
      newRow.name = "Nuovo Attacco"
      newRow.bonus = "+0"
      newRow.damage = "1d?"
      newRow.notes = "-"
    } else if (listName === 'features') {
      newRow.name = "Nuovo Elemento"
      newRow.effect = "Descrizione."
    } else if (listName === 'traits') {
      newRow.name = "Nuovo Tratto"
      newRow.description = "Descrizione."
    }

    setCharacterData((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [listName]: [...prev.actions[listName], newRow]
      }
    }))
  }

  const removeActionEntry = (listName, id) => {
    setCharacterData((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [listName]: prev.actions[listName].filter(item => item.id !== id)
      }
    }))
  }

  const updateActionEntry = (listName, id, field, newValue) => {
    setCharacterData((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [listName]: prev.actions[listName].map(item => 
          item.id === id ? { ...item, [field]: newValue } : item
        )
      }
    }))
  }

  return (
    <div className="app">
      <Navbar onSave={handleSave} onReportBug={() => setIsBugModalOpen(true)} />
      {isBugModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsBugModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Report a bug</h2>
              <button className="icon-btn icon-btn--remove" onClick={() => setIsBugModalOpen(false)} aria-label="Chiudi">×</button>
            </div>
            <div className="modal-body">
              <label className="modal-label" htmlFor="bug-reporter-name">Nome</label>
              <input
                id="bug-reporter-name"
                className="modal-input"
                type="text"
                value={bugReporterName}
                onChange={(event) => setBugReporterName(event.target.value)}
              />
              <label className="modal-label" htmlFor="bug-description">Descrizione bug</label>
              <textarea
                id="bug-description"
                className="modal-textarea"
                rows={6}
                value={bugDescription}
                onChange={(event) => setBugDescription(event.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn--reset" onClick={() => setIsBugModalOpen(false)}>Annulla</button>
              <button
                className="btn btn--save"
                onClick={() => {
                  openBugReport()
                  setIsBugModalOpen(false)
                }}
              >
                Pubblica su GitHub
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="sheet" id="dynamic-sheet-content">
        <Header headerData={characterData.header} onFieldChange={updateSectionField} />
        <div className="sheet-grid">
          <section className="sheet-column">
            <Stats stats={characterData.stats} modifiers={statModifiers} onFieldChange={updateSectionField} />
            <SavingThrows
              skillsData={characterData.skills}
              modifiers={statModifiers}
              proficiencyBonus={proficiencyBonusValue}
              onToggleSkill={toggleSkill}
            />
            <Inventory
              inventoryData={characterData.inventory}
              onAddItem={addInventoryItem}
              onRemoveItem={removeInventoryItem}
              onUpdateItem={updateInventoryItem}
            />
          </section>
          <section className="sheet-column">
            <Combat
              combatData={characterData.combat}
              initiativeModifier={statModifiers.dex}
              onFieldChange={updateSectionField}
            />
            <Actions
              actionsData={characterData.actions}
              onAddRow={addActionEntry}
              onRemoveRow={removeActionEntry}
              onUpdateRow={updateActionEntry}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
