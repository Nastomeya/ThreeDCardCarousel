import * as THREE from 'three';
import { useHoverEffect } from './useHoverEffect'

const SliderArrowBtn = ({ id, radius, segments, onClick }) => {

    const isRightArrow = id % 2 === 0;
    const hoverEffect = useHoverEffect();
    const hoverStrokeColor = 'red'

    return (
        <group onClick={e => {
            e.stopPropagation();
            onClick?.();
        }}>
            <mesh
                onPointerOver={hoverEffect.handlePointerOver}
                onPointerOut={hoverEffect.handlePointerOut}
            >
                <circleGeometry args={[radius, segments]} />
                <meshLambertMaterial
                    color={hoverEffect.isHovered ? hoverStrokeColor : 'white'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default SliderArrowBtn;