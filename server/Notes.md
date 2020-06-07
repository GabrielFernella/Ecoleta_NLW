# Pacotes

1. npm init -y
2. npm install express
3. npm install @types/express -D //Pacotes do Typescript
4. npm install ts-node -D //Para rodar typescript no node
5. npm install typescript -D
6. npx tsc --init //Crie o arquivo de configuração do typescript
7. npm install ts-node-dev -D //pacote que sempre visualiza as alterações do projeto
8. npx ts-node-dev src/server.ts


1. npm install knex //query builder
2. npm install sqlite3 //driver do sqlite
3. npx knex migrate:latest --knexfile knexfile.ts migrate:latest


# Instructions
1. Depois de instalar as dependencias, é necessário que vc crie um aquivo de configuração do typescript
2. Crie um script para executar o npx ts-node-dev src/server.ts chamado "dev"
3. instale as dependencias para o banco e cria suas tabelas respeitando as configurações 
4. Crie um script para criar o tabelas e crie o banco
5. Identificando funcionalidades
6. criando Seeds
7. rotas para uploads
8. controllers e rotas
9. cors