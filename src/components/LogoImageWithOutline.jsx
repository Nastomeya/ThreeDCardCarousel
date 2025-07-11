import { createCircleShape } from './createCircleShape'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'
import { useMemo, useState } from 'react'
import { useCursor } from '@react-three/drei'
import * as THREE from 'three'

export function LogoImageWithOutline({ radius, texture, outter, website, position = [0, 0, 0], strokeColor = 'black', segments = 64 }) {
    const imgShape = useMemo(() => createCircleShape(radius), [])
    const imgShapeWithUV = useShapeGeometryWithUV(imgShape)
    const ringGeometry = useMemo(
        () => new THREE.RingGeometry(radius, outter, segments),
        [radius, outter, segments]
    )
    const handleClick = () => window.open(website, '_blank', 'noopener,noreferrer');
    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer', 'auto')
    const hoverStrokeColor = 'orange'

    return (
        <group>
            <mesh
                position={position}
                geometry={imgShapeWithUV}
                receiveShadow={true}
                castShadow={true}
                frustumCulled={false}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshLambertMaterial map={texture}
                    emissive={hovered ? hoverStrokeColor : 'black'}
                />
            </mesh>

            {/* Stroke */}
            <mesh
                position={[position[0], position[1], position[2] + 0.001]}
                geometry={ringGeometry}
            >
                <meshStandardMaterial color={strokeColor} />
            </mesh>
        </group>
    )
}