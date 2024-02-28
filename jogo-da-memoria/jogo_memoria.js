var imagens = [
  "https://promo.gympass.com/wp-content/uploads/2023/05/back_1-1.png", "https://promo.gympass.com/wp-content/uploads/2023/05/back_1-1.png",
  "https://promo.gympass.com/wp-content/uploads/2023/05/back_2-1.png", "https://promo.gympass.com/wp-content/uploads/2023/05/back_2-1.png",
  "https://promo.gympass.com/wp-content/uploads/2023/05/back_3-2.png", "https://promo.gympass.com/wp-content/uploads/2023/05/back_3-2.png",
  "https://promo.gympass.com/wp-content/uploads/2023/05/back_4-1.png", "https://promo.gympass.com/wp-content/uploads/2023/05/back_4-1.png",
  "https://promo.gympass.com/wp-content/uploads/2023/05/back_5-1.png", "https://promo.gympass.com/wp-content/uploads/2023/05/back_5-1.png",
];

// embaralha a matriz de imagens
imagens.sort(function() { return 0.5 - Math.random(); });

// variáveis para controlar o jogo
var ultimaImagem = null;

// variável para guardar o ID da imagem clicada
var imagemClicadaId = null;

// variaveis para corrigir multiplos cliques e alertas
let duasImagensAbertas = false;
let alertaExibido = false;

// função para clicar em uma imagem
function clicouImagem(imagem) {
  // retorna imediatamente se duas imagens já estão abertas
  if (duasImagensAbertas) {
    return;
  }

  // retorna se a imagem já tiver sido clicada antes ou tiver a classe correspondente
  if (imagem.classList.contains("clicado") || imagem.classList.contains("correspondente")) {
    return;
  }

  // atribui o ID da imagem clicada à variável imagemClicadaId
  imagemClicadaId = imagem.id;

  // revela a imagem clicada
  imagem.src = imagens[imagem.id];
  
  // se não houver outra imagem clicada, guarda a referência para essa imagem
  if (ultimaImagem === null) {
    ultimaImagem = imagem;
  } else {
    // se as duas imagens clicadas correspondem, mantém sua visibilidade
    if (ultimaImagem.src === imagem.src && ultimaImagem !== imagem) {
      ultimaImagem.classList.add("correspondente");
      imagem.classList.add("correspondente");
      ultimaImagem = null;
    } else {
       // aguarda um segundo e, em seguida, esconde as imagens clicadas
      duasImagensAbertas = true;
      setTimeout(() => {
        if (imagens.includes(ultimaImagem.src) && imagens.includes(imagem.src)) {
          ultimaImagem.src = `https://promo.gympass.com/wp-content/uploads/2023/05/freente_${Number(ultimaImagem.id) + 1}.png`;
          imagem.src = `https://promo.gympass.com/wp-content/uploads/2023/05/freente_${Number(imagem.id)+1}.png`;
        }
        ultimaImagem = null;
        duasImagensAbertas = false;
      }, 500);
    }
  }

  // verifica se todas as imagens correspondentes foram encontradas
  const correspondentes = document.querySelectorAll(".correspondente");
  if (correspondentes.length === imagens.length && !alertaExibido) {
    setTimeout(() => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");
      const image = document.createElement("img");
      image.src = "https://promo.gympass.com/wp-content/uploads/2023/05/img_alerta.png";
      image.classList.add("imgAlert");
      const messageText = document.createElement("p");
      messageText.textContent = "Parabéns, sua memória é ótima!";
      const additionalText = document.createElement("span");
      additionalText.textContent = "Lembre-se: para concorrer aos prêmios, você precisa ter preenchido o formulário e ter o cadastro gratuito no Gympass.";
      additionalText.classList.add("additional-textWin")
      const additionalText2 = document.createElement("span");
      additionalText2.textContent = "Ainda não tem cadastro? Clique abaixo.";
      additionalText2.style.fontWeight = "bold";
      additionalText2.style.fontSize = "22px";
      const lineBreak = document.createElement("br");
      const lineBreak2 = document.createElement("br");
      const linkButton = document.createElement("a");
      linkButton.textContent = "Clique aqui para se cadastrar";
      linkButton.href = "https://site.gympass.com/br/";
      linkButton.target = "_blank";
      linkButton.classList.add("link-button");
      const linkCloseButton = document.createElement("a");
      linkCloseButton.textContent = "X";
      linkCloseButton.href = "#";
      linkCloseButton.classList.add("link-closeButton");
      linkCloseButton.title = "Fechar";
      linkCloseButton.addEventListener("click", (event) => {
        event.preventDefault();
        messageContainer.remove();
      });
      messageText.appendChild(lineBreak);
      messageText.appendChild(additionalText);
      messageText.appendChild(lineBreak2);
      messageText.appendChild(additionalText2);
      messageContainer.appendChild(image);
      messageContainer.appendChild(messageText);
      messageContainer.appendChild(linkButton);
      messageContainer.appendChild(linkCloseButton);
      document.body.appendChild(messageContainer);
    }, 500);
    alertaExibido = true;
  };

   // deixa o tempo de jogo para 1 min e mostra o alerta abaixo caso as cartas nao sejam encontradas
   const mostrarMensagem = () => {
    if (!(correspondentes.length === imagens.length) && !alertaExibido) {
      setTimeout(() => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
  
        const image = document.createElement("img");
        image.src = "https://promo.gympass.com/wp-content/uploads/2023/05/img_alerta.png";
        image.classList.add("imgAlert");
        const messageText = document.createElement("p");
        messageText.textContent = "Foi por pouco, não desanime!";
        const additionalText = document.createElement("span");
        additionalText.textContent = "Pela participação você pode concorrer aos prêmios. Para isso, preencha o formulário e faça o seu cadastro gratuito no Gympass.";
        additionalText.classList.add("additional-textLose")
        const additionalText2 = document.createElement("span");
        additionalText2.textContent = "Ainda não tem cadastro? Clique abaixo.";
        additionalText2.style.fontWeight = "bold";
        additionalText2.style.fontSize = "22px";
        const lineBreak = document.createElement("br");
        const lineBreak2 = document.createElement("br");
        const linkButton = document.createElement("a");
        linkButton.textContent = "Clique aqui para se cadastrar";
        linkButton.href = "https://site.gympass.com/br/";
        linkButton.target = "_blank";
        linkButton.classList.add("link-button");
        const linkCloseButton = document.createElement("a");
        linkCloseButton.textContent = "X";
        linkCloseButton.href = "#";
        linkCloseButton.classList.add("link-closeButton");
        linkCloseButton.title = "Fechar";
        linkCloseButton.addEventListener("click", (event) => {
          event.preventDefault();
          messageContainer.remove();
          location.reload();
        });

        messageText.appendChild(lineBreak);
        messageText.appendChild(additionalText);
        messageText.appendChild(lineBreak2);
        messageText.appendChild(additionalText2);
        messageContainer.appendChild(linkCloseButton);
        messageContainer.appendChild(image);
        messageContainer.appendChild(messageText);
        messageContainer.appendChild(linkButton);
        document.body.appendChild(messageContainer);
      }, 500);
      alertaExibido = true;
    }
  };
  setTimeout(mostrarMensagem, 60000);
}

//adiciona um evento de clique em cada imagem
var imagensHtml = document.querySelectorAll(".imagem");
for (var i = 0; i < imagensHtml.length; i++) {
  imagensHtml[i].id = i;
  imagensHtml[i].addEventListener("click", function() {
    clicouImagem(this);
  });
}