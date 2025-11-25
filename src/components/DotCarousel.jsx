// import { useThree } from '@react-three/fiber';
import Dot from './Dot';
import { useBottonsPosition } from './useBottonsPosition'


const DOT_SETTING = {
    radius: 0.06,//0.1,//
    segments: 16,//32,//
    space: 0.25//0.5,//
};

const DotCarousel = ({ datas, onDotClick, cardClickedIndex, offsetY, offsetZ }) => {
    const totalCount = datas.length;
    if (totalCount === 0) {
        return <group />;
    }
    const { getButtonsPosition } = useBottonsPosition(totalCount, DOT_SETTING.space, 0, offsetY, offsetZ);
    return (
        <>
            {datas.map((dot) => {
                return (
                    <group key={dot.id} position={getButtonsPosition(dot.id)}>
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