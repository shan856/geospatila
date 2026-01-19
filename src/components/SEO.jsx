import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const SEO = ({ title, description, keywords, image, url }) => {
    const [dynamicSEO, setDynamicSEO] = useState({
        metaDescription: '',
        keywords: '',
    });

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const docRef = doc(db, 'single_pages', 'settings');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.seo) {
                        setDynamicSEO(data.seo);
                    }
                }
            } catch (error) {
                console.log('Using default SEO from index.html');
            }
        };
        fetchSEO();
    }, []);

    const siteTitle = "RRtechGeo";
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Expert GIS & Geospatial Solutions`;
    const metaDesc = description || dynamicSEO.metaDescription || "Expert GIS solutions, drone mapping, and remote sensing services.";
    const metaKeywords = keywords || dynamicSEO.keywords || "GIS, geospatial, mapping, drone surveys, remote sensing, spatial analytics";
    const metaUrl = url || "https://www.rrtechgeo.in";
    const metaImage = image || "https://www.rrtechgeo.in/og-image.png";

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={metaImage} />

            {/* Canonical */}
            <link rel="canonical" href={metaUrl} />
        </Helmet>
    );
};

export default SEO;
