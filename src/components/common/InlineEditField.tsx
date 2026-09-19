/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Pencil, Check, X } from 'lucide-react';

interface InlineEditFieldProps {
  value?: string | number | null;
  placeholder?: string;
  onSave: (newValue: string) => void;
  type?: 'text' | 'textarea' | 'number';
  className?: string;
  inputClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

export const InlineEditField: React.FC<InlineEditFieldProps> = ({
  value,
  placeholder = 'Click to edit...',
  onSave,
  type = 'text',
  className = '',
  inputClassName = '',
  as: Component = 'span',
  multiline = false,
}) => {
  const { isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(() => (value !== undefined && value !== null ? String(value) : ''));

  const stringVal = value !== undefined && value !== null ? String(value) : '';
  const displayValue = stringVal.trim() !== '' ? stringVal : null;

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    setTempValue(stringVal);
    setIsEditing(true);
  };

  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTempValue(stringVal);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div
        className="relative inline-flex items-center gap-1.5 w-full my-1 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {multiline || type === 'textarea' ? (
          <textarea
            autoFocus
            rows={3}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full p-2.5 text-sm bg-neutral-900 text-white rounded-xl border border-indigo-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${inputClassName}`}
          />
        ) : (
          <input
            autoFocus
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full px-3 py-1.5 text-sm bg-neutral-900 text-white rounded-lg border border-indigo-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${inputClassName}`}
          />
        )}
        <div className="flex flex-col gap-1 shrink-0">
          <button
            type="button"
            onClick={handleSave}
            title="Save"
            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            title="Cancel"
            className="p-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg shadow transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Normal view mode
  return (
    <Component
      onClick={handleStartEdit}
      className={`relative group/edit ${
        isEditMode
          ? 'cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-indigo-400 hover:bg-indigo-500/10 rounded px-1 transition-colors inline-block'
          : ''
      } ${className}`}
    >
      {displayValue ? (
        <span>{displayValue}</span>
      ) : (
        <span className="italic text-neutral-400 opacity-80 border-b border-dashed border-neutral-600">
          {placeholder}
        </span>
      )}

      {isEditMode && (
        <span
          className="inline-flex items-center justify-center ml-1.5 p-0.5 text-indigo-400 bg-indigo-950/80 border border-indigo-500/40 rounded opacity-70 group-hover/edit:opacity-100 group-hover/edit:scale-110 transition-all align-middle"
          title="Click to edit field"
        >
          <Pencil className="w-3 h-3" />
        </span>
      )}
    </Component>
  );
};
