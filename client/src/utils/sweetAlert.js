import Swal from 'sweetalert2';

const getSwalConfig = () => {
  const isDark = document.documentElement.classList.contains('dark');
  
  return {
    background: isDark ? '#1f2937' : '#ffffff',
    color: isDark ? '#f3f4f6' : '#111827',
    customClass: {
      popup: 'rounded-lg shadow-2xl',
      title: 'text-xl font-bold',
      htmlContainer: 'text-sm',
      confirmButton: 'btn btn-primary rounded-lg px-6 py-2.5 font-medium',
      cancelButton: 'btn btn-secondary rounded-lg px-6 py-2.5 font-medium',
      actions: 'gap-3'
    },
    buttonsStyling: false,
  };
};

export const confirmDelete = async (options = {}) => {
  const config = getSwalConfig();
  
  const result = await Swal.fire({
    title: options.title || 'Delete Todo?',
    text: options.text || 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: options.confirmText || 'Yes, delete it!',
    cancelButtonText: options.cancelText || 'Cancel',
    reverseButtons: true,
    focusCancel: true,
    ...config,
    customClass: {
      ...config.customClass,
      confirmButton: 'btn btn-danger rounded-lg px-6 py-2.5 font-medium',
    }
  });

  return result.isConfirmed;
};


export const showSuccess = async (title, text) => {
  const config = getSwalConfig();
  
  await Swal.fire({
    title,
    text,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    ...config,
  });
};

export const showError = async (title, text) => {
  const config = getSwalConfig();
  
  await Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    ...config,
  });
};


export const showInfo = async (title, text) => {
  const config = getSwalConfig();
  
  await Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'OK',
    ...config,
  });
};


export const confirmAction = async (options = {}) => {
  const config = getSwalConfig();
  
  const result = await Swal.fire({
    title: options.title || 'Are you sure?',
    text: options.text || '',
    icon: options.icon || 'question',
    showCancelButton: true,
    confirmButtonText: options.confirmText || 'Confirm',
    cancelButtonText: options.cancelText || 'Cancel',
    reverseButtons: true,
    ...config,
  });

  return result.isConfirmed;
};

