import { useState, useEffect, useMemo } from 'react'
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Stats from "./components/Stats"
import TS from "./components/TS"
import Combat from "./components/Combat"
import Inventory from "./components/Inventory"
import Actions from "./components/Actions"
import { init, calcMod, parseBonus } from "./utils"

export default function App() {
  const [data, setData] = useState(init)

  useEffect(() => {
    const saved = localStorage.getItem('dnd_react_sheet')
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        console.error("Errore nel caricamento dei dati", e)
      }
    }
  }, [])

  const mods = useMemo(() => {
    const newMods = {}
    for (const key in data.stats) {
      newMods[key] = calcMod(data.stats[key])
    }
    return newMods
  }, [data.stats])

  const parsedProfBonus = useMemo(() => parseBonus(data.combat.profBonus), [data.combat.profBonus])

  const updatePath = (section, key, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }

  const toggleSkill = (skillId) => {
    setData(prev => ({
      ...prev,
      skills: { ...prev.skills, [skillId]: !prev.skills[skillId] }
    }))
  }

  const handleSave = () => {
    localStorage.setItem('dnd_react_sheet', JSON.stringify(data))
    alert("Scheda salvata con successo! Puoi chiudere l'app.")
  }

  const handleReset = () => {
    if (window.confirm("Sei sicuro di voler resettare? Perderai tutte le modifiche!")) {
      localStorage.removeItem('dnd_react_sheet')
      setData(initialCharacterState)
    }
  }

  const addListItem = (listName) => {
    const newItem = { id: Date.now() }
    
    if (listName === 'items') {
      newItem.label = "Nuovo Oggetto"
      newItem.value = "x1"
      newItem.description = "Descrizione..."
    } else {
      newItem.label = "Nuovo:"
      newItem.value = "Valore..."
    }

    setData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: [...prev.inventory[listName], newItem]
      }
    }))
  }

  const removeListItem = (listName, id) => {
    setData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: prev.inventory[listName].filter(item => item.id !== id)
      }
    }))
  }

  const updateListItem = (listName, id, field, newValue) => {
    setData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [listName]: prev.inventory[listName].map(item => 
          item.id === id ? { ...item, [field]: newValue } : item
        )
      }
    }))
  }

  const addActionRow = (listName) => {
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

    setData(prev => ({
      ...prev,
      actions: {
        ...prev.actions,
        [listName]: [...prev.actions[listName], newRow]
      }
    }))
  }

  const removeActionRow = (listName, id) => {
    setData(prev => ({
      ...prev,
      actions: {
        ...prev.actions,
        [listName]: prev.actions[listName].filter(item => item.id !== id)
      }
    }))
  }

  const updateActionRow = (listName, id, field, newValue) => {
    setData(prev => ({
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
    <>
      <Navbar onSave={handleSave} onReset={handleReset} />
      <div className="sheet" id="dynamic-sheet-content">
        <Header data={data.header} updatePath={updatePath} />
        <div className="grid-container">
          <div>
            <Stats stats={data.stats} mods={mods} updatePath={updatePath} />
            <TS skillsData={data.skills} mods={mods} profBonus={parsedProfBonus} toggleSkill={toggleSkill} />
            <Inventory data={data.inventory} addListItem={addListItem} removeListItem={removeListItem} updateListItem={updateListItem} />
          </div>
          <div>
            <Combat data={data.combat} initMod={mods.dex} updatePath={updatePath} />
            <Actions data={data.actions} addActionRow={addActionRow} removeActionRow={removeActionRow} updateActionRow={updateActionRow} />
          </div>
        </div>
      </div>
    </>
  )
}