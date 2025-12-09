import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, Plus, Image, ChevronUp, ChevronDown } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export const AdminControlPanel = () => {
    const { isAdmin, hasUnsavedChanges, saveChanges, discardChanges, updateContent, content } = useAdmin();
    const [isOpen, setIsOpen] = useState(true);
    const [newSectionType, setNewSectionType] = useState<string | null>(null);

    if (!isAdmin) return null;

    const handleAddSection = (type: 'text' | 'image-text') => {
        // 1. Generate a unique ID for the new section
        const sectionId = `custom_section_${Date.now()}`;

        // 2. Add to content state (this will trigger re-render and saving flow)
        // We store the section ORDER and TYPE in a special key "section_order" if we want ordering,
        // OR we just append to a known list. For simplicity, let's assume we managing a list of custom sections.

        const currentSections = content['custom_sections'] ? JSON.parse(content['custom_sections']) : [];
        currentSections.push({
            id: sectionId,
            type: type,
            title: 'New Section Title',
            content: 'Add your content here...',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        });

        updateContent('custom_sections', JSON.stringify(currentSections));
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">

            {/* Unsaved Changes Notification */}
            <AnimatePresence>
                {hasUnsavedChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white p-4 rounded-xl shadow-2xl border-l-4 border-yellow-500 pointer-events-auto flex items-center gap-4 mb-2 max-w-sm"
                    >
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-800">Unsaved Changes</p>
                            <p className="text-xs text-gray-500">Changes are visible only to you until saved.</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={discardChanges}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Discard Changes"
                            >
                                <RotateCcw size={18} />
                            </button>
                            <button
                                onClick={saveChanges}
                                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2"
                            >
                                <Save size={16} />
                                Save Live
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Control Panel */}
            <div className="pointer-events-auto shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100 w-72">
                <div
                    className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-bold text-sm">Admin Control</span>
                    </div>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Add Content</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleAddSection('text')}
                                            className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-primary/5 rounded-xl border border-dashed border-gray-300 hover:border-primary transition-all group"
                                        >
                                            <Plus size={20} className="text-gray-400 group-hover:text-primary" />
                                            <span className="text-xs font-medium text-gray-600 group-hover:text-primary">Text Block</span>
                                        </button>
                                        <button
                                            onClick={() => handleAddSection('image-text')}
                                            className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-primary/5 rounded-xl border border-dashed border-gray-300 hover:border-primary transition-all group"
                                        >
                                            <Image size={20} className="text-gray-400 group-hover:text-primary" />
                                            <span className="text-xs font-medium text-gray-600 group-hover:text-primary">Image + Text</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 text-center">v1.2.0 • Auto-save disabled</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
