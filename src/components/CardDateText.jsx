import { Text } from '@react-three/drei'

export function CardDateText({
    displayCode,
    color,
    
    font = "/Fonts/Montserrat-Medium.ttf",
    fontSize = 0.1,
    // color = (displayCode === 1 ? "#11234A" : "#9ca4b2"),
    textAlign = (displayCode === 1 ? "right" : "center"),
    position = [0, 0, 0],
    lineHeight = 1.22,
    maxWidth = 0.7,
    anchorX = "right",
    anchorY = "top",
    ...rest
}) {
    return (
        <Text
            font={font}
            fontSize={fontSize}
            color={color}
            position={position}
            lineHeight={lineHeight}
            maxWidth={maxWidth}
            anchorX={anchorX}
            anchorY={anchorY}
            textAlign={textAlign}
            {...rest}
        />
    )
}