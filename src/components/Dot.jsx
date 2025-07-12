import * as THREE from 'three';

const Dot = ({ id, currentIndex, radius, segments, onClick }) => {
    const isDisplayed = id === currentIndex;
    return (
        <group onClick={e => {
            e.stopPropagation();
            onClick?.();
        }}>
            <mesh>
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