import Card from './Card'
import { useTexture } from "@react-three/drei";
import { useState } from 'react'
import { useSpring, animated } from '@react-spring/three'

const initialCards = [
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
    },
]

// Function to reorder array so clicked item becomes center
function reorderArray(arr, clickedIndex) {
    const totalCards = arr.length
    const centerIndex = Math.floor(totalCards / 2) // This will be 3 for 7 cards

    // Calculate how many positions to rotate
    const rotateAmount = clickedIndex - centerIndex

    // Create new array with rotated order
    const newArray = []
    for (let i = 0; i < totalCards; i++) {
        const originalIndex = (i + rotateAmount + totalCards) % totalCards
        newArray[i] = arr[originalIndex]
    }

    return newArray
}
function getWrappedOffset(idx, centerIdx, total) {
    let offset = idx - centerIdx
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    return offset
}
// // Function to find the shortest path between current and target
// function getShortestPath(current, target, total) {
//     const direct = target - current
//     const wrapForward = direct + total
//     const wrapBackward = direct - total
//     const minDelta = [direct, wrapForward, wrapBackward]
//         .reduce((a, b) => Math.abs(b) < Math.abs(a) ? b : a)
//     return current + minDelta
// }



const CardSlides = () => {
    const [cards, setCards] = useState(initialCards)
    const studioLogos = useTexture(initialCards.map(c => c.studioLogo))
    const gameImages = useTexture(initialCards.map(c => c.gameImage))

    const radius = 12
    const angleStep = 0.1 // radians, ~16°//0.13
    const maxAngle = 0.4
    const maxZOffset = 1  // How much the outer cards recede
    const totalCards = cards.length;
    const centerIndex = Math.floor(totalCards / 2) // Always 3 for 7 cards

    const [targetIndex, setTargetIndex] = useState(centerIndex)

    // Spring animation for smooth transitions
    const { animatedCenter } = useSpring({
        animatedCenter: targetIndex,
        config: {
            tension: 120,
            friction: 20,
            precision: 0.001
        },
        onRest: () => {
            // Once animation is complete, reorder the actual array
            if (targetIndex !== centerIndex) {
                console.log('Animation complete, reordering array...')
                const newCards = reorderArray(cards, targetIndex)
                setCards(newCards)
                setTargetIndex(centerIndex) // Reset target back to center position
            }
        }
    })

    const handleCardClick = (clickedIndex) => {
        if (clickedIndex === centerIndex) return // Already in center

        console.log('Card clicked:', clickedIndex, 'Starting animation to center')
        setTargetIndex(clickedIndex)
    }

    return (
        <>
            {cards.map((card, idx) => {
                return (
                    <animated.group
                        // key={`${card.gameTitle}-${idx}`} // Use title + index for key
                        key={idx}
                        position={animatedCenter.to(center => {
                            // const offset = idx - center
                            const offset = getWrappedOffset(idx, center, totalCards)
                            const theta = offset * angleStep
                            const positionSpread = 1 + (Math.abs(offset) * 0.1)
                            const baseX = Math.sin(theta) * radius
                            const x = baseX * positionSpread
                            const z = Math.cos(theta) * radius - radius - Math.abs(offset) * maxZOffset
                            return [x, 0, z]
                        })}
                        rotation={animatedCenter.to(center => {
                            // const offset = idx - center
                            const offset = getWrappedOffset(idx, center, totalCards)
                            const theta = offset * angleStep
                            const rotationScale = 1 + (3 / (Math.abs(offset) + 0.1))
                            const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta * rotationScale))
                            return [0, rotationY, 0]
                        })}
                        scale={animatedCenter.to(center => {
                            // const offset = idx - center
                            const offset = getWrappedOffset(idx, center, totalCards)
                            const absOffset = Math.abs(offset)
                            const scaleFactor = Math.exp(-absOffset * 1.2)
                            const scale = 1 + (0.2 * scaleFactor)
                            return scale
                        })}
                    >
                        <Card
                            studioLogo={studioLogos[idx]}
                            gameImage={gameImages[idx]}
                            gameTitle={card.gameTitle}
                            dateText={card.dateText}
                            onClick={() => handleCardClick(idx)}
                        />
                    </animated.group>
                )
            })}

            {/* {initialCards.map((card, idx) => {
                return (
                    <animated.group
                        key={idx} // Use title + index for key
                        position={animatedCenter.to(center => {
                            const offset = getWrappedOffset(idx, center, totalCards)
                            const theta = offset * angleStep
                            const positionSpread = 1 + (Math.abs(offset) * 0.1)
                            const baseX = Math.sin(theta) * radius
                            const x = baseX * positionSpread
                            const z = Math.cos(theta) * radius - radius - Math.abs(offset) * maxZOffset
                            return [x, 0, z]
                        })}
                        rotation={animatedCenter.to(center => {
                            const offset = getWrappedOffset(idx, center, totalCards)
                            const theta = offset * angleStep
                            const rotationScale = 1 + (3 / (Math.abs(offset) + 0.1))
                            const rotationY = Math.max(-maxAngle, Math.min(maxAngle, -theta * rotationScale))
                            return [0, rotationY, 0]
                        })}
                        scale={animatedCenter.to(center => {
                            const offset = getWrappedOffset(idx, center, totalCards)
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
                                const currInt = animatedCenter.get()//Math.round(animatedCenter.get())
                                console.log('Card clicked:', idx, 'Current center:', currInt)
                                const raw = getShortestPath(currInt, idx,)
                                const wrapped = ((raw % totalCards) + totalCards) % totalCards
                                handleCardClick(idx)
                                console.log('Moving to:', raw)
                            }}
                        />
                    </animated.group>
                )
            })} */}
        </>
    )
}

export default CardSlides