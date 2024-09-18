## Encurtador de URL com Typescript e Mariadb

### Descrição

Este é um desafio proposto pela Teddy Open Finance, uma solução simples e eficaz para transformar URLs longas em links curtos. 
Desenvolvido com Typescript e Nestjs

### Como Começar

Para começar, siga as instruções em nossa seção de instalação no README abaixo.


## Como Instalar

Para executar esta aplicação localmente, siga as etapas abaixo:

### Pré-Requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (v20.16.0 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (recomendado)
- [Docker](https://docs.docker.com/engine/install/) (certifique-se de que o docker esteja em execução)

### Instalação

1. Clone este repositório para o seu ambiente de desenvolvimento:

   ```bash
   git clone https://github.com/suellenraysa/shortenerurl-URL
   
2. Instale as dependências necessárias:
    ```
   npm install

### Rodando manualmente    
    
    npm run start

### Rodando com Docker:
 
    docker buildx build -t shortener-api .
    docker-compose up