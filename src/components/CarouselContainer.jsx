import { useState } from 'react';
import CardCarousel from './CardCarousel';
import DotCarousel from './DotCarousel';
import SliderArrows from './SliderArrows';
import CarouselText from './CarouselText';

const btnOffsetY = 0.4

const CarouselContainer = ({ datas }) => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(datas.length / 2));
    const handleCardClick = (index) => { setCurrentIndex(index); };

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