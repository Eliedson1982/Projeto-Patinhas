document.addEventListener('DOMContentLoaded', function() {
    const entrarBtn = document.getElementById('entrarBtn');
    entrarBtn.addEventListener('click', fazerLogin);
  });
  
  async function fazerLogin(event) {
    event.preventDefault(); // Evita que a página seja atualizada
    const emailInput = document.getElementById('emailInput');
    const telefoneInput = document.getElementById('telefoneInput');
  
    const email = emailInput.value;
    const telefone = telefoneInput.value;
  
    // Aqui você precisa fazer a consulta ao banco de dados para verificar as informações
    try {
      const response = await fetch('/verificar-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, telefone })
      });

  
      const data = await response.json();

      window.alert(data.autenticado);
  
      if (data.autenticado) {
        // Login bem-sucedido, redirecionar para a página tela1
        window.location.href = '/tela1';
      } else {
        // Login falhou, exibir mensagem de erro
        alert('Credenciais inválidas. Por favor, verifique seu email e telefone.');
      }
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
  }
  
  function menuMobile() {
    var options = document.querySelector('.options');
    options.classList.toggle('active');
  }
  