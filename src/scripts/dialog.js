// This script handles the dialog functionality with data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Find all buttons with data-command attribute
  const buttons = document.querySelectorAll('[data-command]');
  
  buttons.forEach(button => {
    const command = button.getAttribute('data-command');
    const target = button.getAttribute('data-commandfor');
    
    if (command && target) {
      const targetElement = document.getElementById(target);
      
      if (targetElement) {
        button.addEventListener('click', () => {
          if (command === 'show-modal') {
            targetElement.showModal();
          } else if (command === 'close') {
            targetElement.close();
          }
        });
      }
    }
  });
  
  // Make each item's dialog unique by adding the item name to the ID
  const items = document.querySelectorAll('.menu-item');
  items.forEach((item, index) => {
    const dialog = item.querySelector('dialog');
    const showButton = item.querySelector('[data-command="show-modal"]');
    const closeButtons = item.querySelectorAll('[data-command="close"]');
    
    if (dialog && showButton) {
      // Set unique ID for the dialog
      const uniqueId = `dialog-${index}`;
      dialog.id = uniqueId;
      
      // Update the button to target this specific dialog
      showButton.setAttribute('data-commandfor', uniqueId);
      
      // Update close buttons
      closeButtons.forEach(btn => {
        btn.setAttribute('data-commandfor', uniqueId);
      });
    }
  });
});
