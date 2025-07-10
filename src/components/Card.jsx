import { CardTitleText } from './CardTitleText'
import { CardDateText } from './CardDateText'
import { CircleWithOutline } from './CircleWithOutline'
import { CardBoard } from './CardBoard'
import { SubCardImage } from './SubCardImage'
// import { useEffect } from 'react'

const Card = ({ studioLogo, gameImage, gameTitle, dateText, position = [0, 0, 0],
    rotation = [0, 0, 0], onClick, displayCode }) => {

    const logoRadius = 0.35
    const distanceFromCard = 0.055;

    // useEffect(() => {
    //     console.log("isShowTimeCode = " + isShowTimeCode)
    // }, [isShowTimeCode])

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={e => {
                e.stopPropagation();
                onClick?.(); // Call your passed handler if present
            }}
            cursor="pointer"
        >
            <CardBoard isShowTime={displayCode === 1} />

            <CardTitleText
                displayCode={displayCode}
                position={displayCode === 1 ? [-1.4, 1.5, distanceFromCard] :
                    displayCode === 2 ?
                        [1.85, 0, distanceFromCard] : [-1.85, 0, distanceFromCard]}
                rotation={displayCode === 1 ? [0, 0, 0] : displayCode === 2 ? [0, 0, -1.57] : [0, 0, 1.57]}
            >{gameTitle}</CardTitleText>

            <CardDateText
                displayCode={displayCode}
                position={displayCode === 1 ? [1.4, 0.8, distanceFromCard] :
                    displayCode === 2 ?
                        [1.53, -1.5, distanceFromCard] : [-1.53, 1.5, distanceFromCard]}
                rotation={displayCode === 1 ? [0, 0, 0] : displayCode === 2 ? [0, 0, -1.57] : [0, 0, 1.57]}
            >{dateText}</CardDateText>

            {displayCode === 1 && (
                <>
                    <CircleWithOutline position={[1, 1.2, distanceFromCard]} radius={logoRadius} texture={studioLogo} outter={logoRadius + 0.02} />
                    <SubCardImage position={[0, -0.4, distanceFromCard]} texture={gameImage} width={2.8} height={2} radius={0.1} />
                </>
            )}
        </group>
    )
}
export default Card