import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';
import { DEFAULT_CONTENT } from '../constants';

export const ImpactSectors = () => {
    const sectors = [
        {
            id: 'sector_1',
            title: 'Researchers & Scientists',
            desc: 'Advancing the frontiers of knowledge with rigorous methodology and support.',
            imgDefault: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
            color: 'bg-blue-600'
        },
        {
            id: 'sector_2',
            title: 'Health & Medicine',
            desc: 'Transforming patient outcomes through clinical innovation and discovery.',
            imgDefault: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
            color: 'bg-teal-600'
        },
        {
            id: 'sector_3',
            title: 'Industry & Technology',
            desc: 'Bridging the gap between theoretical research and real-world application.',
            imgDefault: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
            color: 'bg-orange-600'
        }
    ];

    return (
        <section className="py-24 bg-[#F5F7F9]">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-16">
                    <EditableText
                        id="impact_title"
                        defaultContent="Innovative solutions that help advance human progress"
                        as="h2"
                        className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 tracking-tight"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {sectors.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white rounded-t-lg overflow-hidden border-t-4 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                            style={{ borderColor: s.color.replace('bg-', 'var(--') }} // Hacky dynamic border or just use class
                        >
                            {/* Top Content */}
                            <div className={`pt-1 border-t-4 ${s.color.replace('bg-', 'border-')}`}>
                                <div className="p-8 pb-4">
                                    <EditableText
                                        id={`${s.id}_title`}
                                        defaultContent={s.title}
                                        as="h3"
                                        className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors"
                                    />
                                    <EditableText
                                        id={`${s.id}_desc`}
                                        defaultContent={s.desc}
                                        as="p"
                                        className="text-gray-600 leading-relaxed mb-6"
                                    />

                                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:gap-3 transition-all mb-8">
                                        <span className="border-b-2 border-transparent group-hover:border-primary">Read more</span>
                                        <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center">
                                            <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Image with Slanted/Mask Effect */}
                            <div className="relative h-64 mt-auto overflow-hidden">
                                {/* We create a 'slatted' look using multiple divs or a clip-path */}
                                <div className="absolute inset-0 w-full h-full">
                                    <EditableImage
                                        id={`${s.id}_img`}
                                        defaultSrc={s.imgDefault}
                                        alt={s.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Decorative Overlay mimic the reference 'shards' */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent mix-blend-overlay" />

                                {/* White slanted dividers to mimic the 'blinds' effect from reference */}
                                <div className="absolute inset-0 flex">
                                    <div className="flex-1 bg-white/0 border-r border-white/20 skew-x-12 scale-110 origin-bottom" />
                                    <div className="flex-1 bg-white/0 border-r border-white/20 skew-x-12 scale-110 origin-bottom" />
                                    <div className="flex-1 bg-white/0 border-r border-white/20 skew-x-12 scale-110 origin-bottom" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
