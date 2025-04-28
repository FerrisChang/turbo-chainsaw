

  #map {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height:  460px;
  }
  .input-container {
    margin-left: 2em;
  }

    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
      
      html {
        height: -webkit-fill-available;
      }
      
      main {
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
      }
      
      .dropdown-toggle { outline: 0; }
      
      .btn-toggle {
        padding: .25rem .5rem;
        font-weight: 600;
        color: var(--bs-emphasis-color);
        background-color: transparent;
      }
      .btn-toggle:hover,
      .btn-toggle:focus {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
        background-color: var(--bs-tertiary-bg);
      }
       
      
      .btn-toggle[aria-expanded="true"] {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
      }
      .btn-toggle[aria-expanded="true"]::before {
        transform: rotate(90deg);
      }
      
      .btn-toggle-nav a {
        padding: .1875rem .5rem;
        margin-top: .125rem;
        margin-left: 1.25rem;
      }
      .btn-toggle-nav a:hover,
      .btn-toggle-nav a:focus {
        background-color: var(--bs-tertiary-bg);
      }
      
      .scrollarea {
        overflow-y: auto;
      }
    
    
      .navbar-svg-icon {
        position:relative;
        top:-2px;
        margin-right: 5px
    }
    
    .navbar-svg-icon-inactive {
      position:relative; 
      margin-right: 5px
    }
    
    .btn-filter {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
       ;
    }
    
    .navbar-btn-hover:hover {
      background-color: rgb(225, 236, 247);
      border-radius: 5px;
      
    }
    
    
    .btn-filter:hover {
       color: rgb(8, 67, 230);
    }
    
    mat-sidenav {
      width: 350px;
    }
      
  .widget-card {
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
    border-color: rgb(142, 153, 163);
    }
    
    
    .card-hdr-class {
      background:  rgb(0, 60, 110);
      color: white;
    }
    
    .example-accordion {
      display: block;
      max-width: 500px;
    }
    
    .example-accordion-item {
      display: block;
      border: solid 1px #ccc;
    }
    
    .example-accordion-item + .example-accordion-item {
      border-top: none;
    }
    
    .example-accordion-item-header {
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
    
    .example-accordion-item-description {
      font-size: 0.85em;
      color: #999;
    }
    
    .example-accordion-item-header,
    .example-accordion-item-body {
      padding: 16px;
    }
    
    .example-accordion-item-header:hover {
      cursor: pointer;
      background-color: #eee;
    }
    
    .example-accordion-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .example-accordion-item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .search-form-field {
      width: 200px;
    }
