import React, { useMemo } from 'react'
import { Text, Image, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const GameSlide = () => {

    const texture = useTexture('/GameImage.png')
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.repeat.set(1, 1)
    texture.offset.set(0, 0)
    // useMemo(() => {
    //     return (path) => {
    //         const texture = new useTexture(path);
    //         texture.wrapS = THREE.ClampToEdgeWrapping
    //         texture.wrapT = THREE.ClampToEdgeWrapping
    //         texture.repeat.set(1, 1) // Adjust these values if needed
    //         texture.offset.set(0, 0) // Center the texture
    //     }
    // }, [texture])

    const createRoundedRectShape = useMemo(() => {
        return (width, height, radius) => {
            const shape = new THREE.Shape()

            shape.moveTo(-width / 2 + radius, -height / 2)
            shape.lineTo(width / 2 - radius, -height / 2)
            shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
            shape.lineTo(width / 2, height / 2 - radius)
            shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
            shape.lineTo(-width / 2 + radius, height / 2)
            shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
            shape.lineTo(-width / 2, -height / 2 + radius)
            shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

            return shape
        }
    }, [])

    const backgroundShape = useMemo(() => createRoundedRectShape(4, 3, 0.2), [createRoundedRectShape])
    const imageShape = useMemo(() => createRoundedRectShape(2.3, 1.575, 0.1), [createRoundedRectShape])

    return (
        <group position={[0, 0, 0]}>
            <mesh position={[0, 0, 0]}>
                <extrudeGeometry args={[backgroundShape, { depth: 0.05, bevelEnabled: false }]} />
                <meshLambertMaterial color="#468585" emissive="#468585" />
            </mesh>

            {/* Title Text */}
            <Text
                fontSize={0.25}
                position={[-1.8, 1.2, 0.055]}
                color="black"
                anchorX="left"
                anchorY="top"
            >
                MASS EFFECT:
            </Text>

            {/* Subtitle */}
            <Text
                fontSize={0.25}
                position={[-1.8, 0.9, 0.055]}
                color="black"
                anchorX="left"
                anchorY="top"
            >
                LEGENDARY EDITION
            </Text>

            {/* <Image
                url="/GameImage.png"
                position={[0, -0.3, 0.055]}
                scale={[2.3, 1.575, 1]}
                transparent
            /> */}
            <mesh position={[0, -0.3, 0.055]}>
                <shapeGeometry args={[imageShape]} />
                <meshLambertMaterial map={texture} />
            </mesh>
        </group>
    )
}

export default GameSlide
