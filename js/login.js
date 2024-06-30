document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ usuario, contraseña })
  });

  try {
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('jwt_token', data.token);
      console.log('Token almacenado en localStorage:', data.token);
      console.log('Redirigiendo a:', data.redirectUrl);
      window.location.href = String(data.redirectUrl); // Asegúrate de que data.redirectUrl sea una cadena válida
    } else {
      alert(data.error || 'Error en el inicio de sesión');
    }
  } catch (error) {
    console.error('Error al parsear la respuesta JSON:', error);
    alert('Error interno al procesar la respuesta del servidor');
  }
});
