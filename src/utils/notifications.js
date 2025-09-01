// Notification utility for displaying styled messages

export const showNotification = (message, type = 'success', duration = 3000) => {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Auto-remove after duration
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300); // Match fade-out animation duration
  }, duration);
};

export const showSuccess = (message, duration) => showNotification(message, 'success', duration);
export const showError = (message, duration) => showNotification(message, 'error', duration);
export const showInfo = (message, duration) => showNotification(message, 'info', duration);

// Custom confirmation dialog
export const showConfirmation = (title, message) => {
  return new Promise((resolve) => {
    // Remove any existing confirmation dialogs
    const existingDialogs = document.querySelectorAll('.confirmation-overlay');
    existingDialogs.forEach(dialog => dialog.remove());

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'confirmation-overlay';

    // Create dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';

    // Create content
    dialog.innerHTML = `
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="confirmation-actions">
        <button class="secondary cancel-btn">Cancel</button>
        <button class="contrast confirm-btn">Delete</button>
      </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Handle button clicks
    const cancelBtn = dialog.querySelector('.cancel-btn');
    const confirmBtn = dialog.querySelector('.confirm-btn');

    const cleanup = () => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };

    cancelBtn.addEventListener('click', () => {
      cleanup();
      resolve(false);
    });

    confirmBtn.addEventListener('click', () => {
      cleanup();
      resolve(true);
    });

    // Handle clicking outside the dialog
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(false);
      }
    });

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        cleanup();
        resolve(false);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  });
};
