import { createCircleShape } from './createCircleShape'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'
import { useMemo } from 'react'
import * as THREE from 'three'

export function CircleWithOutline({ radius, map, outter, position = [0, 0, 0], strokeColor = 'black', segments = 64 }) {

    const imgShape = useMemo(() => createCircleShape(radius), [])
    const imgShapeWithUV = useShapeGeometryWithUV(imgShape)
    const ringGeometry = useMemo(
        () => new THREE.RingGeometry(radius, outter, segments),
        [radius, outter, segments]
    )

    return (
        <group>
            <mesh position={position} geometry={imgShapeWithUV}>
                <meshLambertMaterial map={map} />
            </mesh>

            {/* Stroke */}
            <mesh position={[position[0], position[1], position[2] + 0.001]} geometry={ringGeometry}>
                <meshStandardMaterial color={strokeColor} />
            </mesh>
        </group>
    )
}