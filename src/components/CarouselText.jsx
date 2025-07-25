import { useTitleText as BaseText } from './useTitleText';
import { a } from '@react-spring/three'
import montserratFont from '../assets/fonts/subset-Montserrat-Bold.ttf';
import { useEffect, useState } from 'react'

const TitleText = a(BaseText)

const CarouselText = ({ }) => {

    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch('/api-data/siteInfo.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch JSON');
                return res.json();
            })
            .then((data) => setTitle(data.title))
            .catch((err) => {
                console.error('Error loading studios data:', err);
                setTitle(""); // fallback to empty if error
            });
    }, []);

    const textConfig = {
        font: montserratFont,
        maxWidth: 5,
        textAlign: "center",
        fontSize: 0.235,
        anchorX: "center",
        anchorY: "top",
        lineHeight: 1.22,
        position: [0, 2.55, 0],
        color: "white"
    };

    return (
        <TitleText
            font={textConfig.font}
            maxWidth={textConfig.maxWidth}
            textAlign={textConfig.textAlign}
            fontSize={textConfig.fontSize}
            anchorX={textConfig.anchorX}
            anchorY={textConfig.anchorY}
            lineHeight={textConfig.lineHeight}
            position={textConfig.position}
            color={textConfig.color}
        >
            {title}
        </TitleText>
    );
}
export default CarouselText