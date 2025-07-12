import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CarouselContainer from './components/CarouselContainer'


const datas = [
  {
    id: 0,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 01 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2016"
  },
  {
    id: 1,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 02 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2013"
  },
  {
    id: 2,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 03 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2013"
  },
  {
    id: 3,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 04 ECT: LEGENDARY EDITION",
    dateText: "13 May 2025"
  },
  {
    id: 4,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 05 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2013"
  },
  {
    id: 5,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 06 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2013"
  },
  {
    id: 6,
    studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
    website: 'https://blindsquirrelentertainment.com/',
    gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
    gameTitle: "Number 07 ECT: LEGENDARY EDITION",
    dateText: "06 Oct 2013"
  }
]

export default function App() {
  return (
    <Canvas
      shadows
      dpr={window.devicePixelRatio}
      gl={{ preserveDrawingBuffer: true }}
      style={{ height: '100vh', width: '100vw', background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(21, 46, 100))' }}

      camera={{
        position: [0, 0, 4.8],
        fov: 60,
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
      {/* <OrbitControls enableZoom enablePan enableRotate target={[0, 0, 0]} enableDamping={false} /> */}
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 1]} intensity={1} target-position={[0, 0, 0]} />
      <CarouselContainer datas={datas} />
    </Canvas>
  )
}
