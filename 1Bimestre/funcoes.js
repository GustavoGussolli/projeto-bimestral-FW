var ancora = true;

function configEstiloCabecalho() {
    const bg = document.getElementById("corFundo").value;
    const corFonte = document.getElementById("corFonte").value;
    const tamFonte = document.getElementById("tamFonte").value;

    return `#cabecalho {
    background-color: ${bg};
    color: ${corFonte};
    font-size: ${tamFonte}pt;
}\n`;
}

function configEstiloLinks() {
    const corLink = document.getElementById("corLinks").value;
    const estiloSelecionado = document.querySelector('input[name="estiloLinks"]:checked');
    if (!estiloSelecionado) return "";
    const estiloLinks = estiloSelecionado.value;
    const decoration = estiloLinks == "0" ? "none" : "underline";

    return `a {
    color: ${corLink};
    text-decoration: ${decoration};
}\n`;
}

function configHtmlLinks() {
    if (!ancora) return "";
    const links = document.getElementsByName("links");
    const href = document.getElementsByName("href");
    let htmlLinks = "";

    for (let i = 0; i < links.length; i++) {
        const vet = href[i].value.split("\\");
        htmlLinks += `<a href="${vet[vet.length - 1]}">${links[i].value}</a><br>`;
    }
    return htmlLinks;
}

function configHTMLCabecalho() {
    const texto = document.getElementById("textoCabecalho").value;
    return `<h1>${texto}</h1>`;
}

function configHTMLConteudo() {
    let conteudo = document.getElementById("txtConteudo").value;
    const img = document.getElementById("imagem").files[0];
    const largura = document.getElementById("largura").value;
    const altura = document.getElementById("altura").value;

    if (img) {
        const imgSrc = img.name;
        conteudo += `<br><img src="${imgSrc}" width="${largura}" height="${altura}">`;
    }

    return conteudo;
}

function gerarCodigo() {
    const css = configEstiloCabecalho() + configEstiloLinks();
    document.getElementById("codeCSS").value = css;

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <div id="cabecalho">${configHTMLCabecalho()}</div>
    <nav id="links">${configHtmlLinks()}</nav>
    <div id="conteudo">${configHTMLConteudo()}</div>
</body>
</html>`;
    document.getElementById("codeHTML").value = html;
}

function download(campo, arquivo) {
    if (!arquivo.trim()) {
        arquivo = document.getElementById("nomeHTML").value + ".html";
    }
    const text = document.getElementById(campo).value;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function criarLinks() {

    const pai = document.getElementById("areaLinks");

    const link = document.createElement("input");
    link.setAttribute("type", "text");
    link.setAttribute("name", "links");
    link.setAttribute("placeholder", "nome do link");


    const href = document.createElement("input");
    href.setAttribute("type", "file");
    href.setAttribute("name", "href");
    href.setAttribute("onclick", "aviso()");


    const btAdicionar = document.createElement("button");
    btAdicionar.setAttribute("onclick", "criarLinks()");
    btAdicionar.textContent = "+";
    const btRemover = document.createElement("button");

    btRemover.textContent = "-";

    btRemover.onclick = function () {
        pai.removeChild(link);
        pai.removeChild(href);
        pai.removeChild(btAdicionar);
        pai.removeChild(btRemover);
        pai.removeChild(espaco);

    };

    const espaco = document.createElement("br");
        pai.appendChild(link);
        pai.appendChild(href);
        pai.appendChild(btAdicionar);
        pai.appendChild(btRemover);
        pai.appendChild(espaco);

}

function removeLinks(check) {
    ancora = !check.checked;
    document.getElementById("areaLinks").style.visibility = ancora ? "visible" : "hidden";
}

function renderIframe() {
    const iframe = document.getElementById('pagina');
    const htmlCode = document.getElementById('codeHTML').value;
    const cssCode = document.getElementById('codeCSS').value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    const style = document.createElement('style');
    style.textContent = cssCode;

    doc.head.appendChild(style);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
}

function mostraOcultaDiv(id) {
    document.querySelectorAll('.content').forEach(div => div.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function aviso() {
    alert("Para que o link funcione, o arquivo de destino deve estar no diretório do projeto.");
    return true;
}

