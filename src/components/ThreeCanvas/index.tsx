import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { Group } from 'three'
import { useSnapshot } from 'valtio'
import { fabric } from 'fabric'
import useEditor from 'src/hooks/useEditor'
import usePreviewModal from 'src/hooks/usePreviewModal'
const snap = {
    intro: true,
    colors: '#353934',
    decals:'pmndrs',
    color: '#353934',
    decal: 'three2'
}
  


function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, snap.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

const CameraRig: React.FC = ({ children }) => {
  const groupRef = useRef()
  // const snap = useSnapshot(state)

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    if (groupRef.current) {
      easing.dampE(groupRef.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
    }
  })

  return <group ref={groupRef}>{children}</group>
}


const Shirt = ({dataUrl}) => {

 

  const { nodes, materials } = useGLTF('shirt_baked.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1}  dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.2}  map={dataUrl}/>
    </mesh>
  )
}


const ThreeCanvas = ({ position = [0, 0, 2.5], fov = 25, width, height }) => {
  const {editor} = useEditor()

  const { canvas } = editor

  const previewModal = usePreviewModal()
  const [dataUrl, setDataUrl] = useState(null)

  useEffect(() => {
    if(!previewModal.dataURL) return
    const texture = new TextureLoader().load(previewModal.dataURL)
    
    setDataUrl(texture)
 
  }, [canvas, previewModal.dataURL])



    return (
      <Canvas width={width} height={height} shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventPrefix="client">
        <ambientLight intensity={0.5} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
        <CameraRig>
        <Backdrop/>
          <Center>
            <Shirt dataUrl={dataUrl}/>
          </Center>
        </CameraRig>
      </Canvas>
    )
  }
  


export default ThreeCanvas
