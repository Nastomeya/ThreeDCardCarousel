import { a, useSpring } from '@react-spring/three'
import { CardBoard as BaseCardBoard } from './CardBoard'

const CardBoard = a(BaseCardBoard)
const DISPLAY_MODES = {
    CENTRE: 1,
    RIGHT: 2,
    LEFT: 0,
};

const SPRING_CONFIG = {
    tension: 50,
    friction: 75,
    clamp: true,
    precision: 0.0001
};

const interpolateColor = (color1, color2, factor) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 }
    }

    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)

    // Interpolate each channel
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor)
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor)
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor)

    return `rgb(${r}, ${g}, ${b})`
}

export function AnimatedCardBoard({ displayCode }) {

    const isCentre = displayCode === DISPLAY_MODES.CENTRE
    const props = useSpring({
        progress: isCentre ? 1 : 0,
        config: SPRING_CONFIG
    })
    return (
        <a.group>
            <CardBoard
                isShowTime={isCentre}
                colors={props.progress.to(t => [
                    interpolateColor('#3f4b6d', '#ffffff', t),
                    interpolateColor('#606672', '#3f4b6d', t),
                    interpolateColor('#606672', '#2a3a65', t),
                    interpolateColor('#3f4b6d', '#9ca4b2', t)
                ])}
                stops={props.progress.to(t => [
                    0,
                    0.25 + (0.45 - 0.25) * t,
                    0.65,
                    1
                ])}
                rotation={props.progress.to(t => [
                    Math.PI / 2 + (0 - Math.PI / 2) * t// Y-axis: 0 to π/2
                ])}
            />
        </a.group>
    )
}