import { CardTitleText } from './CardTitleText'
import { CardDateText } from './CardDateText'
import { CircleWithOutline } from './CircleWithOutline'
import { CardBoard } from './CardBoard'
import { SubCardImage } from './SubCardImage'
import { useEffect } from 'react'

const Card = ({ studioLogo, gameImage, gameTitle, dateText, position = [0, 0, 0],
    rotation = [0, 0, 0], onClick, isShowTimeCode }) => {

    const logoRadius = 0.35
    const distanceFromCard = 0.055;

    useEffect(() => {
        console.log("isShowTimeCode = " + isShowTimeCode)
    }, [isShowTimeCode])

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={e => {
                e.stopPropagation();
                onClick?.(); // Call your passed handler if present
                // console.log(e.index + "  : " + currenCardClicked);
            }}
            cursor="pointer"
        >
            <CardBoard isShowTime={isShowTimeCode === 1} />

            <CardTitleText
                position={isShowTimeCode === 1 ? [-1.4, 1.5, distanceFromCard] :
                    isShowTimeCode === 2 ?
                        [1.85, 0, distanceFromCard] : [-1.85, 0, distanceFromCard]}
                rotation={isShowTimeCode === 1 ? [0, 0, 0] : isShowTimeCode === 2 ? [0, 0, -1.57] : [0, 0, 1.57]}
                maxWidth={isShowTimeCode === 1 ? 2 : 3.2}
                color={isShowTimeCode === 1 ? "#11234A" : "#9ca4b2"}
                anchorX={isShowTimeCode === 1 ? "left" : "center"}
                textAlign={isShowTimeCode === 1 ? "left" : "center"}
                fontSize={isShowTimeCode === 1 ? 0.3 : 0.25}
            >{gameTitle}</CardTitleText>

            <CardDateText
                position={isShowTimeCode === 1 ? [1.4, 0.8, distanceFromCard] :
                    isShowTimeCode === 2 ?
                        [1.53, -1.5, distanceFromCard] : [-1.53, 1.5, distanceFromCard]}
                rotation={isShowTimeCode === 1 ? [0, 0, 0] : isShowTimeCode === 2 ? [0, 0, -1.57] : [0, 0, 1.57]}
                color={isShowTimeCode === 1 ? "#11234A" : "#9ca4b2"}
                textAlign={isShowTimeCode === 1 ? "right" : "center"}
            >{dateText}</CardDateText>

            {isShowTimeCode === 1 && (
                <>
                    <CircleWithOutline position={[1, 1.2, distanceFromCard]} radius={logoRadius} texture={studioLogo} outter={logoRadius + 0.02} />
                    <SubCardImage position={[0, -0.4, distanceFromCard]} texture={gameImage} width={2.8} height={2} radius={0.1} />
                </>
            )}
        </group>
    )
}
export default Card