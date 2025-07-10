import Card from './Card'
import { useTexture } from "@react-three/drei";
import { useState } from 'react'
import { useSpring, animated } from '@react-spring/three'

const cards = [
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 01",
        dateText: "06 Oct 2016"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 02",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 03",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "MASS EFFECT: LEGENDARY EDITION",
        dateText: "13 May 2025"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 05",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 06",
        dateText: "06 Oct 2013"
    },
    {
        studioLogo: '/StudioImages/BlindSqurrelGames/Logo.png',
        gameImage: '/StudioImages/BlindSqurrelGames/GameImage.png',
        gameTitle: "Number 07",
        dateText: "06 Oct 2013"
    }
]

// Function to find the shortest path between current and target
function getShortestPath(_currentIdx, _clickedIdx, totalCount) {
    const normalisedDirect = (_clickedIdx - (_currentIdx) % totalCount) % (totalCount)
    const wrapForward = normalisedDirect + totalCount
    const wrapBackward = normalisedDirect - totalCount
    let minDelta = normalisedDirect
    const isForward = Math.abs(wrapForward) < Math.abs(minDelta)
    const isBackward = Math.abs(wrapBackward) < Math.abs(minDelta)
    if (isForward) {
        minDelta = wrapForward
    }
    else if (isBackward) {
        minDelta = wrapBackward
    }
    return _currentIdx + minDelta
}
const CardSlides = () => {
    const studioLogos = useTexture(cards.map(c => c.studioLogo))
    const gameImages = useTexture(cards.map(c => c.gameImage))

    const radius = 12
    const angleStep = 0.1 // radians, ~16°//0.13
    const maxAngle = 0.4
    const maxZOffset = 1  // How much the outer cards recede

    const totalCount = cards.length;
    const halfCount = totalCount / 2

    const [targetCenterIdx, setCenterIdx] = useState(Math.floor(totalCount / 2))

    function getWrappedOffset(_clickedIdx, _center) {
        const normalizedCenter = ((_center % totalCount) + totalCount) % totalCount;
        let offset = _clickedIdx - normalizedCenter
        if (offset > halfCount) //3.5
        {
            offset -= totalCount
        }
        else if (offset < -halfCount) {
            offset += totalCount
        }
        return offset;
    }

    // Spring animation for the center index
    const { centerIdx } = useSpring({
        centerIdx: targetCenterIdx,
        config: {
            tension: 120,
            friction: 20,
            precision: 0.001
        }
        // onStart: () => console.log("onStart" + targetCenterIdx),//1
        // onChange: () => console.log("onChange"),//2
        // onRest: () => console.log("onRest" + targetCenterIdx)//3
    })
    return (
        <>
            {cards.map((card, clickedIdx) => {
                return (
                    <animated.group
                        key={clickedIdx}
                        position={centerIdx.to(center => {
                            const offset = getWrappedOffset(clickedIdx, center)
                            const theta = offset * angleStep
                            const positionSpread = 1 + (Math.abs(offset) * 0.1)
                            const baseX = Math.sin(theta) * radius
                            const x = baseX * positionSpread
                            const z = Math.cos(theta) * radius - radius - Math.abs(offset) * maxZOffset
                            return [x, 0, z]
                        })}
                        rotation={centerIdx.to(center => {
                            const offset = getWrappedOffset(clickedIdx, center)
                            const theta = offset * angleStep
                            const rotationScale = 1 + (3 / (Math.abs(offset) + 0.1))
                            const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta * rotationScale))
                            return [0, rotationY, 0]
                        })}
                        scale={centerIdx.to(center => {
                            const offset = getWrappedOffset(clickedIdx, center)
                            const absOffset = Math.abs(offset)
                            const scaleFactor = Math.exp(-absOffset * 1.2)
                            return 1 + (0.2 * scaleFactor)
                        })}
                    >
                        <Card
                            studioLogo={studioLogos[clickedIdx]}
                            gameImage={gameImages[clickedIdx]}
                            gameTitle={card.gameTitle}
                            dateText={card.dateText}
                            onClick={() => {
                                const shortestIndex = getShortestPath(targetCenterIdx, clickedIdx, totalCount)
                                setCenterIdx(shortestIndex)
                            }}
                        />
                    </animated.group>
                )
            })}
        </>
    )
}

export default CardSlides