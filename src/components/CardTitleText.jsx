import { Text } from '@react-three/drei'

/**
 * Reusable 3D Title Text component for R3F
 *
 * @param {object} props
 * @param {string} props.children - The text to display
 * @param {string} [props.font="/Fonts/BebasNeue-Regular.ttf"] - Path to font file
 * @param {number} [props.fontSize=0.25] - Text size in scene units
 * @param {string} [props.color="#11234A"] - Text color
 * @param {Array} [props.position=[0, 0, 0]] - Scene position [x, y, z]
 * @param {number} [props.lineHeight=1.215] - Line height ratio
 * @param {number} [props.maxWidth=1.6] - Max width for wrapping
 * @param {string} [props.anchorX="left"] - Horizontal anchor
 * @param {string} [props.anchorY="top"] - Vertical anchor
 * @param {string} [props.textAlign="left"] - Line alignment ("left", "center", "right", "justify")
 */
export function CardTitleText({
    displayCode,
    color,
    
    font = "/Fonts/BebasNeue-Regular.ttf",
    maxWidth = (displayCode === 1 ? 2 : 3.2),
    anchorX = (displayCode === 1 ? "left" : "center"),
    textAlign = (displayCode === 1 ? "left" : "center"),
    fontSize = (displayCode === 1 ? 0.3 : 0.25),

    position = [0, 0, 0],
    rotation = [0, 0, 0],
    lineHeight = 1.215,
    anchorY = "top",
    ...rest
}) {
    return (
        <Text
            font={font}
            fontSize={fontSize}
            color={color}
            position={position}
            rotation={rotation}
            lineHeight={lineHeight}
            maxWidth={maxWidth}
            anchorX={anchorX}
            anchorY={anchorY}
            textAlign={textAlign}
            {...rest}
        />
    )
}