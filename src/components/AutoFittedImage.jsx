import React, { useRef } from 'react'
import { Image } from '@react-three/drei'

export const AutoFittedImage = ({ url, boardSize = [2, 1.71], z = 0.016, position }) => {
    const ref = useRef()
    const finalPos = position || [0, 0, z]

    return (
        <Image
            ref={ref}
            url={url}
            position={finalPos}
            transparent
            onLoad={({ source }) => {
                if (!ref.current || !source?.image) return

                const { width, height } = source.image
                const imageAspect = width / height
                const boardAspect = boardSize[0] / boardSize[1]

                let scaleX = boardSize[0]
                let scaleY = boardSize[1]

                if (imageAspect > boardAspect) {
                    scaleY = boardSize[0] / imageAspect
                } else {
                    scaleX = boardSize[1] * imageAspect
                }

                // Apply scale adjusted by mesh scale
                ref.current.scale.set(scaleX * 0.1, scaleY * 0.1, 1)
            }}
        />
    )
}
