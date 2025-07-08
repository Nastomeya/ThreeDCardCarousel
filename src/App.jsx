import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CardSlides from './components/CardSlides'

export default function App() {
  return (
    <Canvas shadows gl={{ preserveDrawingBuffer: true }} style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(21, 46, 100))' }}
      camera={{
        position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
        fov: 95,
      }}
    >
      {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={800} /> */}
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={3} />
      <directionalLight position={[3, 2, 5]} intensity={2} target-position={[0, 0, 0]} />
      <CardSlides />
    </Canvas>
  )
}
