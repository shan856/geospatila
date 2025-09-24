const fs = require('fs');
const path = require('path');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBs92vWzowK0uHRRDsKNUDPx7cXzxbueFc",
  authDomain: "pure-phalanx-464704-n1.firebaseapp.com",
  projectId: "pure-phalanx-464704-n1",
  storageBucket: "pure-phalanx-464704-n1.appspot.com",
  messagingSenderId: "124371468899",
  appId: "1:124371468899:web:9bba30b6c5dd46e0f02e56"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// NOTE: This now points to your original data folder location.
// If you already moved it, move it back to src/data temporarily.
const dataDirectory = path.join(__dirname, 'src', 'data'); 

async function migrate() {
  try {
    console.log('Starting migration...');
    const servicesPath = path.join(dataDirectory, 'services.json');
    const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
    for (const service of services) {
      await setDoc(doc(db, 'services', service.id), service);
    }
    console.log('✅ Services migrated.');

    const projectsPath = path.join(dataDirectory, 'projects.json');
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    for (const project of projects) {
      await setDoc(doc(db, 'projects', String(project.id)), project);
    }
    console.log('✅ Projects migrated.');

    const aboutPath = path.join(dataDirectory, 'about.json');
    const aboutData = JSON.parse(fs.readFileSync(aboutPath, 'utf8'));
    await setDoc(doc(db, 'single_pages', 'about'), aboutData);
    console.log('✅ About page migrated.');

    const contactPath = path.join(dataDirectory, 'contact.json');
    const contactData = JSON.parse(fs.readFileSync(contactPath, 'utf8'));
    await setDoc(doc(db, 'single_pages', 'contact'), contactData);
    console.log('✅ Contact page migrated.');

    console.log('\nMigration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}
migrate();