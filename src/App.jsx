import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CardSlides from './components/CardSlides'

export default function App() {
  return (
    <Canvas
      shadows
      dpr={window.devicePixelRatio}
      gl={{ preserveDrawingBuffer: true }}
      style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(21, 46, 100))' }}

      camera={{
        position: [0, 0, window.innerWidth > 800 ? 5 : 9],
        fov: 95,
      }}

      onCreated={({ gl, camera, size }) => {
        // initial sync
        gl.setSize(size.width, size.height)
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()

        // handle future resizes
        const onResize = () => {
          const w = gl.domElement.clientWidth
          const h = gl.domElement.clientHeight
          gl.setSize(w, h)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }}
    >
      {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={500} /> */}
      <OrbitControls enableZoom enablePan enableRotate target={[0, 0, 0]} enableDamping={false} />
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 1]} intensity={1} target-position={[0, 0, 0]} />
      <CardSlides />
    </Canvas>
  )
}
