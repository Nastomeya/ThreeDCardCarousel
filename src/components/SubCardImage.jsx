import { createRoundedRectShape } from './createRoundedRectShape'
import { useMemo } from 'react'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'

export function SubCardImage({ position = [0, 0, 0], map, width, height, radius }) {

    const imgShape = useMemo(() => createRoundedRectShape(width, height, radius), [createRoundedRectShape])
    const imgShapeWithUV = useShapeGeometryWithUV(imgShape)

    return (
        <mesh position={position} geometry={imgShapeWithUV}>
            <meshLambertMaterial map={map} />
        </mesh>
    )
}