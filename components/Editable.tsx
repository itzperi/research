import React, { useRef, useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { EditableProps, EditableImageProps } from '../types';
import { Upload, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EditableText: React.FC<EditableProps> = ({
  id,
  defaultContent,
  className,
  as: Component = 'div'
}) => {
  const { isAdmin, content, updateContent } = useAdmin();
  const text = content[id] || defaultContent;
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(text);

  useEffect(() => {
    setTempValue(text);
  }, [text]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== text) {
      updateContent(id, tempValue);
    }
  };

  if (!isAdmin) {
    // @ts-ignore
    return <Component className={className}>{text}</Component>;
  }

  return (
    <div className="relative group w-full">
      {isEditing ? (
        // @ts-ignore
        <Component className={`${className} outline-none border-2 border-primary rounded px-1 min-w-[20px] bg-white text-black`}>
          <textarea
            autoFocus
            className="w-full h-full bg-transparent resize-none outline-none"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            rows={text.length > 50 ? 4 : 1}
          />
        </Component>
      ) : (
        // @ts-ignore
        <Component
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsEditing(true);
          }}
          className={`${className} cursor-text hover:bg-blue-50/50 hover:outline-dashed hover:outline-2 hover:outline-blue-400 rounded transition-all`}
        >
          {text}
        </Component>
      )}
      <span className="absolute -top-4 right-0 bg-primary text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Edit
      </span>
    </div>
  );
};

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultSrc,
  alt,
  className
}) => {
  const { isAdmin, content, updateContent } = useAdmin();
  const src = content[id] || defaultSrc;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateContent(id, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />

      {isAdmin && (
        <AnimatePresence>
          {isHovering && src !== '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 z-10 p-4"
            >
              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <Upload size={16} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm("Are you sure you want to remove this image?")) {
                      updateContent(id, ''); // Set empty string to 'delete'
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          )}
          {/* Show placeholder if deleted/empty so it can be restored */}
          {isAdmin && src === '' && (
            <div className="absolute inset-0 bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
              <p className="text-gray-400 text-xs mb-2">Image Removed</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Upload size={16} />
                Upload Image
              </button>
            </div>
          )}
        </AnimatePresence>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
