export default function Editable({ value, onChange, tagName = 'span', className = '', style = {} }) {
    const Tag = tagName;
    return (
        <>
            <Tag className={className}
                style={style}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onChange(e.currentTarget.textContent)}
            >{value}</Tag>
        </>
    )
}