import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h2>Welcome</h2>
          <p>This is your dashboard. Start building your application here!</p>
        </div>
        <div class="dashboard-card">
          <h2>Quick Stats</h2>
          <p>Your application statistics will appear here.</p>
        </div>
        <div class="dashboard-card">
          <h2>Recent Activity</h2>
          <p>Recent user activities will be displayed here.</p>
        </div>
      </div>
      <app-loading [isLoading]="false"></app-loading>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .dashboard-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .dashboard-card h2 {
      margin-top: 0;
      color: #2c3e50;
    }
    
    .dashboard-card p {
      color: #666;
    }
  `]
})
export class DashboardComponent {} 