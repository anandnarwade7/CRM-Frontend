import ProjectHeader from "../../components/custom/Projects/ProjectHeader";
import ProjectTableContainer from "../../components/custom/Projects/ProjectTableContainer";

const Projects = () => {
  return (
    <section className="w-full rounded-xl bg-white h-full px-6 py-3">
      <ProjectHeader />
      <ProjectTableContainer />
    </section>
  );
};

export default Projects;
