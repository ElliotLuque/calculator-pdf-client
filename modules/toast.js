const showToast = (type, message) => {
  const toastElement = document.getElementById(type);
  const toastBody = document.getElementById(type + "-body");
  toastBody.innerHTML = message;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}


export { showToast };
