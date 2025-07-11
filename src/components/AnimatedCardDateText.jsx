import { a, useSpring } from '@react-spring/three'
import { CardDateText as BaseCardDateText } from './CardDateText'
import { useMemo } from 'react';
import { DISPLAY_MODES } from './DisplayModes'

const CardDateText = a(BaseCardDateText)
const SPRING_CONFIG = {
    mass: 3,
    tension: 120,
    friction: 120,
    precision: 0.001,
};

export function AnimatedCardDateText({ displayCode, distanceFromCard, dateText }) {

    // compute target transforms
    const target = useMemo(() => {
        if (!Object.values(DISPLAY_MODES).includes(displayCode)) {
            console.warn(`Invalid displayCode: ${displayCode}. Falling back to default.`);
        }
        switch (displayCode) {
            case DISPLAY_MODES.CENTRE:
                return {
                    position: [1.4, 0.8, distanceFromCard],
                    rotation: [0, 0, 0],
                    color: "#11234A"
                }
            case DISPLAY_MODES.RIGHT:
                return {
                    position: [1.53, -1.5, distanceFromCard],
                    rotation: [0, 0, -Math.PI / 2],
                    color: "#9ca4b2"
                }
            default:
                return {
                    position: [-1.53, 1.5, distanceFromCard],
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
            <CardDateText displayCode={displayCode} color={props.color} >{dateText} </CardDateText>
        </a.group>
    )
}