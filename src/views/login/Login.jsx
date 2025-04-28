import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate()

  function doLogin() {
    const formLogin = document.getElementById("form-login");
    const formDataLogin = new FormData(formLogin);
    const data = Object.fromEntries(formDataLogin);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("token", response.token);
        navigate('/dashboard')
      });
  }
  return (
    <>
      <form id="form-login">
        <div>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Senha" />
        </div>
        <div>
          <button type="button" onClick={doLogin}>
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
