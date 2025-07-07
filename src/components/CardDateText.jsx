import { Text } from '@react-three/drei'

export function CardDateText({
    children,
    font = "/Fonts/Montserrat-Medium.ttf",
    fontSize = 0.1,
    color = "#11234A",
    position = [0, 0, 0],
    lineHeight = 1.22,
    maxWidth = 0.7,
    anchorX = "right",
    anchorY = "top",
    textAlign = "right",
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
        >
            {children}
        </Text>
    )
}