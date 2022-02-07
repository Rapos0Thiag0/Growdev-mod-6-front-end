const url = "https://mod-6-be.herokuapp.com";
const urlDev = "http://localhost:8080";

// função que executa a requisição de acesso à aplicação.
async function login() {
  const usuario = document.querySelector("#usuarioNoLogin");
  const senha = document.querySelector("#senhaNoLogin");
  const modal1 = document.querySelector("#modal1");
  const modal2 = document.querySelector("#modal2");
  const botaoFecharModal1 = document.querySelector("#modal_1");
  const botaoFecharModal2 = document.querySelector("#modal_2");
  await axios
    .post(`${url}/signin`, { nome: usuario.value, senha: senha.value })
    .then((res) => {
      setUidKey(res.data);
      return res.data;
    })
    .then((res) => {
      console.log(res);
      resetarInputs();
      return (location.href = "recados.html?uid=" + res);
    })
    .catch((err) => {
      if (err.response.data.error === "PASS_ERROR") {
        modal1.style.display = "block";
      }
      if (err.response.data.error === "USER_NOT_FOUND_ERROR") {
        modal2.style.display = "block";
      }
      resetarInputs();
    });

  // função que apaga os campos de texto após acionado o botaoEntrarLogin.
  function resetarInputs() {
    document.querySelector("#usuarioNoLogin").value = "";
    document.querySelector("#senhaNoLogin").value = "";
  }

  botaoFecharModal1.addEventListener("click", () => {
    modal1.style.display = "none";
  });
  botaoFecharModal2.addEventListener("click", () => {
    modal2.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const botaoEntrar = document.querySelector("#botaoEntrarLogin");

  window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      login();
    }
  });

  botaoEntrar.addEventListener("click", () => {
    login();
  });
});

// função salva o uid do usuário logado no localStorage.
function setUidKey(userUid) {
  localStorage.setItem("user_uid", JSON.stringify(userUid));
}
