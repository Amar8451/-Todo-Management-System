/**
 * Gets the current date formatted as YYYY-MM-DD in the local timezone.
 * @returns {string} Date string.
 */
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a YYYY-MM-DD date string into a user-friendly display date.
 * @param {string} dateStr - Date string in YYYY-MM-DD format.
 * @returns {string} Formatted display date (e.g., "Jul 14, 2026").
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  // Use UTC or local construction to avoid timezone shifts
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Checks if a task is overdue (past its due date and not completed).
 * @param {object} task - The task object.
 * @returns {boolean} True if overdue.
 */
export const isOverdue = (task) => {
  if (task.status === 'Completed' || !task.dueDate) return false;
  const todayStr = getTodayDateString();
  return task.dueDate < todayStr;
};

/**
 * Checks if a task is due today (due date matches today and not completed).
 * @param {object} task - The task object.
 * @returns {boolean} True if due today.
 */
export const isDueToday = (task) => {
  if (task.status === 'Completed' || !task.dueDate) return false;
  const todayStr = getTodayDateString();
  return task.dueDate === todayStr;
};

/**
 * Get numerical priority value for sorting purposes (High=3, Medium=2, Low=1).
 * @param {string} priority - Priority text.
 * @returns {number} Numeric weight.
 */
export const getPriorityWeight = (priority) => {
  switch (String(priority).toLowerCase()) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
};
