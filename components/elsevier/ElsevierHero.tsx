import React from 'react';
import { motion } from 'framer-motion';
import { EditableText, EditableImage } from '../Editable';

interface ElsevierHeroProps {
    id: string; // specialized section ID
    titleDefault: string;
    subtitleDefault: string;
    imageDefault: string;
}

export const ElsevierHero: React.FC<ElsevierHeroProps> = ({ id, titleDefault, subtitleDefault, imageDefault }) => {
    return (
        <section className="relative h-[600px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <EditableImage
                    id={`${id}_image`}
                    defaultSrc={imageDefault}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 h-full flex items-center">
                <div className="max-w-2xl text-white">
                    {/* Orange Decoration */}
                    <div className="w-16 h-1 bg-[#FF5722] mb-6 rounded-sm" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight mb-6">
                            <EditableText
                                id={`${id}_title`}
                                defaultContent={titleDefault}
                                as="span"
                            />
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-xl">
                            <EditableText
                                id={`${id}_subtitle`}
                                defaultContent={subtitleDefault}
                                as="span"
                            />
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Grid Pattern (Elsevier Style) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
                <div className="grid grid-cols-4 gap-4 h-full">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`h-24 w-full bg-[#FF5722] rounded-sm transform ${i % 2 === 0 ? 'opacity-30' : 'opacity-60'}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};
