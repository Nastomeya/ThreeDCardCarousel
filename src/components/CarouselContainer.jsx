import { useState, useEffect } from 'react';
import CardCarousel from './CardCarousel';
import DotCarousel from './DotCarousel';
import SliderArrows from './SliderArrows';
import CarouselText from './CarouselText';

const btnOffsetY = 0.35
const autoplayDelay = 6500; // Seconds between slides
const resumeDelay = 1000;// Resume autoplay after 1 seconds of inactivity

const CarouselContainer = ({ datas, isAutoPlaying = true }) => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(datas.length / 2));
    const [autoPlayActive, setAutoPlayActive] = useState(isAutoPlaying);

    // Auto-increment function
    const goToNext = () => { setCurrentIndex(prevIndex => (prevIndex + 1) % datas.length); };

    // Handle manual interactions (pause autoplay temporarily)
    const handleCardClick = (index) => {
        setCurrentIndex(index);
        setAutoPlayActive(false);

        setTimeout(() => {
            setAutoPlayActive(true);
        }, resumeDelay);
    };

    // Sync with parent component's autoplay state
    useEffect(() => { setAutoPlayActive(isAutoPlaying); }, [isAutoPlaying]);

    // Autoplay effect
    useEffect(() => {
        if (!autoPlayActive) return;

        const interval = setInterval(goToNext, autoplayDelay);
        return () => clearInterval(interval);
    }, [autoPlayActive, datas.length]);

    return (
        <>
            <CarouselText />
            <CardCarousel
                datas={datas}
                onCardClick={handleCardClick}
                dotClickedIndex={currentIndex}
            />
            <DotCarousel
                datas={datas}
                cardClickedIndex={currentIndex}
                onDotClick={handleCardClick}
                offsetY={btnOffsetY}
            />
            <SliderArrows
                currentIndex={currentIndex}
                onBtnClick={handleCardClick}
                totalSlides={datas.length}
                offsetY={btnOffsetY}
            />
        </>
    );
};

export default CarouselContainer;