import React, { useMemo } from 'react'
import { GradientTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { CardTitleText } from './CardTitleText'
import { CardDateText } from './CardDateText'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'
import { useExtrudeGeometryWithUV } from './useExtrudeGeometryWithUV'

const GameSlide = () => {

    const studioLogo = useLoader(THREE.TextureLoader, '/StudioImages/BlindSqurrelGames/Logo.png')
    const gameImage = useLoader(THREE.TextureLoader, '/StudioImages/BlindSqurrelGames/GameImage.png')
    const gameTitle = "MASS EFFECT: LEGENDARY EDITION"
    const dateText = "13 May 2025"

    const createRoundedRectShape = useMemo(() => {
        return (width, height, radius) => {
            const shape = new THREE.Shape()

            shape.moveTo(-width / 2 + radius, -height / 2)
            shape.lineTo(width / 2 - radius, -height / 2)
            shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
            shape.lineTo(width / 2, height / 2 - radius)
            shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
            shape.lineTo(-width / 2 + radius, height / 2)
            shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
            shape.lineTo(-width / 2, -height / 2 + radius)
            shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

            return shape
        }
    }, [])

    const backgroundShape = useMemo(() => createRoundedRectShape(4, 3.4, 0.2), [createRoundedRectShape])
    const backgroundShapeWithUV = useExtrudeGeometryWithUV(backgroundShape, { depth: 0.05, bevelEnabled: false })
    const cardFolderName = "/CardTextures";
    const metalNormalMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Normal.png')
    const metalBaseMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_BaseColor.png')
    const metalRoughnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Roughness.png')
    const metalnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Metallic.png')

    const gameImgShape = useMemo(() => createRoundedRectShape(2.8, 2, 0.1), [createRoundedRectShape])
    const gameImgShapeWithUV = useShapeGeometryWithUV(gameImgShape)

    const logoImgShape = useMemo(() => createRoundedRectShape(2.8, 2, 0.1), [createRoundedRectShape])
    const logoImgShapeWithUV = useShapeGeometryWithUV(logoImgShape)

    const distanceFromCard = 0.055;
    return (
        <group position={[0, 0, 0]}>
            <mesh position={[0, 0, 0]} geometry={backgroundShapeWithUV} >
                <meshPhysicalMaterial
                    map={metalBaseMap}
                    normalMap={metalNormalMap}
                    normalScale={[0, 0.2]}
                    roughnessMap={metalRoughnessMap}    // Variation in shininess
                    roughness={1}
                    metalnessMap={metalnessMap}    // Where to be metal
                    metalness={0.5}
                    clearcoat={0.3}        // Adds clear coat layer
                    clearcoatRoughness={0.1}
                    reflectivity={0.5}     // High reflectivity
                >
                    <GradientTexture colors={['white', '#2a3a65', '#9ca4b2']} stops={[0, 0.65, 1]} />
                </meshPhysicalMaterial>
            </mesh>

            <CardTitleText position={[-1.4, 1.45, distanceFromCard]}>
                {gameTitle}
            </CardTitleText>
            <CardDateText position={[1.4, 0.8, distanceFromCard]}>
                {dateText}
            </CardDateText>

            {/* <mesh position={[0, 0.25, distanceFromCard]} geometry={logoImgShapeWithUV}>
                <meshLambertMaterial map={studioLogo} />
            </mesh> */}

            <mesh position={[0, -0.4, distanceFromCard]} geometry={gameImgShapeWithUV}>
                <meshLambertMaterial map={gameImage} />
            </mesh>
        </group>
    )
}

export default GameSlide
