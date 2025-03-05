const uploadBtn = document.querySelector("#upload-btn");
const inputUpload = document.querySelector("#image-upload");
const mainImagem = document.querySelector(".main-imagem");
const containerImagemNome = document.querySelector(".container-imagem-nome p");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      mainImagem.src = conteudoDoArquivo.url;
      containerImagemNome.innerText = conteudoDoArquivo.nome;
    } catch (error) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const inputTags = document.querySelector("#input-tags");
const listaTags = document.querySelector("#lista-tags");

inputTags.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const tagNova = document.createElement("li");
      tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
      listaTags.appendChild(tagNova);
      inputTags.value = "";
    }
  }
});

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagRemover = evento.target.parentElement;
    listaTags.removeChild(tagRemover);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Back-end",
  "Fullstack",
  "HTML",
  "CSS",
  "Javascript",
  "Progrmaçãp",
  "Data Science",
  "Java",
  "C#",
  "Angular",
  "React",
];

async function buscarTags() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis);
    }, 1000);
  });
}