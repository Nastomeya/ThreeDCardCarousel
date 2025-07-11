import * as THREE from 'three'
import { useMemo } from 'react'
import { createRoundedRectShape } from './createRoundedRectShape'
import { useExtrudeGeometryWithUV } from './useExtrudeGeometryWithUV'
import { GradientTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

export function CardBoard({ isShowTime, colors, stops }) {

    const backgroundShape = useMemo(() => createRoundedRectShape(4, 3.4, 0.05), [createRoundedRectShape])
    const backgroundShapeWithUV = useExtrudeGeometryWithUV(backgroundShape, { depth: 0.05, bevelEnabled: false })

    const cardFolderName = "/CardTextures";
    const metalNormalMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Normal.png')
    const metalBaseMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_BaseColor.png')
    const metalRoughnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Roughness.png')
    const metalnessMap = useLoader(THREE.TextureLoader, cardFolderName + '/BrushedIron1K_Metallic.png')

    return (
        <mesh position={[0, 0, 0]} geometry={backgroundShapeWithUV} receiveShadow={true} castShadow={true} frustumCulled={false}>
            <meshPhysicalMaterial
                map={metalBaseMap}
                normalMap={metalNormalMap}
                normalScale={[0, 0.2]}
                roughnessMap={metalRoughnessMap}    // Variation in shininess
                roughness={isShowTime ? 1 : 0.15}
                metalnessMap={metalnessMap}    // Where to be metal
                metalness={0.5}
                clearcoat={isShowTime ? 0.3 : 1}        // Adds clear coat layer
                clearcoatRoughness={isShowTime ? 0.1 : 1}
                reflectivity={isShowTime ? 0.5 : 1}     // High reflectivity
            >
                <GradientTexture
                    // colors={isShowTime ? ['white', '#3f4b6d', '#2a3a65', '#9ca4b2'] : ['#3f4b6d', '#606672', '#606672', '#3f4b6d']}
                    colors={colors}
                    stops={stops}
                    // rotation={isShowTime ? (0) : (Math.PI / 2)}
                    center={[0.5, 0.5]}
                />
            </meshPhysicalMaterial>
        </mesh>)
}