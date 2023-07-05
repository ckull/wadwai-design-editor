import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { images } from 'src/constant/mock'
import { useCoreHandler } from 'src/components/Canvas/handlers'
import { useCallback } from 'react'
const ImagesPanel = () => {
  
  return (
    <>
      <div style={{ padding: '1rem 2rem' }} className='flex flex-col gap-2'>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search images" />
        </InputGroup>
        <div className="label">Click text to add to page</div>
        <div className='flex flex-wrap gap-2'>
            {images.map((image, index) => {
              return (
                <ImageItem key={index} src={image.src} />
              )
            })}
        </div>
      </div>
    </>
  )
}

const ImageItem = ({ src }: {  src: any }) => {
  const { addImage } = useCoreHandler()

  const handleAddObject = useCallback(() => {
    console.log('add object: ', src.large)
    addImage({
      type: 'Image',
      src: src.medium
    })
  }, [])

  return (
    <div className=' cursor-pointer hover:opacity-50' onClick={handleAddObject}>
      <img src={src.small} className='w-full h-full rounded-xl' />
    </div>
  )
}

export default ImagesPanel
