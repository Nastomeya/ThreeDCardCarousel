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
                        [1.8, 1.58, distanceFromCard] : [-1.8, -1.58, distanceFromCard]}
                rotation={isShowTimeCode === 1 ? [0, 0, 0] : isShowTimeCode === 2 ? [0, 0, -1.57] : [0, 0, 1.57]}
                maxWidth={isShowTimeCode != 1 ? 3.2 : 2}
                color={isShowTimeCode === 1 ? "#11234A" : "#9ca4b2"}
                textAlign={isShowTimeCode === 1 ? "left" : "center"}
            >
                {gameTitle}
            </CardTitleText>
            <CardDateText position={[1.4, 0.8, distanceFromCard]}>{dateText}</CardDateText>

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