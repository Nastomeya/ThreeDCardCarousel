import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { CardTitleText } from './CardTitleText'
import { CardDateText } from './CardDateText'
import { CircleWithOutline } from './CircleWithOutline'
import { CardBoard } from './CardBoard'
import { SubCardImage } from './SubCardImage'

const GameSlide = () => {

    const studioLogo = useLoader(THREE.TextureLoader, '/StudioImages/BlindSqurrelGames/Logo.png')
    const gameImage = useLoader(THREE.TextureLoader, '/StudioImages/BlindSqurrelGames/GameImage.png')
    const gameTitle = "MASS EFFECT: LEGENDARY EDITION"
    const dateText = "13 May 2025"

    const logoRadius = 0.35
    const distanceFromCard = 0.055;
    return (
        <group position={[0, 0, 0]}>
            <CardBoard />
            <CardTitleText position={[-1.4, 1.45, distanceFromCard]}>{gameTitle}</CardTitleText>
            <CardDateText position={[1.4, 0.8, distanceFromCard]}>{dateText}</CardDateText>
            <CircleWithOutline radius={logoRadius} map={studioLogo} outter={logoRadius + 0.02} position={[1, 1.2, distanceFromCard]} />
            <SubCardImage position={[0, -0.4, distanceFromCard]} map={gameImage} width={2.8} height={2} radius={0.1} />
        </group>
    )
}

export default GameSlide
