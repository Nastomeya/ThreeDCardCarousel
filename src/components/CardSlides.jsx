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

    const [currentCenter, setCurrentCenter] = useState(centerIndex)
    // Spring animation for smooth transitions
    const { animatedCenter } = useSpring({
        animatedCenter: currentCenter,
        config: {
            tension: 120,
            friction: 20,
            precision: 0.001
        },
        onRest: () => {
            // Once animation is complete, reorder the actual array
            {
                console.log('Animation complete, reordering array...')
                const newCards = reorderArray(cards, currentCenter)
                setCards(newCards)
                setCurrentCenter(centerIndex) // Reset target back to center position
            }
        }
    })

    const handleCardClick = (clickedIndex) => {
        if (clickedIndex === centerIndex) return // Already in center

        console.log('Card clicked:', clickedIndex, 'Starting animation to center')
        setCurrentCenter(clickedIndex)
    }

    return (
        <>
            {cards.map((card, idx) => {
                return (
                    <animated.group
                        key={idx}
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
        </>
    )
}

export default CardSlides