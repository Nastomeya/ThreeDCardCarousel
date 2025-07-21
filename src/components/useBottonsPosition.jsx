import { useThree } from '@react-three/fiber'

export function useBottonsPosition(totalCount, space, offsetX = 0, offsetY = 0, offsetZ = 0) {
    const { camera } = useThree();

    // Calculate the bottom edge of the viewport in world coordinates
    const fovRad = (camera.fov * Math.PI) / 180; // Convert FOV to radians
    const distance = camera.position.z; // Distance from camera to origin
    const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
    const bottomY = -viewportHeight / 2 + offsetY; // Bottom edge + small offset

    const getButtonsPosition = (index) => {
        const totalWidth = (totalCount - 1) * space
        const x = index * space - totalWidth / 2 + offsetX; // Center the dots by offsetting        return [x, 0, 0]
        return [x, bottomY, offsetZ]; // x: centered, y: bottom, z: 0
    }
    return { getButtonsPosition }
}
