import { useMemo } from 'react'
import * as THREE from 'three'

export function useShapeGeometryWithUV(shape, segments = 12) {
    return useMemo(() => {
        const geometry = new THREE.ShapeGeometry(shape, segments)

        // Compute bounding box for normalization
        geometry.computeBoundingBox()
        const { min, max } = geometry.boundingBox
        const range = new THREE.Vector2(max.x - min.x, max.y - min.y)
        const offset = new THREE.Vector2(-min.x, -min.y)

        // Build UVs: Map X/Y to [0,1] in the bounding box
        const uvAttr = []
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            const x = geometry.attributes.position.getX(i)
            const y = geometry.attributes.position.getY(i)
            uvAttr.push((x + offset.x) / range.x, (y + offset.y) / range.y)
        }
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvAttr, 2))
        return geometry
    }, [shape])
}