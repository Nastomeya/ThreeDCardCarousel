import { useThree } from '@react-three/fiber';
import Dot from './Dot';

const DotCarousel = ({ dotDatas, currentIndex }) => {
    const { camera } = useThree();
    const totalCount = dotDatas.length;

    if (totalCount === 0) {
        return <group />;
    }

    // Calculate the bottom edge of the viewport in world coordinates
    const fovRad = (camera.fov * Math.PI) / 180; // Convert FOV to radians
    const distance = camera.position.z; // Distance from camera to origin
    const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
    const bottomY = -viewportHeight / 2 + 3; // Bottom edge + small offset

    function getPosition(index) {
        const space = 1
        const totalWidth = (totalCount - 1) * space
        const x = index * space - totalWidth / 2; // Center the dots by offsetting        return [x, 0, 0]
        return [x, bottomY, 0]; // x: centered, y: bottom, z: 0
    }

    return (
        <>
            {dotDatas.map((dot, index) => {
                return (
                    <group key={dot.id} position={getPosition(index)}>
                        <Dot isDisplayed={dot.id === currentIndex} />
                    </group>
                )
            })}
        </>
    )
}
export default DotCarousel