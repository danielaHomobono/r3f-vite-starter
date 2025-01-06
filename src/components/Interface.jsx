
import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";






const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start 
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
const AboutSection = () => {
  return (
    <Section mobileTop className="p-8 rounded-lg shadow-lg">
      <div className="font-mono text-2xl font-extrabold">
        <p className="text-6xl font-bold leading-snug tracking-tight text-gray-800">
          Hi, I'm
          <br />
          <span className="text-white px-1 font-extrabold">Daniela Homobono</span>
        </p>
        <motion.p
          className="text-4xl text-gray-800 mt-4 font-bold"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
        >
          I am a developer
          <br />
          always learning new skills.
        </motion.p>
        <motion.div
          className="text-xxl mt-8 font-bold text-gray-600"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 2,
          }}
        >
          <p className="text-gray-800">
            const aboutMe = &#123;
          </p>
          <p className="ml-4 text-gray-800">
            profession: <span className="text-white">"Developer"</span>,
          </p>
          <p className="ml-4 text-gray-800">
            passion: <span className="text-white">"Always learning new skills"</span>,
          </p>
          <p className="ml-4 text-gray-800">
            currentFocus: <span className="text-white">"Studying software development"</span>
          </p>
          <p className="text-gray-800">
            &#125;;
          </p>
          <p className="mt-4 text-gray-800">
            console.log(<span className="text-blue-400">"Turning ideas into reality!"</span>);
          </p>
        </motion.div>
        <motion.button
          className="bg-blue-400 text-white py-4 px-8 rounded-lg font-bold text-xl mt-16"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 2.5,
          }}
        >
          Contact me
        </motion.button>
      </div>
    </Section>
  );
};









const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 40,
  },
  {
    title: "React / React Native",
    level: 80,
  },
  {
    title: "Nodejs",
    level: 80,
  },
  {
    title: "Kotlin",
    level: 60,
  },
  {
    title: "Python",
    level: 30,
  },
  {
    title: "C#",
    level: 70,
  },
  {
    title: "SQL",
    level: 70,
  },
];
const languages = [
  
  {
    title: "🇺🇸 English",
    level: 80,
  },
  
];

const SkillsSection = () => {
  return (
    <Section className="p-8 rounded-lg shadow-lg">
      <motion.div whileInView={"visible"}>
        <h2 className="text-4xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-white"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-4xl font-bold mt-10 text-white">Languages</h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  className="text-xl font-bold text-white"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};



const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
  <div className="font-mono-extrabold flex w-full h-full gap-8 items-center justify-center mt-60">
    <button
      className="text-2xl font-bold text-gray-600  hover:text-indigo-600 transition-colors mt-8"
      onClick={previousProject}
    >
      ← Previous
    </button>
    <h2 className="text-5xl font-bold mt-10">Projects</h2>
    <button
      className="text-2xl font-bold text-gray-600 hover:text-indigo-600 transition-colors mt-10"
      onClick={nextProject}
    >
       Next →
    </button>
  </div>
</Section>
  );
};




const ContactSection = () => {
  const [state, handleSubmit] = useForm("mqazaero");
  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label for="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              disabled={state.submitting}
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 "
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};