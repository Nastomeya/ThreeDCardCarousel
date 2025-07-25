import { Canvas } from '@react-three/fiber'
import CarouselContainer from './components/CarouselContainer'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

// const targetAspect = 1.6//2.0125//
export default function App() {
  const canvasRef = useRef()
  const glRef = useRef()
  const cameraRef = useRef()
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [studios, setStudios] = useState(null);
  const [isMobile, updateWindowSize] = useState(window.innerWidth < 768);

  const handleResize = () => {
    if (!glRef.current || !cameraRef.current) return

    const isNowMobile = window.innerWidth < 768;
    updateWindowSize(isNowMobile);
    const targetAspect = isNowMobile ? 0.85 : 2.0125//

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

    // Communicate height to parent window (for iframe)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'iframe-resize',
        height: height
      }, '*')
    }
  }

  useEffect(() => {
    fetch('/api-data/datas.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch JSON');
        return res.json();
      })
      .then((data) => setStudios(data))
      .catch((err) => {
        console.error('Error loading studios data:', err);
        setStudios([]); // fallback to empty if error
      });
  }, []);

  useEffect(() => {// Add resize listener
    window.addEventListener('resize', handleResize)// Cleanup
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  if (studios === null) {
    return <div>Loading...</div>; // or your fancy loader
  }

  // Handle autoplay pause/resume
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          fov: 60
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
        <CarouselContainer datas={studios} isAutoPlaying={isAutoPlaying} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
