import * as THREE from 'three';
import { useHoverEffect } from './useHoverEffect'

const Dot = ({ id, currentIndex, radius, segments, onClick }) => {

    const isDisplayed = id === currentIndex;
    const hoverEffect = useHoverEffect();
    const hoverStrokeColor = 'grey'

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
                <meshStandardMaterial
                    color={isDisplayed ? 'white' : hoverEffect.isHovered ? hoverStrokeColor : '#3f4d6b'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default Dot;