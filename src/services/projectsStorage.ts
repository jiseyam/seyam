// Storage service for dynamic project management via LocalStorage
import type { Project } from '../types';
import { projects as defaultProjects } from '../data';

const STORAGE_KEY = 'seyam_portfolio_projects';

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [...defaultProjects];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...defaultProjects];
  } catch (err) {
    console.error('Error reading projects from LocalStorage:', err);
    return [...defaultProjects];
  }
}

export function saveProject(newProject: Project): Project[] {
  const current = getStoredProjects();
  // Filter out maintenance card if user adds a real project
  const filtered = current.filter(p => p.id !== 'under-maintenance');
  const updated = [newProject, ...filtered];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving project to LocalStorage:', err);
  }
  return updated;
}

export function deleteProject(id: string): Project[] {
  const current = getStoredProjects();
  let updated = current.filter(p => p.id !== id);
  if (updated.length === 0) {
    updated = [...defaultProjects];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting project from LocalStorage:', err);
  }
  return updated;
}

export function exportProjectsJSON(): void {
  const projects = getStoredProjects();
  const jsonStr = JSON.stringify(projects, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'projects.json';
  a.click();
  URL.revokeObjectURL(url);
}
