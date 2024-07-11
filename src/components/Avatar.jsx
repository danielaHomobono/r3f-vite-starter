import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Avatar(props) {
  const { animation } = props;
  const { headFolllow, cursorFollow, wireframe } = useControls({
    headFolllow: false,
    cursorFollow: false,
    wireframe: false,
  });
  const group = useRef();
  const { nodes, materials } = useGLTF('models/65b10d74a8cd1dfdd70b6dd1.glb');

  const { animations: typingAnimations } = useFBX("animations/StandingGreeting.fbx");
  const { animations: standingAnimations } = useFBX("animations/StandingIdle.fbx");
  const { animations: fallingAnimations } = useFBX("animations/FallingIdle.fbx");

  typingAnimations[0].name = "Hello";
  standingAnimations[0].name = "Standing";
  fallingAnimations[0].name = "Falling";

  console.log("Loaded animations:", {
    typing: typingAnimations[0].name,
    standing: standingAnimations[0].name,
    falling: fallingAnimations[0].name,
  });

  const { actions } = useAnimations([typingAnimations[0], standingAnimations[0], fallingAnimations[0]], group);

  useFrame((state) => {
    if (headFolllow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  useEffect(() => {
    if (actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
    } else {
      console.warn(`Animation ${animation} not found`);
    }
    return () => {
      if (actions[animation]) {
        actions[animation].reset().fadeOut(0.5);
      }
    };
  }, [animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
        <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
        <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences} />
        <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences} />
      </group>
    </group>
  );
}

useGLTF.preload('models/65b10d74a8cd1dfdd70b6dd1.glb');
