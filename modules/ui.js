const calcularUI = (msg) => {
  const resultado = document.getElementById("resultado");

  if (msg === "No hay sesión iniciada!") {
    resultado.innerHTML = "";

    // Show toast
    const calculateToast = document.getElementById("error-toast");
    const calculateToastBody = document.getElementById("error-toast-body");
    calculateToastBody.innerHTML = msg;

    const toast = new bootstrap.Toast(calculateToast);
    toast.show();
  } else {
    resultado.innerHTML = "Resultado: " + msg;
  }
};

const loginUI = (msg) => {
  if (msg === "Datos incorrectos!") {
    const error = document.getElementById("error-login-msg");
    error.innerHTML = msg;
  } else {
    // Hide modal
    const loginModal = bootstrap.Modal.getInstance(
      document.getElementById("login-modal")
    );
    loginModal.hide();

    // Show toast
    const toastElement = document.getElementById("success-toast");
    const toastBody = document.getElementById("success-toast-body");
    toastBody.innerHTML = "Bienvenido " + msg.login + "!";

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
};

const logoutUI = (msg) => {
  // Hide modal
  const logoutModal = bootstrap.Modal.getInstance(
    document.getElementById("logout-modal")
  );
  logoutModal.hide();

  // Show toast
  const toastElement = document.getElementById("success-toast");
  const toastBody = document.getElementById("success-toast-body");
  toastBody.innerHTML = msg;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
};

export { calcularUI, loginUI, logoutUI };
