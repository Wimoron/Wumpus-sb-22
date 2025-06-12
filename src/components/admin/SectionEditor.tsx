import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Settings,
  Eye,
  EyeOff,
  Type,
  Image,
  Star,
  Grid3X3
} from 'lucide-react';
import { PageSection } from '../../types/cms';

interface SectionEditorProps {
  section: PageSection;
  onUpdate: (updates: Partial<PageSection>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onUpdate,
  onDelete,
  onMove,
  canMoveUp,
  canMoveDown,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const getSectionIcon = (type: PageSection['type']) => {
    switch (type) {
      case 'hero': return Type;
      case 'text': return Type;
      case 'image': return Image;
      case 'gallery': return Grid3X3;
      case 'features': return Star;
      case 'testimonials': return Star;
      case 'contact': return Type;
      default: return Type;
    }
  };

  const getSectionLabel = (type: PageSection['type']) => {
    switch (type) {
      case 'hero': return 'Hero Section';
      case 'text': return 'Text Content';
      case 'image': return 'Image';
      case 'gallery': return 'Gallery';
      case 'features': return 'Features';
      case 'testimonials': return 'Testimonials';
      case 'contact': return 'Contact';
      default: return 'Section';
    }
  };

  const backgroundOptions = [
    { value: 'bg-white', label: 'White', preview: '#ffffff' },
    { value: 'bg-gray-50', label: 'Light Gray', preview: '#f9fafb' },
    { value: 'bg-gray-100', label: 'Gray', preview: '#f3f4f6' },
    { value: 'bg-emerald-50', label: 'Light Emerald', preview: '#ecfdf5' },
    { value: 'bg-blue-50', label: 'Light Blue', preview: '#eff6ff' },
    { value: 'bg-gradient-to-br from-gray-900 to-gray-800', label: 'Dark Gradient', preview: '#1f2937' },
    { value: 'bg-gradient-to-br from-emerald-900 to-emerald-800', label: 'Emerald Gradient', preview: '#065f46' },
  ];

  const textColorOptions = [
    { value: 'text-gray-900', label: 'Dark', preview: '#111827' },
    { value: 'text-gray-700', label: 'Medium', preview: '#374151' },
    { value: 'text-white', label: 'White', preview: '#ffffff' },
    { value: 'text-emerald-600', label: 'Emerald', preview: '#059669' },
  ];

  const Icon = getSectionIcon(section.type);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-gray-500" />
          <div>
            <h3 className="font-medium text-gray-900">
              {section.title || getSectionLabel(section.type)}
            </h3>
            <p className="text-sm text-gray-500">{getSectionLabel(section.type)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="flex">
            <button
              onClick={() => onMove('up')}
              disabled={!canMoveUp}
              className="p-1 text-gray-400 hover:text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => onMove('down')}
              disabled={!canMoveDown}
              className="p-1 text-gray-400 hover:text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter section title"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={section.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={section.type === 'hero' ? 3 : 6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter section content"
            />
          </div>

          {/* Image URL for image sections */}
          {(section.type === 'image' || section.type === 'hero') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={section.imageUrl || ''}
                onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Features settings */}
          {section.type === 'features' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (JSON format)
              </label>
              <textarea
                value={JSON.stringify(section.settings?.features || [], null, 2)}
                onChange={(e) => {
                  try {
                    const features = JSON.parse(e.target.value);
                    onUpdate({ settings: { ...section.settings, features } });
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                placeholder='[{"icon": "Shield", "title": "Feature", "description": "Description"}]'
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: Array of objects with icon, title, and description
              </p>
            </div>
          )}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Section Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <select
                value={section.backgroundColor || 'bg-white'}
                onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {backgroundOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <select
                value={section.textColor || 'text-gray-900'}
                onChange={(e) => onUpdate({ textColor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {textColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};