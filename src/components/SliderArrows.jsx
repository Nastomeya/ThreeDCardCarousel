import { useThree } from '@react-three/fiber';
import SliderArrowBtn from './SliderArrowBtn';
import { useMod } from './useMod'

const BTN_DATAS = [
    { id: 0 },
    { id: 1 }]

const BTN_SETTING = {
    radius: 0.2,//0.1,//
    segments: 32,
    space: 0.5,
    offset: 3.8
};
const SliderArrows = ({ onBtnClick, currentIndex, totalSlides }) => {
    const { camera } = useThree();

    // Calculate the bottom edge of the viewport in world coordinates
    const fovRad = (camera.fov * Math.PI) / 180; // Convert FOV to radians
    const distance = camera.position.z; // Distance from camera to origin
    const viewportHeight = 2 * distance * Math.tan(fovRad / 2);
    const bottomY = -viewportHeight / 2 + 3; // Bottom edge + small offset

    function getPosition(index) {
        const space = BTN_SETTING.space
        const totalWidth = (BTN_DATAS.length - 1) * space
        const x = index * space - totalWidth / 2 + BTN_SETTING.offset;
        return [x, bottomY, 0]; // x: centered, y: bottom, z: 0
    }

    return (
        <>
            {BTN_DATAS.map((btn) => {
                return (
                    <group key={btn.id} position={getPosition(btn.id)}>
                        <SliderArrowBtn
                            id={btn.id}
                            radius={BTN_SETTING.radius}
                            segments={BTN_SETTING.segments}
                            onClick={() => { onBtnClick?.(useMod((currentIndex + (btn.id % 2 === 0 ? -1 : 1)), totalSlides)) }}
                        />
                    </group>
                )
            })}
        </>
    )
}
export default SliderArrows