import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSave, FaTimes, FaEdit, FaTrash, FaUsers, FaHistory, FaHeart } from 'react-icons/fa';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useToast } from '../components/Toast';

const ManageAbout = () => {
    const toast = useToast();
    const [activeTab, setActiveTab] = useState('company');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [aboutData, setAboutData] = useState({
        companyInfo: {
            title: 'Mapping the Future',
            description: 'Since 2008, RRtechGeo has been at the forefront of geospatial technology, helping organizations unlock the power of location intelligence.',
            stats: [
                { value: '15+', label: 'Years' },
                { value: '500+', label: 'Projects' },
                { value: '50+', label: 'Experts' },
            ],
        },
        values: [
            { icon: '🎯', title: 'Precision', description: 'We deliver accurate, reliable results you can trust.' },
            { icon: '💡', title: 'Innovation', description: 'Constantly adopting new technologies and methods.' },
            { icon: '🤝', title: 'Partnership', description: 'We work as an extension of your team.' },
            { icon: '🌍', title: 'Sustainability', description: 'Committed to environmental responsibility.' },
        ],
        milestones: [
            { year: '2008', title: 'Founded', description: 'RRtechGeo established with a vision for geospatial excellence' },
            { year: '2012', title: 'Expansion', description: 'Launched drone surveying services and expanded team' },
            { year: '2016', title: 'Recognition', description: 'Received industry award for innovative GIS solutions' },
            { year: '2020', title: 'Digital Transform', description: 'Introduced cloud-based analytics and AI integration' },
            { year: '2024', title: 'Today', description: '500+ projects completed across diverse industries' },
        ],
        team: [
            { name: 'Dr. Ravi Kumar', role: 'Founder & CEO', specialty: 'GIS & Remote Sensing Expert' },
            { name: 'Priya Sharma', role: 'Technical Director', specialty: 'Drone & LiDAR Specialist' },
            { name: 'Amit Patel', role: 'Lead Analyst', specialty: 'Spatial Analytics Expert' },
            { name: 'Neha Singh', role: 'Project Manager', specialty: 'Client Relations' },
        ],
    });

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'single_pages', 'about');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setAboutData(prev => ({ ...prev, ...docSnap.data() }));
            }
        } catch (error) {
            console.error('Error fetching about data:', error);
        }
        setIsLoading(false);
    };

    const saveAboutData = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'single_pages', 'about'), aboutData);
            toast.success('About page content saved successfully!');
        } catch (error) {
            console.error('Error saving about data:', error);
            toast.error('Error saving. Please try again.');
        }
        setIsSaving(false);
    };

    const updateCompanyInfo = (field, value) => {
        setAboutData(prev => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, [field]: value },
        }));
    };

    const updateStat = (index, field, value) => {
        const newStats = [...aboutData.companyInfo.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setAboutData(prev => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, stats: newStats },
        }));
    };

    const updateValue = (index, field, value) => {
        const newValues = [...aboutData.values];
        newValues[index] = { ...newValues[index], [field]: value };
        setAboutData(prev => ({ ...prev, values: newValues }));
    };

    const addValue = () => {
        setAboutData(prev => ({
            ...prev,
            values: [...prev.values, { icon: '⭐', title: '', description: '' }],
        }));
    };

    const removeValue = (index) => {
        setAboutData(prev => ({
            ...prev,
            values: prev.values.filter((_, i) => i !== index),
        }));
    };

    const updateMilestone = (index, field, value) => {
        const newMilestones = [...aboutData.milestones];
        newMilestones[index] = { ...newMilestones[index], [field]: value };
        setAboutData(prev => ({ ...prev, milestones: newMilestones }));
    };

    const addMilestone = () => {
        setAboutData(prev => ({
            ...prev,
            milestones: [...prev.milestones, { year: '', title: '', description: '' }],
        }));
    };

    const removeMilestone = (index) => {
        setAboutData(prev => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index),
        }));
    };

    const updateTeamMember = (index, field, value) => {
        const newTeam = [...aboutData.team];
        newTeam[index] = { ...newTeam[index], [field]: value };
        setAboutData(prev => ({ ...prev, team: newTeam }));
    };

    const addTeamMember = () => {
        setAboutData(prev => ({
            ...prev,
            team: [...prev.team, { name: '', role: '', specialty: '' }],
        }));
    };

    const removeTeamMember = (index) => {
        setAboutData(prev => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index),
        }));
    };

    const tabs = [
        { id: 'company', label: 'Company Info', icon: FaHeart },
        { id: 'values', label: 'Values', icon: FaHeart },
        { id: 'milestones', label: 'Milestones', icon: FaHistory },
        { id: 'team', label: 'Team', icon: FaUsers },
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
                        Manage <span className="text-gradient">About Page</span>
                    </h1>
                    <p className="text-text-secondary mt-1">Edit company info, values, milestones, and team members.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveAboutData}
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-accent text-white'
                            : 'bg-white border border-glass-border text-text-secondary hover:text-accent'
                            }`}
                    >
                        <tab.icon className="text-sm" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="glass-card p-6">
                {/* Company Info Tab */}
                {activeTab === 'company' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Page Title</label>
                            <input
                                type="text"
                                value={aboutData.companyInfo.title}
                                onChange={(e) => updateCompanyInfo('title', e.target.value)}
                                className="input-glass"
                                placeholder="Mapping the Future"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                            <textarea
                                value={aboutData.companyInfo.description}
                                onChange={(e) => updateCompanyInfo('description', e.target.value)}
                                className="input-glass resize-none"
                                rows={4}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-4">Stats (3 items)</label>
                            <div className="grid md:grid-cols-3 gap-4">
                                {aboutData.companyInfo.stats.map((stat, index) => (
                                    <div key={index} className="p-4 bg-secondary-bg rounded-xl space-y-3">
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            className="input-glass text-2xl font-bold text-center"
                                            placeholder="15+"
                                        />
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                                            className="input-glass text-center"
                                            placeholder="Years"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Values Tab */}
                {activeTab === 'values' && (
                    <div className="space-y-6">
                        {aboutData.values.map((value, index) => (
                            <div key={index} className="p-4 bg-secondary-bg rounded-xl relative">
                                <button
                                    onClick={() => removeValue(index)}
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Icon (emoji)</label>
                                        <input
                                            type="text"
                                            value={value.icon}
                                            onChange={(e) => updateValue(index, 'icon', e.target.value)}
                                            className="input-glass text-2xl text-center"
                                            maxLength={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={value.title}
                                            onChange={(e) => updateValue(index, 'title', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={value.description}
                                            onChange={(e) => updateValue(index, 'description', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addValue} className="text-accent hover:text-accent/80 flex items-center gap-2">
                            <FaPlus /> Add Value
                        </button>
                    </div>
                )}

                {/* Milestones Tab */}
                {activeTab === 'milestones' && (
                    <div className="space-y-6">
                        {aboutData.milestones.map((milestone, index) => (
                            <div key={index} className="p-4 bg-secondary-bg rounded-xl relative">
                                <button
                                    onClick={() => removeMilestone(index)}
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Year</label>
                                        <input
                                            type="text"
                                            value={milestone.year}
                                            onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                                            className="input-glass"
                                            placeholder="2024"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={milestone.title}
                                            onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={milestone.description}
                                            onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addMilestone} className="text-accent hover:text-accent/80 flex items-center gap-2">
                            <FaPlus /> Add Milestone
                        </button>
                    </div>
                )}

                {/* Team Tab */}
                {activeTab === 'team' && (
                    <div className="space-y-6">
                        {aboutData.team.map((member, index) => (
                            <div key={index} className="p-4 bg-secondary-bg rounded-xl relative">
                                <button
                                    onClick={() => removeTeamMember(index)}
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Role</label>
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Specialty</label>
                                        <input
                                            type="text"
                                            value={member.specialty}
                                            onChange={(e) => updateTeamMember(index, 'specialty', e.target.value)}
                                            className="input-glass"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={addTeamMember} className="text-accent hover:text-accent/80 flex items-center gap-2">
                            <FaPlus /> Add Team Member
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAbout;
