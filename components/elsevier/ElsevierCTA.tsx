import React from 'react';
import { EditableText } from '../Editable';

export const ElsevierCTA: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section className="py-20 bg-[#1f2937] text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722] rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                        <EditableText
                            id={`${id}_title`}
                            defaultContent="Ready to transform your research impact?"
                            as="span"
                        />
                    </h2>
                    <p className="text-gray-300 text-lg">
                        <EditableText
                            id={`${id}_desc`}
                            defaultContent="Join thousands of researchers and institutions partitioning with IVRI."
                            as="span"
                        />
                    </p>
                </div>
                <div>
                    <button className="bg-[#FF5722] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F4511E] transition-all shadow-lg hover:shadow-[#FF5722]/50 transform hover:-translate-y-1">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    );
};
