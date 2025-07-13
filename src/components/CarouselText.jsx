import { useTitleText as BaseText } from './useTitleText';
import { a } from '@react-spring/three'

const TitleText = a(BaseText)
const titleText = "Feature Studios And Games"
function getTextConfig() {
    return {
        font: "/Fonts/Montserrat-Bold.ttf",
        maxWidth: 5,
        textAlign: "center",
        fontSize: 0.235,
        anchorX: "center",
        anchorY: "top",
        lineHeight: 1.22,
        position: [0, 2.55, 0],
        color: "white"
    }
}
const CarouselText = ({ }) => {
    const { color, position, font, maxWidth, anchorX, textAlign, fontSize, lineHeight, anchorY } = getTextConfig()
    return (
        <TitleText
            color={color}
            font={font} maxWidth={maxWidth} anchorX={anchorX}
            textAlign={textAlign} fontSize={fontSize}
            lineHeight={lineHeight} anchorY={anchorY}
            position={position}>
            {titleText}
        </TitleText>
    );
}
export default CarouselText