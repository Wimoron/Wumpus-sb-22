import { useState, useEffect } from 'react';
import { CMSData } from '../types/cms';
import { cmsData as initialData } from '../data/cmsData';

export const useCMS = () => {
  const [data, setData] = useState<CMSData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cmsData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading CMS data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('cmsData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<CMSData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(initialData);
    localStorage.removeItem('cmsData');
  };

  return {
    data,
    updateData,
    resetData,
    isEditing,
    setIsEditing,
  };
};