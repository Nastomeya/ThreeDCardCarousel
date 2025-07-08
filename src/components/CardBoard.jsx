import * as THREE from 'three'
import { useMemo } from 'react'
import { createRoundedRectShape } from './createRoundedRectShape'
import { useExtrudeGeometryWithUV } from './useExtrudeGeometryWithUV'
import { GradientTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

export function CardBoard() {

    const backgroundShape = useMemo(() => createRoundedRectShape(4, 3.4, 0.2), [createRoundedRectShape])
    const backgroundShapeWithUV = useExtrudeGeometryWithUV(backgroundShape, { depth: 0.05, bevelEnabled: false })

    const cardFolderName = "/CardTextures";
    const metalNormalMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Normal.png')
    const metalBaseMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_BaseColor.png')
    const metalRoughnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Roughness.png')
    const metalnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Metallic.png')

    return (
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
        </mesh>)
}