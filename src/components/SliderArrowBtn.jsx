import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useCursor } from '@react-three/drei'
import { useState } from 'react'

const SliderArrowBtn = ({ id, radius, segments, onClick }) => {

    const isRightArrow = id % 2 === 0;
    const { gl } = useThree();
    const handlePointerOver = () => {
        gl.domElement.style.cursor = 'pointer';
        setHovered(true);
    };
    const handlePointerOut = () => {
        gl.domElement.style.cursor = 'auto';
        setHovered(false);
    };

    const hoverStrokeColor = 'red'
    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer', 'auto')

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
                    color={hovered ? hoverStrokeColor : 'white'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default SliderArrowBtn;