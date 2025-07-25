import * as THREE from 'three';
import { useHoverEffect } from './useHoverEffect'
import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import leftArrow from "../assets/images/btnImages/LeftArrow.png";
import leftHover from "../assets/images/btnImages/LeftHover.png";
import rightArrow from "../assets/images/btnImages/RightArrow.png";
import rightHover from "../assets/images/btnImages/RightHover.png";

function useBtnTextures(isRightArrow) {
    const arrowBtn = useLoader(THREE.TextureLoader, (isRightArrow ? rightArrow : leftArrow))
    const arrowHoverBtn = useLoader(THREE.TextureLoader, (isRightArrow ? rightHover : leftHover))
    return { arrowBtn, arrowHoverBtn }
}

const SliderArrowBtn = ({ id, radius, segments, onClick }) => {
    useEffect(() => {
        useLoader.preload(THREE.TextureLoader, leftArrow)
        useLoader.preload(THREE.TextureLoader, rightArrow)
        useLoader.preload(THREE.TextureLoader, rightHover)
        useLoader.preload(THREE.TextureLoader, leftHover)
    }, []);

    const isRightArrow = id % 2 === 1;
    const { arrowBtn, arrowHoverBtn } = useBtnTextures(isRightArrow)
    const { isHovered, handlePointerOver, handlePointerOut } = useHoverEffect()
    return (
        <group onClick={e => {
            e.stopPropagation();
            onClick?.();
        }}>
            <mesh
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <circleGeometry args={[radius, segments]} />
                <meshLambertMaterial
                    map={isHovered ? arrowHoverBtn : arrowBtn}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default SliderArrowBtn;