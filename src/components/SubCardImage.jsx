import { createRoundedRectShape } from './createRoundedRectShape'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'
import { useMemo } from 'react'

export function SubCardImage({ position = [0, 0, 0], texture, width, height, radius, opacity }) {
    const imgShape = useMemo(() => createRoundedRectShape(width, height, radius), [width, height, radius])
    const imgShapeWithUV = useShapeGeometryWithUV(imgShape)

    return (
        <mesh position={position} geometry={imgShapeWithUV} receiveShadow={true} castShadow={true} frustumCulled={false}>
            <meshLambertMaterial map={texture} transparent={true} opacity={opacity} />
        </mesh>
    )
}