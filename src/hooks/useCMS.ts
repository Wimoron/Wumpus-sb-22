import { useState, useEffect } from 'react';
import { CMSData, DynamicPage, CMSSettings, CMSState } from '../types/cms';
import { cmsData as initialData } from '../data/cmsData';
import { defaultSettings } from '../data/defaultSettings';
import { samplePages } from '../data/samplePages';

export const useCMS = () => {
  const [state, setState] = useState<CMSState>({
    data: initialData,
    pages: samplePages,
    settings: defaultSettings,
    isEditing: false,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cmsState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(prev => ({
          ...prev,
          ...parsedState,
          isEditing: false, // Always start with editing disabled
        }));
      } catch (error) {
        console.error('Error loading CMS state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    const { isEditing, ...stateToSave } = state;
    localStorage.setItem('cmsState', JSON.stringify(stateToSave));
  }, [state]);

  const updateData = (newData: Partial<CMSData>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...newData }
    }));
  };

  const updateSettings = (newSettings: Partial<CMSSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const createPage = (page: Omit<DynamicPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: DynamicPage = {
      ...page,
      id: `page-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    return newPage;
  };

  const updatePage = (pageId: string, updates: Partial<DynamicPage>) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(page =>
        page.id === pageId
          ? { ...page, ...updates, updatedAt: new Date().toISOString() }
          : page
      )
    }));
  };

  const deletePage = (pageId: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== pageId)
    }));
  };

  const getPageBySlug = (slug: string): DynamicPage | undefined => {
    return state.pages.find(page => page.slug === slug && page.isPublished);
  };

  const resetData = () => {
    setState({
      data: initialData,
      pages: samplePages,
      settings: defaultSettings,
      isEditing: false,
    });
    localStorage.removeItem('cmsState');
  };

  const setIsEditing = (isEditing: boolean) => {
    setState(prev => ({ ...prev, isEditing }));
  };

  return {
    ...state,
    updateData,
    updateSettings,
    createPage,
    updatePage,
    deletePage,
    getPageBySlug,
    resetData,
    setIsEditing,
  };
};