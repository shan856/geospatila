import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../components/Card';
import Modal from '../components/Modal'; // <-- Import the new Modal component
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => { /* ... (fetch logic is the same) ... */ };
    fetchContact();
  }, []);

  // Full fetch logic for completeness
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'single_pages', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setContactInfo(docSnap.data());
      } catch (error) { console.error("Error fetching contact info:", error); }
    };
    fetchContact();
  }, []);
  
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "443677e2-bf0f-40ec-befc-fd6b1bb30a37");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setModalContent({ title: "Success!", message: "Your message has been sent successfully. We will contact you shortly." });
        setIsModalOpen(true);
        event.target.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setModalContent({ title: "Error", message: `An error occurred: ${error.message}` });
      setIsModalOpen(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16"><h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Contact Us</h1><p className="text-lg md:text-xl text-gray-300 mt-4">We'd love to hear from you. Let's get in touch.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-20">
            <Card title="Phone" icon={<FaPhone />}><a href={`tel:${contactInfo.phone}`} className="hover:text-yellow-400">{contactInfo.phone}</a></Card>
            <Card title="Email" icon={<FaEnvelope />}><a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-400">{contactInfo.email}</a></Card>
            <Card title="Address" icon={<FaMapMarkerAlt />}>{contactInfo.address}</Card>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 bg-gray-800 p-6 md:p-8 rounded-lg">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <input type="hidden" name="subject" value="New Submission from Geospatial Website" />
                <input type="hidden" name="from_name" value="GeoSpatial Innovations" />
                <div><label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-400">Full Name</label><input type="text" id="name" name="name" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required /></div>
                <div><label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-400">Email Address</label><input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required /></div>
                <div><label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-400">Message</label><textarea id="message" name="message" rows="5" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required></textarea></div>
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4783.8080162487395!2d77.578475!3d12.985076000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU5JzA2LjMiTiA3N8KwMzQnNDIuNSJF!5e1!3m2!1sen!2sin!4v1759669528508!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" className="rounded-lg" title="Google Maps Location"></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* --- THIS IS THE NEW MODAL COMPONENT IN ACTION --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalContent.title}
      >
        {modalContent.message}
      </Modal>
    </>
  );
};
export default ContactPage;