import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls } from '@react-three/drei'
import GameSlide from './components/GameSlide'

export default function App() {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 5]} intensity={1.5} />
      <color attach="background" args={['#f0f0f0']} />
      <GameSlide />
    </Canvas>
  )
}
