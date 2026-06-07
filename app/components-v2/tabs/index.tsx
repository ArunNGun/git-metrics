"use client"

interface TabItem {
  label: string
  id: string
}

interface TabsProps {
  onChange: (id: string) => void
  value: string
  items: TabItem[]
}

const Tabs = ({ onChange, value, items = [] }: TabsProps) => {
  return (
    <div className="gm-tabs">
      {items.map((el) => (
        <button
          key={el.id}
          className={`gm-tab ${value === el.id ? 'gm-tab-active' : ''}`}
          onClick={() => onChange(el.id)}
        >
          {el.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
