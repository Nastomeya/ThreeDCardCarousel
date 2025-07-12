import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const Dot = ({ id, currentIndex, radius, segments, onClick }) => {

    const isDisplayed = id === currentIndex;
    const { gl } = useThree();
    const handlePointerOver = () => { gl.domElement.style.cursor = isDisplayed ? 'auto' : 'pointer'; };
    const handlePointerOut = () => { gl.domElement.style.cursor = 'auto'; };

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
                <meshStandardMaterial
                    color={isDisplayed ? 'white' : '#3f4d6b'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default Dot;