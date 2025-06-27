  .example-dropdown {
    background-color: #87CEEB;
    border-color: #87CEEB;
    color: #333;
    text-align: center;
    text-align-last: center;
    padding: 8px 16px;
    min-width: 150px;
    
    option {
      text-align: center;
      text-align-last: center;
    }
  }

  .custom-dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    background-color: #1976d2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    min-width: 150px;
    text-align: center;
  }

  .dropdown-toggle:hover {
    background-color: #115293;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;
    margin-top: 2px;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-menu li {
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    text-align: center;
  }

  .dropdown-menu li:last-child {
    border-bottom: none;
  }

  .dropdown-menu li:hover {
    background-color: #f5f5f5;
  }
