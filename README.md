## Média Escolar - Projeto
<img src="https://static.escolakids.uol.com.br/2020/08/licoes-importantes-escola.jpg" />

## Um pouco sobre o que foi usado:

1. React JS
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
Para desenvolvimento da aplicação foi utilizado o React JS, biblioteca em código aberto mantida pelo facebook.
Obtei por utilizar o React JS por maior facilidade e ser algo muito presente no mercado de software

2. JSON Server
<img src="https://cms-assets.tutsplus.com/uploads/users/34/posts/27871/preview_image/json.jpg" />
Para salvar os dados e simulação de uma API foi utilizado o JSON Server, dependência que salva os dados em um arquivo JSON.
Ao rodar o JSON Server em sua máquina localmente, ele criará rotas de put, delete, post e get para modificações do arquivo JSON, simulando uma API Rest.

3. ANTD (ANT Desing)
<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
Como escolha do layout foi utilizado o ANTD, ferramenta que permite utilizarmos componentes com estilos definidos e props já moldadas para controle.

4. Axios
<img src="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png" />
Como escolha para chamadas HTTP, utilizei o Axios, por maior facilidade e ser uma ferramenta amplamente usada no mercado.

## Depedencias :
  Gerenciador de pacotes - utilizar NPM ou Yarn.
    
## Instalar Depencias:
  Primeiramente é necessário realizar a instalação das dependencias do projeto.
  Com um dos seguintes comandos:
  NPM:
  ```
  npm install
  ```
  Yarn:
  ```
  yarn install
  ```
  Após isso é necessário instalar o JSON Server globalmente com NPM:
  ```
  npm install -g json-server
  ```

  
## Executando o projeto:
  
1. Executando o backend (JSON SERVER)
Para a simulação de um backend foi utilizado o Json Server, esse por sua vez cria rotas e simula um banco de dados a partir de um arquivo JSON. 
O JSON no projeto tem o nome de server.json e se encontra na pasta raiz.
Para executar o JSON server por linha de comando acesse a pasta do projeto e execute o seguinte código:
```
json-server --watch server.json
```
Por padrão o JSON server será executado na porta 3000.

2. Executando o frontend
Para o frontend foi utilizado ReactJS.
Para executar o projeto, por linha de comando acesse a pasta do projeto e execute o seguinte código:
Caso use NPM:
```
npm start
```
Caso use Yarn:
```
yarn start
```
Por padrão o ReactJS é executado na porta 3000, porém, dentro do arquivo package.json a porta foi alterada para a 3001, para que não haja conflitos com o JSON server. Caso queira, altere a porta para de sua preferência. 

OBS: O JSON server e o projeto em ReactJS devem ser executados simultaneamente.

Caso você não consiga executar o JSON Server sendo informado com o seguinte erro: "O arquivo C:\Users\SeuUsuario\AppData\Roaming\npm\json-server.ps1 não pode ser carregado porque a execução de scripts foi desabilitada neste sistema". faça o seguinte procedimento:
1. Abra o powershell do windows como administrador e execute o comando Set-ExecutionPolicy RemoteSigned.
2. Depois rode o comando get-ExecutionPolicy e verifique se "RemoteSigned" foi retornado como resposta. Agora seu computador pode executar scripts assinados por terceiros. Tente rodar o json-server novamente após esse processo.

## Intuito do Projeto
Construir uma aplicação onde é possível realizar o cálculo de média dos alunos e passar a situação dependendo do que for preenchido, onde as regras foram as seguintes.
Caso o aluno tenha mais de 25% de faltas, ele é reprovado automaticamente;
Se o aluno tiver uma presença regular e tenha uma média menor que 5, ele é reprovado automaticamente;
Se o aluno tiver uma presença regular e tenha uma média entre 5 e 7, ele fará o exame final;
Se o aluno tiver uma presença regular e tenha uma média maior ou igual a 7, ele é aprovado; 
