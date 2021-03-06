const MaskCep = value => {
  return value
    .replace(/-\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d{3})/, '$1-$2') // captura 2 grupos de numero o primeiro de 5 e o segundo de 3, apos capturar o primeiro grupo ele adiciona um traço antes do segundo grupo de numero
    .replace(/(-\d{3})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export default MaskCep;
