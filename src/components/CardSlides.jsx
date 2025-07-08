import Card from './Card'
import { useTexture } from "@react-three/drei";

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


const CardSlides = () => {
    const studioLogos = useTexture(cards.map(c => c.studioLogo))
    const gameImages = useTexture(cards.map(c => c.gameImage))
    const radius = 3.5 // try 6-8 for nice curve
    const angleStep = 0.28 // radians, ~16°
    const centerIdx = Math.floor(cards.length / 2)
    const maxZOffset = 3  // tweak for how much the outer cards recede
    const zStep = maxZOffset / centerIdx * 0.5// so outermost card is at -maxZOffset
    return (
        <>
            {cards.map((card, idx) => {
                const offset = idx - centerIdx
                const theta = offset * angleStep
                const x = Math.sin(theta) * radius
                const z = -Math.abs(offset) * zStep//Math.cos(theta) * radius - radius
                const rotationY = -theta
                return (
                    <Card
                        key={idx}
                        studioLogo={studioLogos[idx]}
                        gameImage={gameImages[idx]}
                        gameTitle={card.gameTitle}
                        dateText={card.dateText}
                        position={[x, 0, z]}
                        rotation={[0, rotationY, 0]}
                        onClick={() => {
                            console.log("Clicked card:", card)
                        }}
                    />
                )
            })}
        </>
    )
}
export default CardSlides