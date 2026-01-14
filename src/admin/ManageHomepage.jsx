import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useToast } from '../components/Toast';

const ManageHomepage = () => {
    const toast = useToast();
    const [activeTab, setActiveTab] = useState('stats');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [homepageData, setHomepageData] = useState({
        stats: [
            { value: '500+', label: 'Projects' },
            { value: '15+', label: 'Years' },
            { value: '98%', label: 'Satisfaction' },
            { value: '50+', label: 'Clients' },
        ],
        features: [
            { title: 'Precision Accuracy', description: 'Centimeter-level accuracy in all our mapping and survey services.', icon: '🎯' },
            { title: 'Fast Turnaround', description: 'Quick delivery of comprehensive reports and data products.', icon: '⚡' },
            { title: 'Expert Team', description: 'Certified professionals with decades of combined experience.', icon: '👥' },
            { title: 'Modern Technology', description: 'Latest equipment and software for superior results.', icon: '🛰️' },
        ],
        processSteps: [
            { step: '01', title: 'Discovery', description: 'We understand your requirements and project goals' },
            { step: '02', title: 'Planning', description: 'Develop a detailed strategy and timeline' },
            { step: '03', title: 'Execution', description: 'Implement solutions with precision and care' },
            { step: '04', title: 'Delivery', description: 'Present results and provide ongoing support' },
        ],
        ctaSection: {
            title: 'Ready to Transform Your Geospatial Data?',
            subtitle: "Let's discuss how our expertise can help you achieve your goals.",
            buttonText: 'Start Your Project',
        },
    });

    useEffect(() => {
        fetchHomepageData();
    }, []);

    const fetchHomepageData = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'single_pages', 'homepage');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setHomepageData(prev => ({ ...prev, ...docSnap.data() }));
            }
        } catch (error) {
            console.error('Error fetching homepage data:', error);
        }
        setIsLoading(false);
    };

    const saveHomepageData = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'single_pages', 'homepage'), homepageData);
            toast.success('Homepage content saved successfully!');
        } catch (error) {
            console.error('Error saving homepage data:', error);
            toast.error('Error saving. Please try again.');
        }
        setIsSaving(false);
    };

    const updateStat = (index, field, value) => {
        const newStats = [...homepageData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setHomepageData(prev => ({ ...prev, stats: newStats }));
    };

    const updateFeature = (index, field, value) => {
        const newFeatures = [...homepageData.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setHomepageData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setHomepageData(prev => ({
            ...prev,
            features: [...prev.features, { title: '', description: '', icon: '⭐' }],
        }));
    };

    const removeFeature = (index) => {
        setHomepageData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const updateProcessStep = (index, field, value) => {
        const newSteps = [...homepageData.processSteps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setHomepageData(prev => ({ ...prev, processSteps: newSteps }));
    };

    const addProcessStep = () => {
        const nextStep = String(homepageData.processSteps.length + 1).padStart(2, '0');
        setHomepageData(prev => ({
            ...prev,
            processSteps: [...prev.processSteps, { step: nextStep, title: '', description: '' }],
        }));
    };

    const removeProcessStep = (index) => {
        setHomepageData(prev => ({
            ...prev,
            processSteps: prev.processSteps.filter((_, i) => i !== index),
        }));
    };

    const updateCTA = (field, value) => {
        setHomepageData(prev => ({
            ...prev,
            ctaSection: { ...prev.ctaSection, [field]: value },
        }));
    };

    const tabs = [
        { id: 'stats', label: 'Stats' },
        { id: 'features', label: 'Why Choose Us' },
        { id: 'process', label: 'Process Steps' },
        { id: 'cta', label: 'CTA Section' },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-primary">
                        Manage <span className="text-gradient">Homepage</span>
                    </h1>
                    <p className="text-text-secondary mt-1">Edit stats, features, process steps, and CTA content.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveHomepageData}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <FaSave /> Save Changes
                        </>
                    )}
                </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-accent text-white'
                            : 'bg-white border border-glass-border text-text-secondary hover:text-accent'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="glass-card p-6">
                {/* Stats Tab */}
                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        <p className="text-text-secondary text-sm">Edit the statistics displayed on the homepage (4 items).</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {homepageData.stats.map((stat, index) => (
                                <div key={index} className="p-4 bg-secondary-bg rounded-xl space-y-3">
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                                        className="input-glass text-2xl font-bold text-center"
                                        placeholder="500+"
                                    />
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                                        className="input-glass text-center"
                                        placeholder="Projects"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                    <div className="space-y-6">
                        <p className="text-text-secondary text-sm">Edit the "Why Choose Us" features section.</p>
                        {homepageData.features.map((feature, index) => (
                            <div key={index} className="p-4 bg-secondary-bg rounded-xl relative">
                                <button
                                    onClick={() => removeFeature(index)}
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Icon (emoji)</label>
                                        <input
                                            type="text"
                                            value={feature.icon}
                                            onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                            className="input-glass text-2xl text-center"
                                            maxLength={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={feature.title}
                                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs text-text-muted mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={feature.description}
                                            onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addFeature} className="text-accent hover:text-accent/80 flex items-center gap-2">
                            <FaPlus /> Add Feature
                        </button>
                    </div>
                )}

                {/* Process Steps Tab */}
                {activeTab === 'process' && (
                    <div className="space-y-6">
                        <p className="text-text-secondary text-sm">Edit the "Our Process" steps section.</p>
                        {homepageData.processSteps.map((step, index) => (
                            <div key={index} className="p-4 bg-secondary-bg rounded-xl relative">
                                <button
                                    onClick={() => removeProcessStep(index)}
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Step #</label>
                                        <input
                                            type="text"
                                            value={step.step}
                                            onChange={(e) => updateProcessStep(index, 'step', e.target.value)}
                                            className="input-glass font-bold text-center"
                                            placeholder="01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs text-text-muted mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={step.description}
                                            onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addProcessStep} className="text-accent hover:text-accent/80 flex items-center gap-2">
                            <FaPlus /> Add Step
                        </button>
                    </div>
                )}

                {/* CTA Section Tab */}
                {activeTab === 'cta' && (
                    <div className="space-y-6">
                        <p className="text-text-secondary text-sm">Edit the Call-to-Action section at the bottom of the homepage.</p>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
                            <input
                                type="text"
                                value={homepageData.ctaSection.title}
                                onChange={(e) => updateCTA('title', e.target.value)}
                                className="input-glass"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Subtitle</label>
                            <input
                                type="text"
                                value={homepageData.ctaSection.subtitle}
                                onChange={(e) => updateCTA('subtitle', e.target.value)}
                                className="input-glass"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Button Text</label>
                            <input
                                type="text"
                                value={homepageData.ctaSection.buttonText}
                                onChange={(e) => updateCTA('buttonText', e.target.value)}
                                className="input-glass"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageHomepage;
