import React from 'react';
import { ElsevierHero } from './ElsevierHero';
import { ElsevierSplitSection } from './ElsevierSplitSection';
import { ElsevierGridSection } from './ElsevierGridSection';
import { ElsevierCTA } from './ElsevierCTA';

interface ElsevierPageProps {
    pageId: string;
    heroData: { title: string; subtitle: string; image: string };
    sections: Array<{ type: 'split' | 'grid'; data: any }>;
}

export const ElsevierPageLayout: React.FC<ElsevierPageProps> = ({ pageId, heroData, sections }) => {
    return (
        <div className="bg-white min-h-screen pt-20">
            <ElsevierHero
                id={`${pageId}_hero`}
                titleDefault={heroData.title}
                subtitleDefault={heroData.subtitle}
                imageDefault={heroData.image}
            />

            {sections.map((section, index) => {
                if (section.type === 'split') {
                    return (
                        <ElsevierSplitSection
                            key={index}
                            id={`${pageId}_split_${index}`}
                            {...section.data}
                        />
                    );
                }
                if (section.type === 'grid') {
                    return (
                        <ElsevierGridSection
                            key={index}
                            id={`${pageId}_grid_${index}`}
                            {...section.data}
                        />
                    );
                }
                return null;
            })}

            <ElsevierCTA id={`${pageId}_cta`} />
        </div>
    );
};
