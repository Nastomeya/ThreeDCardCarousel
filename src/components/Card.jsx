import { AnimatedCardTitleText } from './AnimatedCardTitleText'
import { AnimatedSubCardImage } from './AnimatedSubCardImage'
import { AnimatedCardBoard } from './AnimatedCardBoard'
import { AnimatedCardDateText } from './AnimatedCardDateText'
import { AnimatedCardCompanyText } from './AnimatedCardCompanyText'
import { LogoImageWithOutline } from './LogoImageWithOutline'
import { useEffect } from 'react'
import * as THREE from 'three'


const Card = ({ logo, website, image, title, company, date, position = [0, 0, 0], rotation = [0, 0, 0], onClick, displayCode }) => {

    const logoRadius = 0.35
    const distanceFromCard = 0.055;
    useEffect(() => {//this will avoid the brightern effet on the image after image has been loaded
        image.colorSpace = THREE.SRGBColorSpace
        logo.colorSpace = THREE.SRGBColorSpace
    }, [image, logo])

    return (
        <group
            position={position}
            rotation={rotation}
            onClick={e => {
                e.stopPropagation();
                onClick?.(); // Call your passed handler if present
            }}
        >
            <AnimatedCardBoard displayCode={displayCode} />

            <AnimatedCardTitleText
                displayCode={displayCode}
                distanceFromCard={distanceFromCard}
                title={title}
            />
            {company && (
                <AnimatedCardCompanyText
                    displayCode={displayCode}
                    distanceFromCard={distanceFromCard}
                    company={company}
                />
            )}
            <AnimatedCardDateText
                displayCode={displayCode}
                distanceFromCard={distanceFromCard}
                date={date}
            />

            <AnimatedSubCardImage
                displayCode={displayCode}
                position={[0, -0.4, distanceFromCard]}
                image={image}
            />

            {displayCode === 1 && (
                <>
                    <LogoImageWithOutline
                        position={[1, 1.2, distanceFromCard]} radius={logoRadius}
                        texture={logo} website={website} outter={logoRadius + 0.02}
                    />
                </>)}
        </group>
    )
}
export default Card