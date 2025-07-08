import Card from './Card'
import { useTexture } from "@react-three/drei";
import { useState } from 'react'

const cards = [
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "MASS EFFECT: LEGENDARY EDITION",
        dateText: "13 May 2025"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "LAST TIDE",
        dateText: "06 Oct 2016"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "LAST TIDE XX",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "War 2",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "War 1",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "War 3",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "War 4",
        dateText: "06 Oct 2013"
    },
]

function getWrappedOffset(idx, centerIdx, total) {
    let offset = idx - centerIdx
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    return offset
}

const CardSlides = () => {
    const studioLogos = useTexture(cards.map(c => c.studioLogo))
    const gameImages = useTexture(cards.map(c => c.gameImage))

    const radius = 12
    const angleStep = 0.1 // radians, ~16°//0.13
    const maxAngle = 0.4
    const maxZOffset = 1  // How much the outer cards recede

    const [centerIdx, setCenterIdx] = useState(Math.floor(cards.length / 2))

    return (
        <>
            {/* <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial color="red" />
            </mesh> */}
            {cards.map((card, idx) => {
                const offset = getWrappedOffset(idx, centerIdx, cards.length)

                const theta = offset * angleStep

                const baseX = Math.sin(theta) * radius
                const spreadMultiplier = 1 + (Math.abs(offset) * 0.1) // Adjust 0.2 to control spread
                const x = baseX * spreadMultiplier
                //const x = Math.sin(theta) * radius

                // Fixed z-position calculation for symmetric behavior
                const z = Math.cos(theta) * radius - radius - Math.abs(offset) * maxZOffset

                // More gradual increase toward center
                const rotationMultiplier = (2 / (Math.abs(offset) - 1))
                const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta * rotationMultiplier))
                // const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta))

                const scale = offset === 0 ? 1.08 : 1

                return (
                    <Card
                        key={idx}
                        studioLogo={studioLogos[idx]}
                        gameImage={gameImages[idx]}
                        gameTitle={card.gameTitle}
                        dateText={card.dateText}
                        position={[x, 0, z]}
                        rotation={[0, rotationY, 0]}
                        scale={scale}
                        onClick={() => setCenterIdx(idx)}
                    />
                )
            })}
        </>
    )
}

export default CardSlides