
import { TitleText } from './useTitleText'
import bebasNeueFont from '../assets/fonts/BebasNeue-Regular.ttf';

function getTextConfig(displayCode) {
    return {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        color: "white",
        font: bebasNeueFont,
        maxWidth: (displayCode === 1 ? 2 : 3.2),
        textAlign: (displayCode === 1 ? "left" : "center"),
        fontSize: (displayCode === 1 ? 0.3 : 0.25),
        anchorX: (displayCode === 1 ? "left" : "center"),
        anchorY: "top",
        lineHeight: 1.215
    }
}
export function CarouselTitleText(displayCode, title) {
    const { position, rotation, color, font, maxWidth, anchorX, textAlign, fontSize, lineHeight, anchorY } = getTextConfig(displayCode)

    return (
        <TitleText
            position={position}
            rotation={rotation}
            color={color}
            font={font} maxWidth={maxWidth} anchorX={anchorX}
            textAlign={textAlign} fontSize={fontSize}
            lineHeight={lineHeight} anchorY={anchorY}
            {...rest}
        >
            {title}
        </TitleText>
    )
}