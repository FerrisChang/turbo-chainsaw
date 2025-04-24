/**
 * Root component of the Turbo Chainsaw application.
 * This component serves as the main entry point and container for all other components.
 * It currently renders the HomeComponent which contains the main layout and content.
 */
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HomeComponent],
    template: `
        <app-home></app-home>
    `,
    styles: []
})
export class AppComponent {
    /** The title of the application */
    title = 'turbo-chainsaw';
}
