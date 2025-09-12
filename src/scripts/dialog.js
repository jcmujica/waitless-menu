// This script handles the dialog functionality with data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Find all buttons with data-command attribute (for any remaining dialogs not using the shared modal)
  const buttons = document.querySelectorAll('[data-command]');
  
  buttons.forEach(button => {
    const command = button.getAttribute('data-command');
    const target = button.getAttribute('data-commandfor');
    
    if (command && target && target !== 'shared-modal') { // Skip shared-modal as it's handled separately
      const targetElement = document.getElementById(target);
      
      if (targetElement) {
        button.addEventListener('click', () => {
          if (command === 'show-modal' && targetElement instanceof HTMLDialogElement) {
            targetElement.showModal();
          } else if (command === 'close' && targetElement instanceof HTMLDialogElement) {
            targetElement.close();
          }
        });
      }
    }
  });
});
