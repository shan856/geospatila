// migrateData.js
const fs = require('fs');
const path = require('path');
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

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
const dataDirectory = path.join(__dirname, 'public', 'data');

async function migrate() {
  try {
    console.log('Starting migration...');
    const files = ['services.json', 'projects.json', 'about.json', 'contact.json', 'heroSlides.json', 'solutions.json'];
    for (const fileName of files) {
      const filePath = path.join(dataDirectory, fileName);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (Array.isArray(data)) {
        for (const item of data) {
          const id = String(item.id); // Ensure ID is a string
          await setDoc(doc(db, fileName.replace('.json', ''), id), item);
        }
      } else {
        const docName = fileName.replace('.json', '');
        await setDoc(doc(db, 'single_pages', docName), data);
      }
      console.log(`✅ Migrated ${fileName}`);
    }
    console.log('\nMigration complete! You can now delete this script.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}
migrate();