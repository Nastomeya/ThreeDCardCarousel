import { createRoundedRectShape } from './createRoundedRectShape'
import { useShapeGeometryWithUV } from './useShapeGeometryWithUV'
import { useMemo } from 'react'
import { SRGBColorSpace } from 'three'

export function SubCardImage({ position = [0, 0, 0], texture, width, height, radius }) {

    const imgShape = useMemo(() => createRoundedRectShape(width, height, radius), [width, height, radius])
    const imgShapeWithUV = useShapeGeometryWithUV(imgShape)
    texture.colorSpace = SRGBColorSpace
    return (
        <mesh position={position} geometry={imgShapeWithUV} receiveShadow={true} castShadow={true} frustumCulled={false}>
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}