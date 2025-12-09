import React from 'react';
import { ElsevierPageLayout } from './elsevier/ElsevierPageLayout';

export const FeaturesPage = () => {
    return (
        <ElsevierPageLayout
            pageId="features"
            heroData={{
                title: "Advancing human progress together",
                subtitle: "For the benefit of every patient, we bridge education and practice to support current and future impact makers.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
            }}
            sections={[
                {
                    type: 'split',
                    data: {
                        imagePosition: 'right',
                        titleDefault: "Our shared mission and commitment to progress",
                        contentDefault: "The complexities of healthcare bring immense challenges — but also extraordinary opportunities to innovate and improve outcomes. Together with the communities we support, we are dedicated to providing trusted, evidence-based content and AI-driven technologies.",
                        imageDefault: "https://images.unsplash.com/photo-1551076882-904cbca0513c?auto=format&fit=crop&q=80"
                    }
                },
                {
                    type: 'grid',
                    data: {
                        titleDefault: "Products for Clinicians and Educators",
                        descriptionDefault: "Support evidence-based decisions with credible, comprehensive content.",
                        items: [
                            { id: 'feat_1', titleDefault: "ClinicalKey", descriptionDefault: "Fast answers and deep evidence." },
                            { id: 'feat_2', titleDefault: "ClinicalKey AI", descriptionDefault: "Conversational search for rapid insights." },
                            { id: 'feat_3', titleDefault: "Clinical Pharmacology", descriptionDefault: "The gold standard for drug reference." }
                        ]
                    }
                },
                {
                    type: 'split',
                    data: {
                        imagePosition: 'left',
                        titleDefault: "For Nurses",
                        contentDefault: "Empower nurses and patients with trusted, evidence-based information. Our nursing resources are designed to help meet your program goals and ensure students are practice-ready.",
                        imageDefault: "https://images.unsplash.com/photo-1584634741370-4cc5d5054ec4?auto=format&fit=crop&q=80"
                    }
                }
            ]}
        />
    );
};
