import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls } from '@react-three/drei'
import Card from './components/Card'

export default function App() {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(21, 46, 100))' }}>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={800} />
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={3} />
      <directionalLight position={[3, 2, 5]} intensity={2} target-position={[0, 0, 0]} />
      <Card />
    </Canvas>
  )
}
