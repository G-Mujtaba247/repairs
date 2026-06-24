/**
 * Modern Repairs CMS Design System
 * Shared design tokens for both website and admin
 */

export const colors = {
  primary: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3d66',
  },
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const bookingStatuses = [
  { value: 'pending', label: 'Pending', color: '#9ca3af', bgColor: '#f3f4f6' },
  { value: 'confirmed', label: 'Confirmed', color: '#3b82f6', bgColor: '#dbeafe' },
  { value: 'in_progress', label: 'In Progress', color: '#f59e0b', bgColor: '#fef3c7' },
  { value: 'completed', label: 'Completed', color: '#10b981', bgColor: '#d1fae5' },
  { value: 'cancelled', label: 'Cancelled', color: '#ef4444', bgColor: '#fee2e2' },
];

export const repairCategories = [
  { id: 'mobile', name: 'Mobile Phones' },
  { id: 'laptop', name: 'Laptops & PCs' },
  { id: 'tablet', name: 'Tablets' },
  { id: 'appliances', name: 'Home Appliances' },
];
