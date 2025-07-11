import { a, useSpring } from '@react-spring/three'
import { SubCardImage as BaseSubCardImage } from './SubCardImage'

const SubCardImage = a(BaseSubCardImage)

const DISPLAY_MODES = {
    CENTRE: 1,
    RIGHT: 2,
    LEFT: 0,
};

const SPRING_CONFIG = {
    mass: 5,
    tension: 120,
    friction: 120,
    precision: 0.001,
};

export function AnimatedSubCardImage({ displayCode, position = [0, 0, 0], gameImage }) {

    const isCentre = displayCode === DISPLAY_MODES.CENTRE
    // animate only opacity
    const { opacity } = useSpring({
        to: { opacity: isCentre ? 1 : 0 },
        config: SPRING_CONFIG,
    })

    return (
        <a.group position={position} >
            <SubCardImage
                // always pass the same texture instance
                texture={gameImage}
                // these are plain numbers, not [number]!
                width={2.8}
                height={2}
                radius={0.1}
                // animated value
                opacity={opacity}
            />
        </a.group>
    )
}