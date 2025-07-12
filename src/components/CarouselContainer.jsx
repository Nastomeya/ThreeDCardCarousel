import { useState } from 'react';
import CardCarousel from './CardCarousel';
import DotCarousel from './DotCarousel';

const CarouselContainer = ({ datas }) => {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(datas.length / 2));

    const handleCardClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <CardCarousel
                datas={datas}
                onCardClick={handleCardClick}
                dotClickedIndex={currentIndex}
            />
            <DotCarousel
                datas={datas}
                cardClickedIndex={currentIndex}
                onDotClick={handleCardClick}
            />
        </>
    );
};

export default CarouselContainer;