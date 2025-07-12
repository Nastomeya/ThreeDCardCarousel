import { useState } from 'react'
import { useThree } from '@react-three/fiber'

export function useHoverEffect() {
    const { gl } = useThree()
    const [isHovered, setHovered] = useState(false)

    const handlePointerOver = () => {
        // Set cursor to pointer
        gl.domElement.style.cursor = 'pointer'
        // Update internal state
        setHovered(true)
    }

    const handlePointerOut = () => {
        // Reset cursor to auto
        gl.domElement.style.cursor = 'auto'
        // Update internal state
        setHovered(false)
    }

    return {
        isHovered,
        handlePointerOver,
        handlePointerOut
    }
}