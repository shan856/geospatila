import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsQuery = query(collection(db, 'projects'), orderBy('title'));
        const projectsSnapshot = await getDocs(projectsQuery);
        setProjects(projectsSnapshot.docs.map(doc => doc.data()));
      } catch (error) { console.error("Error fetching projects:", error); }
    };
    fetchProjects();
  }, []);

  return (
    <div className="py-16 md:py-20 bg-primary-bg text-text-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent">Project Showcase</h1>
          <p className="text-lg md:text-xl text-text-secondary mt-4">Modernizing industries with data-driven geospatial solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project) => (
            <div key={project.id} className="bg-secondary-bg rounded-lg shadow-lg overflow-hidden border border-border-color transform hover:-translate-y-2 transition-transform duration-300">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-accent font-semibold text-sm">{project.client}</p>
                <h2 className="text-2xl font-bold mt-1 mb-4 text-text-primary">{project.title}</h2>
                <div className="space-y-4 text-text-secondary text-sm prose max-w-none">
                  <div><strong>Challenge:</strong> <div dangerouslySetInnerHTML={{ __html: project.challenge }} /></div>
                  <div><strong>Solution:</strong> <div dangerouslySetInnerHTML={{ __html: project.solution }} /></div>
                  <p className="!p-4 bg-purple-50 border-l-4 border-accent text-accent-dark rounded-r-lg not-prose">
                    <strong>Key Outcome:</strong> {project.impact}
                  </p>
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