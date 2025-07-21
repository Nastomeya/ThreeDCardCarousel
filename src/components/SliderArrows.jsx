import SliderArrowBtn from './SliderArrowBtn';
import { useMod } from './useMod'
import { useBottonsPosition } from './useBottonsPosition'

const BTN_DATAS = [
    { id: 0 },
    { id: 1 }]

const BTN_SETTING = {
    radius: 0.2,//0.1,//
    segments: 32,
    space: 0.5,
    offsetX: 3.67,
};
const SliderArrows = ({ onBtnClick, currentIndex, totalSlides, offsetX = 0, offsetY, offsetZ }) => {
    const { getButtonsPosition } = useBottonsPosition(BTN_DATAS.length, BTN_SETTING.space, offsetX == 0 ? BTN_SETTING.offsetX : offsetX, offsetY, offsetZ);
    return (
        <>
            {BTN_DATAS.map((btn) => {
                return (
                    <group key={btn.id} position={getButtonsPosition(btn.id)}>
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