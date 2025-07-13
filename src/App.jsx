import { Canvas } from '@react-three/fiber'
import CarouselContainer from './components/CarouselContainer'
import { OrthographicCamera, OrbitControls, PerspectiveCamera } from '@react-three/drei'


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
      style={{ height: '100vh/ 2.5', width: '100vw', background: 'linear-gradient(to bottom,rgb(0, 0, 0),rgb(21, 46, 100))' }}

      camera={{
        position: [0, 0, 4.8],
        fov: 60,
      }}

      onCreated={({ gl, camera }) => {
        // Define a target aspect ratio (e.g., 16:10)
        const targetAspect = 25 / 10;

        // Initial sync
        const w = gl.domElement.clientWidth;
        const h = w / targetAspect; // Calculate height based on width
        gl.setSize(w, h);
        camera.aspect = targetAspect;
        camera.updateProjectionMatrix()

        // handle future resizes
        const onResize = () => {
          const w = gl.domElement.clientWidth
          const h = w / targetAspect
          gl.setSize(w, h)
          camera.aspect = targetAspect
          camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
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
