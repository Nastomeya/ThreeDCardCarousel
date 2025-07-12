import { useThree } from '@react-three/fiber';
import Dot from './Dot';


const DOT_SETTING = {
    radius: 0.05,//0.1,//
    segments: 16,//32,//
    space: 0.175//0.5,//
};

const DotCarousel = ({ datas, onDotClick, cardClickedIndex }) => {
    const { camera } = useThree();
    const totalCount = datas.length;

    if (totalCount === 0) {
        return <group />;
    }

    // Calculate the bottom edge of the viewport in world coordinates
    const fovRad = (camera.fov * Math.PI) / 180; // Convert FOV to radians
    const distance = camera.position.z; // Distance from camera to origin
    const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
    const bottomY = -viewportHeight / 2 + 3; // Bottom edge + small offset

    function getPosition(index) {
        const space = DOT_SETTING.space
        const totalWidth = (totalCount - 1) * space
        const x = index * space - totalWidth / 2; // Center the dots by offsetting        return [x, 0, 0]
        return [x, bottomY, 0]; // x: centered, y: bottom, z: 0
    }

    return (
        <>
            {datas.map((dot) => {
                return (
                    <group key={dot.id} position={getPosition(dot.id)}>
                        <Dot
                            id={dot.id}
                            currentIndex={cardClickedIndex}
                            radius={DOT_SETTING.radius}
                            segments={DOT_SETTING.segments}
                            onClick={() => { onDotClick?.(dot.id) }}
                        />
                    </group>
                )
            })}
        </>
    )
}
export default DotCarousel