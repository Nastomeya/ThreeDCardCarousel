import { useMemo } from 'react'
import * as THREE from 'three'

export function useExtrudeGeometryWithUV(shape, extrudeSettings) {
    return useMemo(() => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.computeBoundingBox();
        const { min, max } = geometry.boundingBox;
        const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
        const offset = new THREE.Vector2(-min.x, -min.y);
        const uvAttr = geometry.attributes.uv;

        // Only map UVs for caps using x/y, leave the sides as-is
        for (let i = 0; i < geometry.attributes.position.count; i++) {
            const z = geometry.attributes.position.getZ(i);
            // If you know your extrusion is along Z: caps are at minZ or maxZ
            if (Math.abs(z - min.z) < 1e-6 || Math.abs(z - max.z) < 1e-6) {
                const x = geometry.attributes.position.getX(i);
                const y = geometry.attributes.position.getY(i);
                uvAttr.setXY(i, (x + offset.x) / range.x, (y + offset.y) / range.y);
            }
        }
        uvAttr.needsUpdate = true;
        return geometry;
    }, [shape, extrudeSettings]);
}