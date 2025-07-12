import * as THREE from 'three';
import { useHoverEffect } from './useHoverEffect'
import { useLoader } from '@react-three/fiber'

const folderName = "/BtnImages";

useLoader.preload(THREE.TextureLoader, folderName + '/LeftArrow.png')
useLoader.preload(THREE.TextureLoader, folderName + '/LeftHover.png')
useLoader.preload(THREE.TextureLoader, folderName + '/RightArrow.png')
useLoader.preload(THREE.TextureLoader, folderName + '/RightHover.png')

function useBtnTextures(isRightArrow) {
    const arrowBtn = useLoader(THREE.TextureLoader, folderName + (isRightArrow ? '/RightArrow.png' : '/LeftArrow.png'))
    const arrowHoverBtn = useLoader(THREE.TextureLoader, folderName + (isRightArrow ? '/RightHover.png' : '/LeftHover.png'))
    return { arrowBtn, arrowHoverBtn }
}

const SliderArrowBtn = ({ id, radius, segments, onClick }) => {

    const isRightArrow = id % 2 === 1;
    const { arrowBtn, arrowHoverBtn } = useBtnTextures(isRightArrow)
    const { isHovered, handlePointerOver, handlePointerOut } = useHoverEffect()

    const hoverStrokeColor = 'red'



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
                    // color={isHovered ? hoverStrokeColor : 'white'} // Highlight center dot
                    metalness={0.5}
                    roughness={0.5}
                    side={THREE.DoubleSide} // Ensure circle is visible from both sides
                />
            </mesh>
        </group>
    );
};

export default SliderArrowBtn;