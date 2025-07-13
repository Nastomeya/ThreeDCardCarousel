import { Canvas } from '@react-three/fiber'
import CarouselContainer from './components/CarouselContainer'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'


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
// Define a target aspect ratio (e.g., 16:10)
const targetAspect = 2.0125//1.6//
export default function App() {

  const canvasRef = useRef()
  const glRef = useRef()
  const cameraRef = useRef()

  const handleResize = () => {
    if (!glRef.current || !cameraRef.current) return

    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    // Calculate dimensions while maintaining aspect ratio
    let width = Math.min(viewportHeight * targetAspect, viewportWidth)
    let height = width / targetAspect

    // If calculated height exceeds viewport height, adjust based on height
    if (height > viewportHeight) {
      height = viewportHeight
      width = height * targetAspect
    }

    glRef.current.setSize(width, height)
    cameraRef.current.aspect = width / height
    cameraRef.current.updateProjectionMatrix()

    // Center the canvas horizontally
    const canvas = glRef.current.domElement
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  useEffect(() => {// Add resize listener
    window.addEventListener('resize', handleResize)// Cleanup
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])


  return (
    <Canvas
      ref={canvasRef}
      shadows
      dpr={window.devicePixelRatio}
      gl={{ preserveDrawingBuffer: true }}
      style={{
        background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgb(21, 46, 100))',
        margin: '0 auto',
        display: 'block'
      }}
      camera={{
        position: [0, 0, 4.8],
        fov: 60,
      }}

      onCreated={({ gl, camera }) => {
        glRef.current = gl
        cameraRef.current = camera
        // Initial sizing
        handleResize()
      }}
    >
      {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={500} /> */}
      {/* <OrbitControls enableZoom enablePan enableRotate target={[0, 0, 0]} enableDamping={false} /> */}
      <ambientLight intensity={4} />
      <directionalLight position={[0, 0, 1]} intensity={1} target-position={[0, 0, 0]} />
      <CarouselContainer datas={datas} />
    </Canvas>
  )
}
