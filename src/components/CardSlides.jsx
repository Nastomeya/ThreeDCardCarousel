import Card from './Card'
import { useTexture } from "@react-three/drei";
import { useState } from 'react'
import { useSpring, animated } from '@react-spring/three'

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

    const [targetIdx, setCenterIdx] = useState(Math.floor(cards.length / 2))

    // Function to find the shortest path between current and target
    const getShortestPath = (current, target, total) => {
        const direct = target - current
        const wrapForward = direct + total
        const wrapBackward = direct - total

        // Choose the path with smallest absolute value
        if (Math.abs(direct) <= Math.abs(wrapForward) && Math.abs(direct) <= Math.abs(wrapBackward)) {
            return target
        } else if (Math.abs(wrapForward) <= Math.abs(wrapBackward)) {
            return current + wrapForward
        } else {
            return current + wrapBackward
        }
    }
    // const getShortestPath = (current, target, total) => {
    //     // Find the equivalent target position closest to current
    //     const currentMod = ((current % total) + total) % total
    //     const targetMod = ((target % total) + total) % total

    //     // Calculate possible targets
    //     const targets = [
    //         current + (targetMod - currentMod),
    //         current + (targetMod - currentMod + total),
    //         current + (targetMod - currentMod - total)
    //     ]

    //     // Return the target with minimum distance
    //     return targets.reduce((closest, t) =>
    //         Math.abs(t - current) < Math.abs(closest - current) ? t : closest
    //     )
    // }

    // Spring animation for the center index
    const { centerIdx } = useSpring({
        centerIdx: targetIdx,
        config: {
            tension: 120,
            friction: 20,
            precision: 0.001
        }
    })

    return (
        <>
            {cards.map((card, idx) => {
                return (
                    <animated.group
                        key={idx}
                        position={centerIdx.to(center => {
                            const offset = getWrappedOffset(idx, center, cards.length)
                            const theta = offset * angleStep
                            const positionSpread = 1 + (Math.abs(offset) * 0.1)
                            const baseX = Math.sin(theta) * radius
                            const x = baseX * positionSpread
                            // const x = Math.sin(theta * positionSpread) * radius
                            const z = Math.cos(theta) * radius - radius - Math.abs(offset) * maxZOffset
                            return [x, 0, z]
                        })}
                        rotation={centerIdx.to(center => {
                            const offset = getWrappedOffset(idx, center, cards.length)
                            const theta = offset * angleStep
                            const rotationScale = 1 + (3 / (Math.abs(offset) + 0.1))
                            const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta * rotationScale))
                            return [0, rotationY, 0]
                        })}
                        scale={centerIdx.to(center => {
                            const offset = getWrappedOffset(idx, center, cards.length)
                            const absOffset = Math.abs(offset)
                            const scaleFactor = Math.exp(-absOffset * 1.2)
                            return 1 + (0.2 * scaleFactor)
                        })}
                    >
                        <Card
                            studioLogo={studioLogos[idx]}
                            gameImage={gameImages[idx]}
                            gameTitle={card.gameTitle}
                            dateText={card.dateText}
                            onClick={() => {
                                // setCenterIdx(idx)
                                // const currentCenter = Math.round(centerIdx.get())
                                // const normalizedCurrent = ((currentCenter % cards.length) + cards.length) % cards.length
                                // const shortestTarget = getShortestPath(normalizedCurrent, idx, cards.length)
                                const currentCenter = centerIdx.get()
                                const shortestTarget = getShortestPath(currentCenter, idx, cards.length)
                                setCenterIdx(shortestTarget)
                            }}
                        />
                    </animated.group>
                )
            })}
        </>
    )
}

export default CardSlides