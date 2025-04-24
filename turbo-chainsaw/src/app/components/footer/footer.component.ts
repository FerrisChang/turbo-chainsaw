/**
 * Footer component for the Turbo Chainsaw application.
 * Provides a responsive footer layout with multiple sections:
 * - Company information and social media links
 * - Quick navigation links
 * - Resource links
 * - Contact information
 * - Copyright and legal links
 * 
 * The footer is styled with a dark theme and includes hover effects for interactive elements.
 * It's fully responsive and adapts to different screen sizes using CSS Grid and Flexbox.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Main footer container -->
    <footer class="footer">
      <div class="footer-content">
        <!-- Company Info Section -->
        <div class="footer-section">
          <h3 class="footer-title">Turbo Chainsaw</h3>
          <p class="footer-description">
            Building the future with cutting-edge technology and innovative solutions.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <span class="social-icon">𝕏</span>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <span class="social-icon">in</span>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <span class="social-icon">Git</span>
            </a>
          </div>
        </div>

        <!-- Navigation Links Section -->
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a routerLink="/" class="footer-link">Home</a></li>
            <li><a routerLink="/dashboard" class="footer-link">Dashboard</a></li>
            <li><a routerLink="/profile" class="footer-link">Profile</a></li>
            <li><a href="#" class="footer-link">Documentation</a></li>
          </ul>
        </div>

        <!-- Resources Section -->
        <div class="footer-section">
          <h3 class="footer-title">Resources</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Blog</a></li>
            <li><a href="#" class="footer-link">Tutorials</a></li>
            <li><a href="#" class="footer-link">API Reference</a></li>
            <li><a href="#" class="footer-link">Support</a></li>
          </ul>
        </div>

        <!-- Contact Information Section -->
        <div class="footer-section">
          <h3 class="footer-title">Contact Us</h3>
          <ul class="footer-contact">
            <li class="contact-item">
              <span class="contact-icon">📧</span>
              <a href="mailto:info&#64;turbo-chainsaw.com" class="footer-link">info&#64;turbo-chainsaw.com</a>
            </li>
            <li class="contact-item">
              <span class="contact-icon">📞</span>
              <a href="tel:+1234567890" class="footer-link">+1 (234) 567-890</a>
            </li>
            <li class="contact-item">
              <span class="contact-icon">📍</span>
              <span class="address">123 Tech Street, Silicon Valley, CA 94025</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright and Legal Section -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} Turbo Chainsaw. All rights reserved.
        </p>
        <div class="legal-links">
          <a href="#" class="legal-link">Privacy Policy</a>
          <a href="#" class="legal-link">Terms of Service</a>
          <a href="#" class="legal-link">Cookie Policy</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #2c3e50;
      color: #ecf0f1;
      padding: 3rem 1rem 1rem;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #34495e;
    }

    .footer-section {
      padding: 0 1rem;
    }

    .footer-title {
      color: #fff;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .footer-description {
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-link {
      color: #ecf0f1;
      text-decoration: none;
      transition: color 0.3s;
    }

    .social-link:hover {
      color: #3498db;
    }

    .social-icon {
      font-size: 1.2rem;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-link {
      color: #ecf0f1;
      text-decoration: none;
      display: block;
      padding: 0.5rem 0;
      transition: color 0.3s;
    }

    .footer-link:hover {
      color: #3498db;
    }

    .footer-contact {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    .contact-icon {
      font-size: 1.2rem;
    }

    .address {
      line-height: 1.4;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .copyright {
      margin: 0;
      font-size: 0.9rem;
    }

    .legal-links {
      display: flex;
      gap: 1rem;
    }

    .legal-link {
      color: #ecf0f1;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s;
    }

    .legal-link:hover {
      color: #3498db;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }

      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }

      .legal-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  /** Current year for the copyright notice */
  currentYear: number = new Date().getFullYear();
} 