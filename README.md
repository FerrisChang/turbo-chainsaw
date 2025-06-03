.side-by-side-row{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.form-input-container{
  flex:1;
  margin-right: 1rem;
}

.form-control{
  width: 100%;
  padding:0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}
.dropdown{
  width: 100%;
}
label{
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}
.hidden{display:none;}







  .dropdown{
    position:relative;
  }
  .dropdown option{
    position:absolute;
    top:100%;
    left:0;
    z-index: 10;
    background: white;
    width:100%;
    border: 1px, solid #CCC;
    max-height: 200px;
    overflow-y: auto;
  }
  .form-page-banner {
    position: relative;
    background-color: #0f3b60;
    padding: 12rem 10rem 5rem 10rem;
    box-shadow: 0 4px 8px rgba(89, 89, 89, 0.276);
    color: white;
    background-image: url(/modern-search.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .form-page-banner::before {
    content: '';
    position: absolute;
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .form-page-banner-title {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  .form-page-banner-subtitle {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  .main-container {
    display: flex;
    align-items: flex-start;
    gap: 2rem; 
    margin-top: 2rem;
  }
  
  .side-panel {
    width: 200px;
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .side-panel-instruction {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-container {
    width: 800px;
    max-width: 100%;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  .extra-margin {
    margin-top: 0rem;
  }
  
  .form-type-label {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .form-section {
    margin-bottom: 1.5rem;
  }
  
  label {
    font-weight: bold;
    color: #555;
    display: block;
    margin-bottom: 5px;
  }
  
  .form-input-container {
    width: 100%;
  }
  
  input[type="text"],
  input[type="date"],
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  input:focus,
  textarea:focus {
    border-color: #1976d2;
    outline: none;
    box-shadow: 0 0 8px rgba(25, 118, 210, 0.1);
  }
  
  .invalid-feedback {
    color: red;
    font-size: 0.875em;
  }
  
  .display-results-textarea {
    width: 100%;
    height: 38em;
    font-family: monospace;
    font-size: 1rem;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 1rem;
    resize: vertical;
  }
  
  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
  
  button {
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button.btn-primary {
    background-color: #1976d2;
    color: #fff;
    border: none;
    cursor: pointer;

    &.selected {
      background-color: #115293;
    }
  }
  
  button.btn-primary:hover {
    background-color: #115293;
  }
  
  button.btn-secondary {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ccc;
  }
  
  button.btn-secondary:hover {
    background-color: #e0e0e0;
  }
  
  @media (max-width: 600px) {
    .outer-container {
      margin-left: 1rem;
    }
  
    .main-container {
      flex-direction: column;
    }
  
    .side-panel {
      width: 100%;
      margin-bottom: 1rem;
    }
  
    .form-container {
      width: 100%;
    }
  }
  .alert-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
