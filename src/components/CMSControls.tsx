import React from 'react';
import { Edit3, Save, RotateCcw, Settings } from 'lucide-react';

interface CMSControlsProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onReset: () => void;
}

export const CMSControls: React.FC<CMSControlsProps> = ({
  isEditing,
  onToggleEdit,
  onReset,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-700/50 p-4 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleEdit}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              isEditing
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 animate-pulse" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 group"
            title="Reset to default content"
          >
            <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Reset</span>
          </button>

          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700/50 group">
            <Settings className="h-4 w-4 text-gray-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">CMS</span>
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 pt-3 border-t border-gray-700/50 animate-fade-in-up">
            <p className="text-xs text-gray-400 text-center animate-pulse">
              Click on any text to edit • Press Enter to save • ESC to cancel
            </p>
          </div>
        )}
      </div>
    </div>
  );
};