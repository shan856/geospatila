import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useToast } from '../components/Toast';

const ManageSiteSettings = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        companyName: 'RRtechGeo',
        tagline: 'Geospatial Solutions',
        footerDescription: 'Transforming geospatial data into actionable insights. Expert GIS solutions, drone mapping, and remote sensing services for modern businesses.',
        socialLinks: {
            linkedin: '#',
            twitter: '#',
            github: '#',
            email: 'contact@rrtechgeo.com',
        },
        footerLinks: {
            privacyPolicy: '#',
            termsOfService: '#',
            cookiePolicy: '#',
        },
        seo: {
            metaDescription: 'RRtechGeo provides professional GIS services, drone mapping, remote sensing, and LiDAR processing. High-precision geospatial solutions for better insights.',
            keywords: 'GIS services, geospatial solutions, drone mapping, remote sensing, LiDAR processing, spatial analytics, land surveying',
        },
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'single_pages', 'settings');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSettings(prev => ({ ...prev, ...docSnap.data() }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
        setIsLoading(false);
    };

    const saveSettings = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'single_pages', 'settings'), settings);
            toast.success('Site settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Error saving. Please try again.');
        }
        setIsSaving(false);
    };

    const updateField = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const updateSocialLink = (platform, value) => {
        setSettings(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value },
        }));
    };

    const updateFooterLink = (link, value) => {
        setSettings(prev => ({
            ...prev,
            footerLinks: { ...prev.footerLinks, [link]: value },
        }));
    };

    const updateSEO = (field, value) => {
        setSettings(prev => ({
            ...prev,
            seo: { ...prev.seo, [field]: value },
        }));
    };

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
                        <span className="text-gradient">Site Settings</span>
                    </h1>
                    <p className="text-text-secondary mt-1">Configure global website settings, social links, and SEO.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveSettings}
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
                            <FaSave /> Save Settings
                        </>
                    )}
                </motion.button>
            </div>

            {/* Branding Section */}
            <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                    <FaGlobe className="text-accent" /> Branding
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Company Name</label>
                        <input
                            type="text"
                            value={settings.companyName}
                            onChange={(e) => updateField('companyName', e.target.value)}
                            className="input-glass"
                            placeholder="RRtechGeo"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Tagline</label>
                        <input
                            type="text"
                            value={settings.tagline}
                            onChange={(e) => updateField('tagline', e.target.value)}
                            className="input-glass"
                            placeholder="Geospatial Solutions"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Footer Description</label>
                    <textarea
                        value={settings.footerDescription}
                        onChange={(e) => updateField('footerDescription', e.target.value)}
                        className="input-glass resize-none"
                        rows={3}
                        placeholder="Brief description shown in the footer..."
                    />
                </div>
            </div>

            {/* Social Links Section */}
            <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold text-text-primary">Social Media Links</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                            <FaLinkedin className="text-[#0077B5]" /> LinkedIn URL
                        </label>
                        <input
                            type="text"
                            value={settings.socialLinks.linkedin}
                            onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                            className="input-glass"
                            placeholder="https://linkedin.com/company/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                            <FaTwitter className="text-[#1DA1F2]" /> Twitter/X URL
                        </label>
                        <input
                            type="text"
                            value={settings.socialLinks.twitter}
                            onChange={(e) => updateSocialLink('twitter', e.target.value)}
                            className="input-glass"
                            placeholder="https://twitter.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                            <FaGithub className="text-gray-800" /> GitHub URL
                        </label>
                        <input
                            type="text"
                            value={settings.socialLinks.github}
                            onChange={(e) => updateSocialLink('github', e.target.value)}
                            className="input-glass"
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                            <FaEnvelope className="text-accent" /> Contact Email
                        </label>
                        <input
                            type="email"
                            value={settings.socialLinks.email}
                            onChange={(e) => updateSocialLink('email', e.target.value)}
                            className="input-glass"
                            placeholder="contact@rrtechgeo.com"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Links Section */}
            <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold text-text-primary">Footer Links</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Privacy Policy URL</label>
                        <input
                            type="text"
                            value={settings.footerLinks.privacyPolicy}
                            onChange={(e) => updateFooterLink('privacyPolicy', e.target.value)}
                            className="input-glass"
                            placeholder="/privacy-policy"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Terms of Service URL</label>
                        <input
                            type="text"
                            value={settings.footerLinks.termsOfService}
                            onChange={(e) => updateFooterLink('termsOfService', e.target.value)}
                            className="input-glass"
                            placeholder="/terms"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Cookie Policy URL</label>
                        <input
                            type="text"
                            value={settings.footerLinks.cookiePolicy}
                            onChange={(e) => updateFooterLink('cookiePolicy', e.target.value)}
                            className="input-glass"
                            placeholder="/cookies"
                        />
                    </div>
                </div>
            </div>

            {/* SEO Section */}
            <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold text-text-primary">SEO Settings</h2>
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Meta Description</label>
                    <textarea
                        value={settings.seo.metaDescription}
                        onChange={(e) => updateSEO('metaDescription', e.target.value)}
                        className="input-glass resize-none"
                        rows={3}
                        placeholder="Brief description for search engines..."
                    />
                    <p className="text-xs text-text-muted mt-1">
                        {settings.seo.metaDescription.length}/160 characters (recommended)
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Keywords</label>
                    <input
                        type="text"
                        value={settings.seo.keywords}
                        onChange={(e) => updateSEO('keywords', e.target.value)}
                        className="input-glass"
                        placeholder="GIS, mapping, geospatial, drone..."
                    />
                    <p className="text-xs text-text-muted mt-1">Comma-separated keywords</p>
                </div>
            </div>
        </div>
    );
};

export default ManageSiteSettings;
