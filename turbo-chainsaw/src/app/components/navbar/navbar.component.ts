import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/" class="logo">Turbo Chainsaw</a>
      </div>
      
      <div class="navbar-menu">
        <!-- Main Navigation -->
        <div class="navbar-start">
          <a routerLink="/" routerLinkActive="active" class="navbar-item">Home</a>
          <a routerLink="/dashboard" routerLinkActive="active" class="navbar-item">Dashboard</a>
          <a routerLink="/profile" routerLinkActive="active" class="navbar-item">Profile</a>
          
          <!-- Trading Card Games Dropdown -->
          <div class="dropdown">
            <button class="navbar-item dropdown-trigger">
              Trading Card Games
              <span class="dropdown-arrow">▼</span>
            </button>
            <div class="dropdown-content">
              <a routerLink="/pokemon" class="dropdown-item">Pokemon</a>
              <a routerLink="/yugioh" class="dropdown-item">Yu-Gi-Oh!</a>
              <a routerLink="/magic" class="dropdown-item">Magic: The Gathering</a>
              <a routerLink="/lorcana" class="dropdown-item">Disney Lorcana</a>
              <a routerLink="/digimon" class="dropdown-item">Digimon</a>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="navbar-center">
          <div class="search-container">
            <input type="text" class="search-input" placeholder="Search...">
            <button class="search-button">
              <span class="search-icon">🔍</span>
            </button>
          </div>
        </div>

        <!-- User Menu -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="user-menu">
              <div class="user-avatar">
                <img src="assets/images/placeholder-avatar.png" alt="User Avatar" class="avatar">
              </div>
              <div class="user-info">
                <span class="username">John Doe</span>
                <span class="user-role">Administrator</span>
              </div>
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item">Settings</a>
                <a href="#" class="dropdown-item">Profile</a>
                <a href="#" class="dropdown-item">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #2c3e50;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .logo {
      color: white;
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: space-between;
      margin: 0 2rem;
    }

    .navbar-start {
      display: flex;
      gap: 1rem;
    }

    .navbar-center {
      flex: 1;
      max-width: 500px;
      margin: 0 2rem;
    }

    .navbar-end {
      display: flex;
      align-items: center;
    }

    .navbar-item {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
      background: none;
      border: none;
      cursor: pointer;
      font-size: inherit;
      font-family: inherit;
    }

    .navbar-item:hover {
      background-color: #34495e;
    }

    .navbar-item.active {
      background-color: #34495e;
    }

    /* Trading Card Games Dropdown Styles */
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dropdown-arrow {
      font-size: 0.8rem;
      transition: transform 0.3s;
    }

    .dropdown:hover .dropdown-arrow {
      transform: rotate(180deg);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: white;
      min-width: 200px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
      z-index: 1000;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-content .dropdown-item {
      color: #2c3e50;
      padding: 0.75rem 1rem;
      text-decoration: none;
      display: block;
      transition: background-color 0.3s;
    }

    .dropdown-content .dropdown-item:hover {
      background-color: #f8f9fa;
    }

    .search-container {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 4px;
      padding: 0.25rem;
    }

    .search-input {
      border: none;
      padding: 0.5rem;
      flex: 1;
      outline: none;
    }

    .search-button {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
    }

    .user-menu {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.5rem;
    }

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .username {
      font-weight: bold;
    }

    .user-role {
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: none;
      min-width: 150px;
    }

    .user-menu:hover .dropdown-menu {
      display: block;
    }

    .dropdown-item {
      display: block;
      padding: 0.5rem 1rem;
      color: #2c3e50;
      text-decoration: none;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class NavbarComponent {} 