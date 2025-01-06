import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "EventPass",
    url: "https://eventpass.vercel.app/",
    image: "projects/eventpass.png",
    description: "Project developed with React and non-relational databases (MongoDB)",
  },
  {
    title: "Sweet Candy",
    url: "https://lucky-palmier-6eb4a3.netlify.app/",
    image: "projects/swwetcandy.png",
    description: "Project created with CSS and JS",
  },
  {
    title: "Dino Play",
    url: "https://danielahomobono.github.io/dinoJS/",
    image: "projects/dino.png",
    description: "Game made with JavaScript.",
  },
  {
    title: "Humaya",
    url: "https://danielahomobono.github.io/humaya/",
    image: "projects/humaya.png",
    description: "Application made with CSS and JavaScript.",
  },
  {
    title: "Kotlin",
    url: "https://github.com/danielaHomobono/AndroidClubDeportivo",
    image: "projects/kotlinapp.png",
    description: "mobile app for sports club management developed with Kotlin.",
  },
  {
    title: "Python",
    url: "https://danielahomobono.github.io/Simulacion3/",
    image: "projects/probabilidad.png",
    description: "Simulation with Python. Analysis of charts and statistics.",
  },
  {
    title: "Club Deportivo C#",
    url: "https://github.com/danielaHomobono/SistemaClubDeportivo2.git",
    image: "projects/club.png",
    description: "Project developed with C#. Sports club management",
  },
  {
    title: "Sitio de películas",
    url: "https://danielahomobono.github.io/context-app/",
    image: "projects/peliculas.png",
    description: "Movie site with React.",
  },
  {
    title: "Caculadora",
    url: "https://danielahomobono.github.io/calculadora/",
    image: "projects/calculadora.png",
    description: "Calculator made with JavaScript.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[4.5, 4]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[4, 2.4, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.6}
      />
      <Text
        maxWidth={4}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.4}
        position={[-2, -0.8, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={4}
        anchorX="left"
        anchorY="top"
        fontSize={0.2}
        position={[-2, -1.2, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1} scale={[2, 2, 2]}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 5, 0, -6]}
          animate={{
            x: 0 + (index - currentProject) * 5,
            y: currentProject === index ? 0 : -0.2,
            z: currentProject === index ? -4 : -6,
            rotateX: currentProject === index ? 0 : -Math.PI / 4,
            rotateZ: currentProject === index ? 0 : -0.15 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};