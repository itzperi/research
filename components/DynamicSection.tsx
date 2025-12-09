import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from './Editable';
import { Trash2 } from 'lucide-react';

interface CustomSection {
    id: string;
    type: 'text' | 'image-text';
    title: string;
    content: string;
    image?: string;
}

export const DynamicSections = () => {
    const { content, isAdmin, updateContent } = useAdmin();
    const sections: CustomSection[] = content['custom_sections'] ? JSON.parse(content['custom_sections']) : [];

    if (sections.length === 0) return null;

    const handleDelete = (id: string) => {
        if (!confirm('Area you sure you want to remove this section?')) return;
        const filtered = sections.filter(s => s.id !== id);
        updateContent('custom_sections', JSON.stringify(filtered)); // This will trigger unsaved changes state
    };

    const updateSectionField = (sectionId: string, field: keyof CustomSection, value: string) => {
        const updated = sections.map(s => s.id === sectionId ? { ...s, [field]: value } : s);
        updateContent('custom_sections', JSON.stringify(updated));
    };

    // Helper to sync EditableText output back to complex JSON structure
    // Since EditableText only syncs to flat keys, we need to bridge it or create a new prop for local updates.
    // HOWEVER, the simplest way is to map flat keys to this structure.
    // BUT the robust way is to use the existing flat structure: "section_ID_title".

    return (
        <div className='flex flex-col gap-12 py-12'>
            {sections.map((section) => (
                <div key={section.id} className="relative group">
                    {isAdmin && (
                        <button
                            onClick={() => handleDelete(section.id)}
                            className="absolute top-4 right-4 z-20 p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                            title="Remove Section"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}

                    {section.type === 'text' && (
                        <section className="py-16 px-6 lg:px-12 bg-gray-50">
                            <div className="max-w-4xl mx-auto text-center">
                                {/* 
                    We use a trick: we rely on the flat key existence if we want to use exact existing components. 
                    But arrays make this hard. 
                    BETTER APPROACH for V1:
                    Just accept that we might need to "unroll" these into the content map upon creation?
                    OR we just pass a custom onChange handler to EditableText? 
                    EditableText expects an ID. Let's make "sections" simpler: 
                    The DynamicSections component READS from the JSON, but the Editable components 
                    WRITE to flat keys like "custom_section_{ID}_title".
                    
                    When saving, we can consolidate OR we just look up those keys during render. 
                 */}
                                <EditableText
                                    id={`section_${section.id}_title`}
                                    defaultContent={section.title}
                                    as="h2"
                                    className="text-3xl font-bold mb-6"
                                />
                                <EditableText
                                    id={`section_${section.id}_content`}
                                    defaultContent={section.content}
                                    as="div"
                                    className="prose prose-lg mx-auto text-gray-600"
                                />
                            </div>
                        </section>
                    )}

                    {section.type === 'image-text' && (
                        <section className="py-16 px-6 lg:px-12">
                            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                                <div className="order-2 md:order-1">
                                    <EditableText
                                        id={`section_${section.id}_title`}
                                        defaultContent={section.title}
                                        as="h2"
                                        className="text-3xl font-bold mb-4"
                                    />
                                    <EditableText
                                        id={`section_${section.id}_content`}
                                        defaultContent={section.content}
                                        as="div"
                                        className="prose text-gray-600 mb-8"
                                    />
                                </div>
                                <div className="order-1 md:order-2 h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                    <EditableImage
                                        id={`section_${section.id}_image`}
                                        defaultSrc={section.image || ""}
                                        alt="Section Image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            ))}
        </div>
    );
};
