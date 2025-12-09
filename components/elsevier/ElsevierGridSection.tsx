import React from 'react';
import { EditableText, EditableImage } from '../Editable';
import { motion } from 'framer-motion';

interface CardItem {
    id: string; // unique key for editable content
    titleDefault: string;
    descriptionDefault: string;
    iconDefault?: string; // Optional icon/image URL
}

interface ElsevierGridSectionProps {
    id: string;
    titleDefault: string;
    descriptionDefault?: string;
    items: CardItem[];
}

export const ElsevierGridSection: React.FC<ElsevierGridSectionProps> = ({ id, titleDefault, descriptionDefault, items }) => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16 max-w-3xl">
                    <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-medium mb-6">
                        <EditableText id={`${id}_title`} defaultContent={titleDefault} as="span" />
                    </h2>
                    {descriptionDefault && (
                        <p className="text-xl text-gray-600 font-light">
                            <EditableText id={`${id}_desc`} defaultContent={descriptionDefault} as="span" />
                        </p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-[#FF5722]"
                        >
                            {/* Optional formatting block similar to "For Physicians" blocks in screenshot */}
                            <div className="mb-4">
                                <div className="w-10 h-10 bg-[#FF5722]/10 rounded-lg flex items-center justify-center text-[#FF5722] mb-4 group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                                    {/* Placeholder Icon */}
                                    <div className="w-5 h-5 bg-current rounded-sm" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#FF5722] transition-colors">
                                    <EditableText id={`${item.id}_title`} defaultContent={item.titleDefault} as="span" />
                                </h3>
                                <div className="text-gray-600 text-sm leading-relaxed">
                                    <EditableText id={`${item.id}_desc`} defaultContent={item.descriptionDefault} as="p" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
