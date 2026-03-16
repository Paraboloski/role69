export default function Editable({
  value,
  onChange,
  tagName = 'span',
  className = '',
  style = {},
  sanitize = null,
  inputMode,
  defaultValue = '',
  updateOnInput = true,
}) {
  const Tag = tagName
  const editableClassName = className ? `editable ${className}` : 'editable'

  const normalizeWhitespace = (text) => text.replace(/\u00A0/g, ' ')

  const handleInput = (event) => {
    const rawText = event.currentTarget.textContent ?? ''
    const normalizedWhitespace = normalizeWhitespace(rawText)
    const sanitizedText = sanitize ? sanitize(normalizedWhitespace) : normalizedWhitespace
    if (sanitizedText !== rawText) {
      event.currentTarget.textContent = sanitizedText
    }
    if (updateOnInput) {
      onChange(sanitizedText)
    }
  }

  return (
    <Tag
      className={editableClassName}
      style={style}
      contentEditable={true}
      suppressContentEditableWarning
      inputMode={inputMode}
      onInput={handleInput}
      onBlur={(event) => {
        handleInput(event)
        const currentText = event.currentTarget.textContent ?? ''
        if (currentText.trim() === '') {
          event.currentTarget.textContent = defaultValue
          onChange(defaultValue)
          return
        }
        if (!updateOnInput) {
          onChange(currentText)
        }
      }}
    >
      {value}
    </Tag>
  )
}
