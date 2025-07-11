import { a, useSpring } from '@react-spring/three'
import { CardBoard as BaseCardBoard } from './CardBoard'

const CardBoard = a(BaseCardBoard)
const DISPLAY_MODES = {
    CENTRE: 1,
    RIGHT: 2,
    LEFT: 0,
};

const SPRING_CONFIG = {
    tension: 150,
    friction: 25,
    clamp: true,
    precision: 0.0001
};

export function AnimatedCardBoard({ displayCode }) {

    const isCentre = displayCode === DISPLAY_MODES.CENTRE

    // Define both states clearly
    const centreState = {
        colors: ['white', '#3f4b6d', '#2a3a65', '#9ca4b2'],
        stops: [0, 0.45, 0.65, 1]
    }

    const sideState = {
        colors: ['#3f4b6d', '#606672', '#606672', '#3f4b6d'],
        stops: [0, 0.25, 0.65, 1]
    }

    // spring for smooth transitions
    const props = useSpring({
        from: isCentre ? centreState : sideState,
        to: isCentre ? centreState : sideState,
        config: SPRING_CONFIG
    })

    return (
        <a.group>
            <CardBoard isShowTime={isCentre} colors={props.colors} stops={props.stops} />
        </a.group>
    )
}