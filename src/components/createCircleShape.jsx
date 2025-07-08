import * as THREE from 'three'
export function createCircleShape(radius = 1) {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false)
    return shape
}