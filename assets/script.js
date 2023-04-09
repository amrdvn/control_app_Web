const form = document.querySelector(".form");
const usernameInput = form.querySelector("input[type='text']");
const passwordInput = form.querySelector("input[type='password']");

form.addEventListener("submit", function(event) {
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  
  if (usernameValue === "" || passwordValue === "") {
    event.preventDefault();
    const error = document.createElement("div");
    error.innerHTML = "Lütfen kullanıcı adı ve şifrenizi girin.";
    error.classList.add("error", "top");
    form.appendChild(error);
  } else {
    const error = form.querySelector(".error.top");
    if (error) {
      error.remove();
    }
  }

  
});
