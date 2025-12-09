import React from 'react';
import { ElsevierPageLayout } from './elsevier/ElsevierPageLayout';

// Generic wrapper to configure the layout for each page type
export const ElsevierGenericPage = ({
    pageId,
    title,
    subtitle,
    image,
    sections
}: {
    pageId: string;
    title: string;
    subtitle: string;
    image: string;
    sections: Array<{ type: 'split' | 'grid'; data: any }>;
}) => {
    return (
        <ElsevierPageLayout
            pageId={pageId}
            heroData={{ title, subtitle, image }}
            sections={sections}
        />
    );
};

// --- PRE-CONFIGURED PAGES ---

export const SolutionsPage = () => (
    <ElsevierGenericPage
        pageId="solutions"
        title="Impactful Solutions"
        subtitle="Addressing the world's most critical challenges through science and technology."
        image="https://images.unsplash.com/photo-1576091160550-2187d80a18f7?auto=format&fit=crop&q=80"
        sections={[
            {
                type: 'split',
                data: {
                    imagePosition: 'left',
                    titleDefault: "Integrated Healthcare",
                    contentDefault: "Connecting data, technology, and people to improve patient outcomes.",
                    imageDefault: "https://images.unsplash.com/photo-1581056771107-24ca5f033815?auto=format&fit=crop&q=80"
                }
            },
            {
                type: 'grid',
                data: {
                    titleDefault: "Our Solution Suite",
                    items: [
                        { id: 'sol_1', titleDefault: "Precision Medicine", descriptionDefault: "Tailored treatments based on genetic profiles." },
                        { id: 'sol_2', titleDefault: "Population Health", descriptionDefault: "Managing health outcomes at scale." },
                        { id: 'sol_3', titleDefault: "Digital Therapeutics", descriptionDefault: "Software-based interventions." }
                    ]
                }
            }
        ]}
    />
);

export const ResearchPage = () => (
    <ElsevierGenericPage
        pageId="research"
        title="Breaking New Ground"
        subtitle="Pioneering research that pushes the boundaries of human knowledge."
        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
        sections={[
            {
                type: 'grid',
                data: {
                    titleDefault: "Key Research Areas",
                    items: [
                        { id: 'res_1', titleDefault: "Biotechnology", descriptionDefault: "Engineering biology for new capabilities." },
                        { id: 'res_2', titleDefault: "Artificial Intelligence", descriptionDefault: "Transforming data into actionable intelligence." },
                        { id: 'res_3', titleDefault: "Sustainable Energy", descriptionDefault: "Powering the future responsibly." }
                    ]
                }
            }
        ]}
    />
);

export const PublicationsPage = () => (
    <ElsevierGenericPage
        pageId="publications"
        title="Scientific Publications"
        subtitle="Access our library of peer-reviewed journals and articles."
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80"
        sections={[
            {
                type: 'split',
                data: {
                    imagePosition: 'right',
                    titleDefault: "Open Access Journals",
                    contentDefault: "We are committed to open science and making research accessible to all.",
                    imageDefault: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80"
                }
            }
        ]}
    />
);

export const ConferencesPage = () => (
    <ElsevierGenericPage
        pageId="conferences"
        title="Global Conferences"
        subtitle="Connecting minds, fostering collaboration, and sharing ideas."
        image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
        sections={[
            {
                type: 'grid',
                data: {
                    titleDefault: "Upcoming Events",
                    items: [
                        { id: 'conf_1', titleDefault: "Annual Research Summit", descriptionDefault: "New York, NY - Dec 2025" },
                        { id: 'conf_2', titleDefault: "Innovation Expo", descriptionDefault: "London, UK - Mar 2026" }
                    ]
                }
            }
        ]}
    />
);

export const AboutPage = () => (
    <ElsevierGenericPage
        pageId="about"
        title="About IVRI Research"
        subtitle="Dedicated to advancing science and improving lives since 1990."
        image="https://images.unsplash.com/photo-1522071820081-00ca6e303db2?auto=format&fit=crop&q=80"
        sections={[
            {
                type: 'split',
                data: {
                    imagePosition: 'right',
                    titleDefault: "Who We Are",
                    contentDefault: "IVRI is a global leader in scientific research and information analytics.",
                    imageDefault: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
                }
            },
            {
                type: 'grid',
                data: {
                    titleDefault: "Our Values",
                    items: [
                        { id: 'val_1', titleDefault: "Integrity", descriptionDefault: "Upholding the highest ethical standards." },
                        { id: 'val_2', titleDefault: "Innovation", descriptionDefault: "Constantly seeking new and better ways." }
                    ]
                }
            }
        ]}
    />
);
