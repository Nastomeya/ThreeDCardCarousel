import { a, useSpring } from '@react-spring/three'
import { SubCardImage as BaseSubCardImage } from './SubCardImage'
import { DISPLAY_MODES } from './DisplayModes'

const SubCardImage = a(BaseSubCardImage)

const SPRING_CONFIG = {
    mass: 5,
    tension: 70,
    friction: 80,
    precision: 0.001,
};

export function AnimatedSubCardImage({ displayCode, position = [0, 0, 0], gameImage }) {

    const isCentre = displayCode === DISPLAY_MODES.CENTRE
    // animate only opacity
    const props = useSpring({
        to: { opacity: isCentre ? 1 : 0, },
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
                opacity={props.opacity}
            />
        </a.group>
    )
}