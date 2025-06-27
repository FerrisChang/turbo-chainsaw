
                  <div class="custom-dropdown">
                    <button class="dropdown-toggle" (click)="toggleDropdown()">
                      {{ selectedOption || 'Select Example' }}
                      <span class="arrow">▼</span>
                    </button>
                    <ul class="dropdown-menu" [class.show]="isDropdownOpen">
                      <li (click)="selectOption('example1')">Example 1</li>
                      <li (click)="selectOption('example2')">Example 2</li>
                      <li (click)="selectOption('example3')">Example 3</li>
                    </ul>
                  </div>
