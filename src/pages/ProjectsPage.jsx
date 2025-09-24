import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        setProjects(projectsSnapshot.docs.map(doc => doc.data()));
      } catch (error) { console.error("Error fetching projects:", error); }
    };
    fetchProjects();
  }, []);

  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16"><h1 className="text-5xl font-extrabold text-yellow-400">Project Showcase</h1><p className="text-xl text-gray-300 mt-4">Modernizing industries with data-driven geospatial solutions.</p></div>
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}><img src={project.imageUrl} alt={project.title} className="rounded-lg shadow-2xl w-full h-auto object-cover"/></div>
              <div className={index % 2 !== 0 ? 'md:col-start-1' : ''}>
                <p className="text-yellow-400 font-semibold">{project.client}</p>
                <h2 className="text-3xl font-bold mt-2 mb-4">{project.title}</h2>
                <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                  <div><strong>Challenge:</strong> <div dangerouslySetInnerHTML={{ __html: project.challenge }} /></div>
                  <div><strong>Solution:</strong> <div dangerouslySetInnerHTML={{ __html: project.solution }} /></div>
                  <p className="p-4 bg-yellow-400 bg-opacity-10 border-l-4 border-yellow-400 text-yellow-300 rounded-r-lg not-prose"><strong>Key Outcome:</strong> {project.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectsPage;