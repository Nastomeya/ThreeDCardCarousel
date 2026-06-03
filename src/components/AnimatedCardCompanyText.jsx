import { a, useSpring } from '@react-spring/three'
import { useTitleText as BaseText } from './useTitleText'
import { useMemo } from 'react';
import { DISPLAY_MODES } from './DisplayModes'
import montserratFont from '../assets/fonts/subset-Montserrat-Medium.ttf';

const CardCompanyText = a(BaseText)
const SPRING_CONFIG = {
    mass: 3,
    tension: 120,
    friction: 120,
    precision: 0.001,
};
const SIDE_POS_CONFIG = {
    x: 1.7,
    y: 1.5,
}
function getTextConfig(displayCode) {
    return {
        font: montserratFont,
        maxWidth: 1.5,        
        textAlign: displayCode === 1 ? "right" : "center",
        //textAlign: "center",
        fontSize: 0.12,
        anchorX: "right",
        anchorY: "top",
        lineHeight: 1.22,
    }
}
export function AnimatedCardCompanyText({ displayCode, distanceFromCard, company }) {
    const { font, maxWidth, anchorX, textAlign, fontSize, lineHeight, anchorY } = getTextConfig(displayCode)

    // compute target transforms
    const target = useMemo(() => {
        if (!Object.values(DISPLAY_MODES).includes(displayCode)) {
            console.warn(`Invalid displayCode: ${displayCode}. Falling back to default.`);
        }
        switch (displayCode) {
            case DISPLAY_MODES.CENTRE:
                return {
                    position: [1.7, 0.8, distanceFromCard],
                    rotation: [0, 0, 0],
                    color: "#11234A"
                }
            case DISPLAY_MODES.RIGHT:
                return {
                    position: [SIDE_POS_CONFIG.x, -SIDE_POS_CONFIG.y, distanceFromCard],
                    rotation: [0, 0, -Math.PI / 2],
                    color: "#9ca4b2"
                }
            default:
                return {
                    position: [-SIDE_POS_CONFIG.x, SIDE_POS_CONFIG.y, distanceFromCard],
                    rotation: [0, 0, Math.PI / 2],
                    color: "#9ca4b2"
                }
        }
    }, [displayCode, distanceFromCard])

    // spring for smooth transitions
    const props = useSpring({
        to: { color: target.color },
        config: SPRING_CONFIG
    })

    return (
        <a.group position={target.position} rotation={target.rotation} >
            <CardCompanyText
                color={props.color}
                font={font} maxWidth={maxWidth} anchorX={anchorX}
                textAlign={textAlign} fontSize={fontSize}
                lineHeight={lineHeight} anchorY={anchorY} >
                {company}
            </CardCompanyText>
        </a.group>
    )
}
