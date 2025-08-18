 import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface QuickLink {
  id: string;
  name: string;
  description: string;
  searchParameters: any;
  type: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuickLinksService {
  private readonly STORAGE_KEY = 'company_search_quick_links';
  private quickLinksSubject = new BehaviorSubject<QuickLink[]>([]);
  public quickLinks$ = this.quickLinksSubject.asObservable();

  constructor() {
    this.loadQuickLinks();
  }

  private loadQuickLinks(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const quickLinks = JSON.parse(stored);
        this.quickLinksSubject.next(quickLinks);
      }
    } catch (error) {
      console.error('Error loading quick links from localStorage:', error);
      this.quickLinksSubject.next([]);
    }
  }

  private saveQuickLinks(quickLinks: QuickLink[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(quickLinks));
      this.quickLinksSubject.next(quickLinks);
    } catch (error) {
      console.error('Error saving quick links to localStorage:', error);
    }
  }

  addQuickLink(quickLink: QuickLink): void {
    const currentLinks = this.quickLinksSubject.value;
    const updatedLinks = [...currentLinks, quickLink];
    this.saveQuickLinks(updatedLinks);
  }

  removeQuickLink(id: string): void {
    const currentLinks = this.quickLinksSubject.value;
    const updatedLinks = currentLinks.filter(link => link.id !== id);
    this.saveQuickLinks(updatedLinks);
  }

  updateQuickLink(updatedLink: QuickLink): void {
    const currentLinks = this.quickLinksSubject.value;
    const updatedLinks = currentLinks.map(link => 
      link.id === updatedLink.id ? updatedLink : link
    );
    this.saveQuickLinks(updatedLinks);
  }

  getQuickLinks(): QuickLink[] {
    return this.quickLinksSubject.value;
  }

  getQuickLinksByType(type: string): QuickLink[] {
    return this.quickLinksSubject.value.filter(link => link.type === type);
  }

  clearAllQuickLinks(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.quickLinksSubject.next([]);
  }
}
