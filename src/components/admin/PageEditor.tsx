import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  Settings as SettingsIcon
} from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';
import { DynamicPage, PageSection } from '../../types/cms';
import { SectionEditor } from './SectionEditor';

const PageEditor: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { pages, createPage, updatePage } = useCMS();
  
  const isNew = pageId === 'new';
  const existingPage = isNew ? null : pages.find(p => p.id === pageId);
  
  const [page, setPage] = useState<Omit<DynamicPage, 'id' | 'createdAt' | 'updatedAt'>>({
    slug: '',
    title: '',
    description: '',
    isPublished: false,
    sections: [],
    seoTitle: '',
    seoDescription: '',
    featuredImage: '',
  });

  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  useEffect(() => {
    if (existingPage) {
      const { id, createdAt, updatedAt, ...pageData } = existingPage;
      setPage(pageData);
    }
  }, [existingPage]);

  const handleSave = () => {
    if (!page.title.trim() || !page.slug.trim()) {
      alert('Please fill in the title and slug fields.');
      return;
    }

    if (isNew) {
      const newPage = createPage(page);
      navigate(`/admin/pages/${newPage.id}/edit`);
    } else if (existingPage) {
      updatePage(existingPage.id, page);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPage(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seoTitle: prev.seoTitle || title,
    }));
  };

  const addSection = (type: PageSection['type']) => {
    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      type,
      title: '',
      content: '',
      backgroundColor: type === 'hero' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-white',
      textColor: type === 'hero' ? 'text-white' : 'text-gray-900',
      order: page.sections.length + 1,
    };

    setPage(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const sections = [...page.sections].sort((a, b) => a.order - b.order);
    const index = sections.findIndex(s => s.id === sectionId);
    
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < sections.length - 1)) {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
      
      // Update order values
      sections.forEach((section, i) => {
        section.order = i + 1;
      });
      
      setPage(prev => ({ ...prev, sections }));
    }
  };

  const sectionTypes = [
    { type: 'hero' as const, label: 'Hero Section', description: 'Large banner with title and description' },
    { type: 'text' as const, label: 'Text Content', description: 'Rich text content block' },
    { type: 'features' as const, label: 'Features', description: 'Grid of features with icons' },
    { type: 'testimonials' as const, label: 'Testimonials', description: 'Customer testimonials' },
    { type: 'gallery' as const, label: 'Image Gallery', description: 'Collection of images' },
    { type: 'contact' as const, label: 'Contact Form', description: 'Contact information and form' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/pages"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? 'Create New Page' : 'Edit Page'}
            </h1>
            <p className="text-gray-600">
              {isNew ? 'Build your page with sections' : `Editing: ${page.title}`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isNew && page.isPublished && (
            <Link
              to={`/${page.slug}`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Link>
          )}
          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'content', label: 'Content' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sections */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Sections</h2>
              
              {page.sections.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h3>
                  <p className="text-gray-500 mb-6">Add sections to build your page content</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {page.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <SectionEditor
                        key={section.id}
                        section={section}
                        onUpdate={(updates) => updateSection(section.id, updates)}
                        onDelete={() => deleteSection(section.id)}
                        onMove={(direction) => moveSection(section.id, direction)}
                        canMoveUp={section.order > 1}
                        canMoveDown={section.order < page.sections.length}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Section</h3>
              <div className="space-y-2">
                {sectionTypes.map((sectionType) => (
                  <button
                    key={sectionType.type}
                    onClick={() => addSection(sectionType.type)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors duration-200 group"
                  >
                    <div className="font-medium text-gray-900 group-hover:text-emerald-700">
                      {sectionType.label}
                    </div>
                    <div className="text-sm text-gray-500 group-hover:text-emerald-600">
                      {sectionType.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Page Settings</h2>
            
            {/* Basic Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter page title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /
                  </span>
                  <input
                    type="text"
                    value={page.slug}
                    onChange={(e) => setPage(prev => ({ ...prev, slug: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="page-url"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={page.description}
                  onChange={(e) => setPage(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Brief description of the page"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={page.isPublished}
                  onChange={(e) => setPage(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                  Publish this page
                </label>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-semibold text-gray-900 mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={page.seoTitle || ''}
                    onChange={(e) => setPage(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="SEO optimized title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    value={page.seoDescription || ''}
                    onChange={(e) => setPage(prev => ({ ...prev, seoDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Meta description for search engines"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageEditor;