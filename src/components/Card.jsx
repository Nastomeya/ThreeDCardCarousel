import { CardTitleText } from './CardTitleText'
import { CardDateText } from './CardDateText'
import { CircleWithOutline } from './CircleWithOutline'
import { CardBoard } from './CardBoard'
import { SubCardImage } from './SubCardImage'

const Card = ({ studioLogo, gameImage, gameTitle, dateText, position = [0, 0, 0], rotation, onClick }) => {
    const logoRadius = 0.35
    const distanceFromCard = 0.055;
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
            <CardBoard />
            <CardTitleText position={[-1.4, 1.45, distanceFromCard]}>{gameTitle}</CardTitleText>
            <CardDateText position={[1.4, 0.8, distanceFromCard]}>{dateText}</CardDateText>
            <CircleWithOutline position={[1, 1.2, distanceFromCard]} radius={logoRadius} texture={studioLogo} outter={logoRadius + 0.02} />
            <SubCardImage position={[0, -0.4, distanceFromCard]} texture={gameImage} width={2.8} height={2} radius={0.1} />
        </group>
    )
}
export default Card