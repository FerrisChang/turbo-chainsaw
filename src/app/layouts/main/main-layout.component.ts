import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-container">
      <header class="header">
        <div class="logo">Turbo Chainsaw</div>
        <nav class="nav">
          <a routerLink="/" routerLinkActive="active">Home</a>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/profile" routerLinkActive="active">Profile</a>
        </nav>
      </header>
      
      <div class="content-container">
        <aside class="sidebar">
          <nav class="sidebar-nav">
            <a routerLink="/" routerLinkActive="active">Home</a>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/profile" routerLinkActive="active">Profile</a>
          </nav>
        </aside>
        
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .nav {
      display: flex;
      gap: 1rem;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    
    .nav a.active {
      background-color: #34495e;
    }
    
    .content-container {
      display: flex;
      flex: 1;
    }
    
    .sidebar {
      width: 250px;
      background-color: #f8f9fa;
      padding: 1rem;
    }
    
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .sidebar-nav a {
      padding: 0.5rem;
      text-decoration: none;
      color: #2c3e50;
      border-radius: 4px;
    }
    
    .sidebar-nav a.active {
      background-color: #e9ecef;
    }
    
    .main-content {
      flex: 1;
      padding: 2rem;
      background-color: white;
    }
  `]
})
export class MainLayoutComponent {} 