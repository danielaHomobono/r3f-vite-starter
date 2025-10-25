import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -7 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Hello");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Hello" : "Standing");
    }, 600);
  }, [section]);

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <Background />
      <motion.group
        position={[
          section === 0 ? 3.9072935059634513 : 1.9072935059634513,
          0.14400000000000002,
          0.681801948466054,
        ]} // move avatar to the right only in section 0
        scale={[1.8, 1.8, 1.8]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: 7,
            scaleY: 7,
            scaleZ: 8,
            y: -8,
            x: 3,
            z: 0,
            rotateY: -0.4,
            rotateX: 0,
            rotateZ: 0
          },
          1: {
            y: -viewport.height + 0.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          2: {
            x: -7,
            y: -viewport.height * 2.15 + 0.5,
            z: 1,
            rotateX: -0.3,
            rotateY: Math.PI / 2,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height * 3 + 0.4,
            x: 0.3,
            z: 8.5,
            rotateX: 0,
            rotateY: -0.5,
            rotateZ: 0,
          },
        }}
      >
        <Avatar animation={characterAnimation} section={section} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[0, section === 0 ? 0.5 : -4.5, -15]} // moved up by increasing y value only in section 0
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : section === 0 ? -0.5 : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 3]} intensity={0.4} />
        <Float>
          <mesh
            position={[1, section === 0 ? 1 : -1, -3]}
            scale={[2.5, 2.5, 2.5]}
          >
            {/* moved up by increasing y value only in section 0 */}
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"#87CEFA"} // Light sky blue
            />
          </mesh>
        </Float>
        <Float>
          <mesh
            scale={[6, 6, 6]}
            position={[2, section === 0 ? 4 : 2, -18]}
          >
            {/* moved up by increasing y value only in section 0 */}
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="#B0C4DE" // Light steel blue
            />
          </mesh>
        </Float>
        <Float>
          <mesh
            position={[-1, section === 0 ? 6 : 4, -6]}
            scale={[4, 4, 4]}
          >
            {/* moved up by increasing y value only in section 0 */}
            <sphereGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"#ADD8E6"} // Light blue
            />
          </mesh>
        </Float>
        <Float>
          <mesh
            position={[-3, section === 0 ? 4 : 2, -8]}
            scale={[2, 2, 2]}
          >
            {/* moved up by increasing y value only in section 0 */}
            <sphereGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"#87CEEB"} // Sky blue
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects />
    </>
  );
};
