import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="home-container">
      <!-- Navbar -->
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
      
      <main class="main-content">
        <!-- Hero Section -->
        <section class="hero-section" [class.scrolled]="isScrolled">
          <div class="hero-content">
            <h1 class="hero-title">Welcome to Turbo Chainsaw</h1>
            <p class="hero-subtitle">Your cutting-edge solution for modern web applications</p>
            <div class="cta-buttons">
              <a routerLink="/dashboard" class="cta-button primary">Get Started</a>
              <a href="#features" class="cta-button secondary">Learn More</a>
            </div>
          </div>
          <div class="hero-image">
            <div class="abstract-shape"></div>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="features-section">
          <h2 class="section-title">Key Features</h2>
          <div class="features-grid">
            <div class="feature-card" *ngFor="let feature of features; let i = index"
                 [class.animate]="isInViewport(i)">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <!-- Statistics Section -->
        <section class="stats-section">
          <div class="stats-container">
            <div class="stat-item" *ngFor="let stat of statistics">
              <div class="stat-number" [attr.data-target]="stat.value">
                {{ stat.value }}{{ stat.suffix }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </section>

        <!-- How It Works Section -->
        <section class="how-it-works-section">
          <h2 class="section-title">How It Works</h2>
          <div class="steps-container">
            <div class="step" *ngFor="let step of steps; let i = index">
              <div class="step-number">{{ i + 1 }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </section>

        <!-- Call to Action Section -->
        <section class="cta-section">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Get Started?</h2>
            <p class="cta-description">Join thousands of developers building amazing applications</p>
            <div class="cta-buttons">
              <a routerLink="/dashboard" class="cta-button primary">Start Building</a>
              <a routerLink="/contact" class="cta-button secondary">Contact Sales</a>
            </div>
          </div>
        </section>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
    }

    /* Navbar Styles */
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

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      padding: 6rem 2rem;
      position: relative;
      overflow: hidden;
      color: white;
      transition: padding 0.3s ease;
    }

    .hero-section.scrolled {
      padding: 4rem 2rem;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      animation: fadeInUp 1s ease;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: 2rem;
      animation: fadeInUp 1s ease 0.2s;
    }

    .hero-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
    }

    .abstract-shape {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 70% 50%, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 70%);
      animation: pulse 4s ease-in-out infinite;
    }

    /* Features Section */
    .features-section {
      padding: 6rem 2rem;
      background-color: white;
    }

    .section-title {
      text-align: center;
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    }

    .feature-card.animate {
      opacity: 1;
      transform: translateY(0);
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    /* Statistics Section */
    .stats-section {
      background-color: #f8f9fa;
      padding: 4rem 2rem;
    }

    .stats-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto;
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
      min-width: 200px;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 1.1rem;
    }

    /* How It Works Section */
    .how-it-works-section {
      padding: 6rem 2rem;
      background-color: white;
    }

    .steps-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .step {
      text-align: center;
      padding: 2rem;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background-color: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-weight: 600;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
      padding: 6rem 2rem;
      color: white;
      text-align: center;
    }

    .cta-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-description {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    /* Buttons */
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .cta-button {
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .cta-button.primary {
      background-color: #3498db;
      color: white;
    }

    .cta-button.primary:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }

    .cta-button.secondary {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      backdrop-filter: blur(10px);
    }

    .cta-button.secondary:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0.5;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .stats-container {
        flex-direction: column;
      }

      .hero-image {
        display: none;
      }

      .navbar-menu {
        flex-direction: column;
        margin: 1rem 0;
      }

      .navbar-start, .navbar-center, .navbar-end {
        width: 100%;
        margin: 0.5rem 0;
      }

      .dropdown-content {
        position: static;
        display: none;
        width: 100%;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }
    }
  `]
})
export class HomeComponent {
  isScrolled = false;
  features = [
    {
      icon: '🚀',
      title: 'High Performance',
      description: 'Lightning-fast performance optimized for modern web applications'
    },
    {
      icon: '🛡️',
      title: 'Secure',
      description: 'Built with security best practices and regular updates'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Perfect experience across all devices and screen sizes'
    },
    {
      icon: '🔄',
      title: 'Real-time Updates',
      description: 'Instant data synchronization and live updates'
    },
    {
      icon: '⚡',
      title: 'Easy Integration',
      description: 'Seamless integration with existing systems and APIs'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Comprehensive insights and performance metrics'
    }
  ];

  statistics = [
    { value: '10K+', label: 'Active Users', suffix: '+' },
    { value: '99.9', label: 'Uptime', suffix: '%' },
    { value: '50M+', label: 'API Requests', suffix: '+' },
    { value: '24/7', label: 'Support', suffix: '' }
  ];

  steps = [
    {
      title: 'Sign Up',
      description: 'Create your account in seconds'
    },
    {
      title: 'Configure',
      description: 'Set up your project preferences'
    },
    {
      title: 'Deploy',
      description: 'Launch your application instantly'
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  isInViewport(index: number): boolean {
    // Simple implementation - in real app, use Intersection Observer
    return true;
  }
} 