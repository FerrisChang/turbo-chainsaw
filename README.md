

.tab {
  cursor: pointer;
  padding: 8px 18px;
  margin-bottom: 16px;
  border-bottom: 1px solid $app-layout-border-color;
  
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 3px solid #e0e0e0;

  &.selected {
    background-color: #f0f0f0;
    border-bottom: 3px solid $app-primary;
  }
}
