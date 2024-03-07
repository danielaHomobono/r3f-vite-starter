import { Environment, OrbitControls, Text } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";


export const Experience = () => {

const {animation} = useControls({
  animation: {
  value: "Hello",
  options: ["Hello", "Falling", "Standing"]
},
})


  return (
    <>
      <OrbitControls />
      
      <Environment preset="sunset" />
      <group position-y={-1}>
      <Avatar animation={animation} />
      {/*<Text font={"fonts/Poppins-Black.ttf"} position-x={-1.3} position-y={-0.5} position-z={1} lineHeight={0.8} textAlign="center">
        MY LITTLE{"\n"} CAMPING
        <meshBasicMaterial color="white" />
  </Text>*/}
  <ambientLight scale={1} />
  </group>
  
    </>
  );
};
