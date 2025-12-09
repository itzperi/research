import React from 'react';
import { EditableText, EditableImage } from '../Editable';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ElsevierSplitSectionProps {
    id: string;
    imagePosition?: 'left' | 'right';
    titleDefault: string;
    contentDefault: string;
    imageDefault: string;
    linkText?: string;
    linkUrl?: string; // Static for now, can be dynamic later
}

export const ElsevierSplitSection: React.FC<ElsevierSplitSectionProps> = ({
    id,
    imagePosition = 'left',
    titleDefault,
    contentDefault,
    imageDefault,
    linkText = "Learn more",
    linkUrl = "#"
}) => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-video lg:aspect-[4/3] rounded-sm overflow-hidden shadow-xl"
                        >
                            <EditableImage
                                id={`${id}_image`}
                                defaultSrc={imageDefault}
                                alt="Section Image"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decorative element resembling the screenshot's angular shapes */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/20 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: imagePosition === 'left' ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-medium leading-tight">
                                <EditableText
                                    id={`${id}_title`}
                                    defaultContent={titleDefault}
                                    as="span"
                                />
                            </h2>
                            <div className="prose prose-lg text-gray-600 leading-relaxed font-light">
                                <EditableText
                                    id={`${id}_content`}
                                    defaultContent={contentDefault}
                                    as="div"
                                />
                            </div>

                            <a href={linkUrl} className="inline-flex items-center gap-2 text-[#FF5722] font-semibold mt-4 hover:gap-3 transition-all group">
                                {linkText}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
