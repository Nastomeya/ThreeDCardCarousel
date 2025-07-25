import { a, useSpring } from '@react-spring/three'
import { useTitleText as BaseText } from './useTitleText'
import { useMemo } from 'react';
import { DISPLAY_MODES } from './DisplayModes'
import bebasNeueFont from '../assets/fonts/BebasNeue-Regular.ttf';

const CardTitleText = a(BaseText)

const SPRING_CONFIG = {
    mass: 3,
    tension: 120,
    friction: 120,
    precision: 0.001,
};
function getTextConfig(displayCode) {
    return {
        font: bebasNeueFont,
        maxWidth: (displayCode === 1 ? 2 : 3.2),
        textAlign: (displayCode === 1 ? "left" : "center"),
        fontSize: (displayCode === 1 ? 0.3 : 0.25),
        anchorX: (displayCode === 1 ? "left" : "center"),
        anchorY: "top",
        lineHeight: 1.215
    }
}
export function AnimatedCardTitleText({ displayCode, distanceFromCard, title }) {
    const { font, maxWidth, anchorX, textAlign, fontSize, lineHeight, anchorY } = getTextConfig(displayCode)
    // compute target transforms
    const target = useMemo(() => {
        if (!Object.values(DISPLAY_MODES).includes(displayCode)) {
            console.warn(`Invalid displayCode: ${displayCode}. Falling back to default.`);
        }
        switch (displayCode) {
            case DISPLAY_MODES.CENTRE:
                return {
                    position: [-1.4, 1.5, distanceFromCard],
                    rotation: [0, 0, 0],
                    color: "#11234A"
                }
            case DISPLAY_MODES.RIGHT:
                return {
                    position: [1.85, 0, distanceFromCard],
                    rotation: [0, 0, -Math.PI / 2],
                    color: "#9ca4b2"
                }
            default:
                return {
                    position: [-1.85, 0, distanceFromCard],
                    rotation: [0, 0, Math.PI / 2],
                    color: "#9ca4b2"
                }
        }
    }, [displayCode, distanceFromCard])

    // spring for smooth transitions
    const props = useSpring({
        to: { color: target.color },
        config: SPRING_CONFIG,
    })

    return (
        <a.group position={target.position} rotation={target.rotation}>
            <CardTitleText
                color={props.color}
                font={font} maxWidth={maxWidth} anchorX={anchorX}
                textAlign={textAlign} fontSize={fontSize}
                lineHeight={lineHeight} anchorY={anchorY} >
                {title}
            </CardTitleText>
        </a.group>
    )
}