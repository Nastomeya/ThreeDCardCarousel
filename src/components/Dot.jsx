import * as THREE from 'three';

const Dot = ({ isDisplayed }) => {
    return (
        <group>
            <mesh>
                <circleGeometry args={[0.2, 32]} /> {/* 2D circle, radius=0.2, 32 segments */}
                <meshStandardMaterial
                    color={isDisplayed ? 'white' : 'gray'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default Dot;