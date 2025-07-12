import * as THREE from 'three';
import { useHoverEffect } from './useHoverEffect'

const Dot = ({ id, currentIndex, radius, segments, onClick }) => {

    const isDisplayed = id === currentIndex;
    const { isHovered, handlePointerOver, handlePointerOut } = useHoverEffect()
    const hoverStrokeColor = '#9ca4b2'//'grey'

    return (
        <group onClick={e => {
            e.stopPropagation();
            onClick?.();
        }}>
            <mesh
                onPointerOver={isDisplayed ? handlePointerOut : handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <circleGeometry args={[radius, segments]} />
                <meshStandardMaterial
                    color={isDisplayed ? 'white' : isHovered ? hoverStrokeColor : '#3f4d6b'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default Dot;