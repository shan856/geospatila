import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SEO from '../components/SEO';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import FloatingOrbs from '../components/FloatingOrbs';
import Modal from '../components/Modal';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default contact info - San Francisco location (from original project)
  const [contactInfo, setContactInfo] = useState({
    addressLines: ['123 GeoSpatial Ave', 'San Francisco, CA 94107', 'USA'],
    emailList: ['info@geospatialinnovations.com', 'support@geospatialinnovations.com'],
    phoneList: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
    coordinates: [37.7749, -122.4194], // San Francisco coordinates
    hours: 'Mon-Fri: 9AM-6PM',
  });

  // Load contact info from Firebase first, then fallback to JSON
  useEffect(() => {
    const fetchContactInfo = async () => {
      setIsLoading(true);
      try {
        // Try Firebase first
        const docRef = doc(db, 'single_pages', 'contact');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setContactInfo(prev => ({
            addressLines: data.address ? [data.address, data.address2, data.city].filter(Boolean) : prev.addressLines,
            emailList: [data.email, data.email2].filter(Boolean).length > 0
              ? [data.email, data.email2].filter(Boolean)
              : prev.emailList,
            phoneList: [data.phone, data.phone2].filter(Boolean).length > 0
              ? [data.phone, data.phone2].filter(Boolean)
              : prev.phoneList,
            coordinates: data.mapLat && data.mapLng
              ? [parseFloat(data.mapLat), parseFloat(data.mapLng)]
              : prev.coordinates,
            hours: data.hours || prev.hours,
          }));
        } else {
          // Fallback to JSON file
          const res = await fetch('/data/contact.json');
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setContactInfo(prev => ({
              addressLines: data.address ? [data.address] : prev.addressLines,
              emailList: data.email ? [data.email] : prev.emailList,
              phoneList: data.phone ? [data.phone] : prev.phoneList,
              coordinates: data.coordinates || prev.coordinates,
              hours: data.hours || prev.hours,
            }));
          }
        }
      } catch (error) {
        console.log('Using default contact info');
      }
      setIsLoading(false);
    };

    fetchContactInfo();
  }, []);

  // Web3Forms submission handler (from original project)
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "443677e2-bf0f-40ec-befc-fd6b1bb30a37"); // Web3Forms Access Key

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

  const contactCards = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      items: contactInfo.addressLines,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      items: contactInfo.emailList,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      items: contactInfo.phoneList,
    },
  ];

  const services = [
    'GIS Mapping & Analysis',
    'Drone Surveying',
    'Remote Sensing',
    'Spatial Analytics',
    'LiDAR Processing',
    'GIS Consulting',
    'Other',
  ];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with RRtechGeo for expert geospatial consulting, GIS services, and drone mapping inquiries."
        keywords="contact GIS experts India, geospatial consulting quote, hire drone mapping company"
      />
      <div className="relative bg-white pt-24">
        <FloatingOrbs />

        {/* Hero Section */}
        <section className="relative py-24 mesh-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-geo-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">Get In Touch</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6"
              >
                Let's Start Your
                <span className="text-gradient"> Project</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary max-w-2xl mx-auto"
              >
                Ready to transform your geospatial data? Contact us today and let's discuss
                how we can help you achieve your goals.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24 bg-secondary-bg">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {contactCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="elevated" className="flex gap-4">
                      <div className="icon-soft shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">{card.title}</h4>
                        {card.items && card.items.map((item, idx) => (
                          <p key={idx} className="text-text-secondary text-sm">
                            {item}
                          </p>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {/* Working Hours */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Card variant="elevated">
                    <h4 className="font-semibold text-text-primary mb-4">Working Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Monday - Friday</span>
                        <span className="text-text-primary font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Saturday</span>
                        <span className="text-text-primary font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Sunday</span>
                        <span className="text-text-muted">Closed</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Contact Form - Using Web3Forms */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card variant="elevated" className="p-8">
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-6">
                    Send Us a Message
                  </h3>

                  <form onSubmit={onSubmit} className="space-y-6">
                    {/* Hidden fields for Web3Forms */}
                    <input type="hidden" name="subject" value="New Submission from RRtechGeo Website" />
                    <input type="hidden" name="from_name" value="RRtechGeo" />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="input-glass"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="input-glass"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="input-glass"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-text-primary mb-2">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          className="input-glass"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="input-glass resize-none"
                        placeholder="Tell us about your project..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="relative">
          <div className="container-custom py-16">
            <SectionTitle
              subtitle="Our Location"
              title="Find Us on the Map"
              description="Visit our office or connect with us online. We're here to help with all your geospatial needs."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full"
          >
            {/* Google Maps iframe (from original project) */}
            <iframe
              title="RRtechGeo Location Map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4783.8080162487395!2d77.578475!3d12.985076000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU5JzA2LjMiTiA3N8KwMzQnNDIuNSJF!5e1!3m2!1sen!2sin!4v1759669528508!5m2!1sen!2sin"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allowFullScreen=""
              loading="lazy"
            />

            {/* Map overlay gradients */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            {/* Map link */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
              <a
                href={`https://www.google.com/maps?q=${contactInfo.coordinates[0]},${contactInfo.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Open in Maps
              </a>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Success/Error Modal */}
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