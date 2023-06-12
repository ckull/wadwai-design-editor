import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import useEditor from 'src/hooks/useEditor'
import { useEffect, useState } from 'react'
import { useObjects } from 'src/components/Canvas/handlers'

function LayerPanel() {
  // const { editor: {objects} } = useEditor()
  const {
    editor: { objects },
  } = useEditor()
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (objects) {
      const filtered = objects.filter(item => {
        return item.type !== 'grid' && 
        item.type !== 'workarea'&&
        item.type !== 'backgroundImage'
      })
      console.log('filtered: ', filtered)
      setFiltered(filtered)
    }
  }, [objects])

  return (
    <>
      <div style={{ padding: '1rem 2rem' }}>
        {filtered.map(item => {
          return <LayerItem label={item.type} />
        })}
      </div>
    </>
  )
}

const LayerItem = ({ label }) => {
  return (
    <div className="flex">
      <div className="label">{label}</div>
      <div className="flex"></div>
    </div>
  )
}

export default LayerPanel
