CRM Simplificado - Backend
Tecnologias

Node.js + Express

JWT para autenticação

Banco de dados (PostgreSQL/MySQL ou MongoDB, conforme setup)


Setup Inicial

Instale dependências:

npm install


Configure .env:

PORT=4000
DATABASE_URL=<url_do_banco>
JWT_SECRET=Tracker2025


Rodando o backend:

npm run dev


O servidor rodará em http://localhost:4000.

Endpoints Principais
Usuários

POST /users/register – criar usuário (ADMIN)

GET /users – listar usuários (ADMIN e SELLER visualização)

PUT /users/:id – atualizar usuário (ADMIN)

DELETE /users/:id – deletar usuário (ADMIN)

Clientes

GET /customers – listar clientes

POST /customers – criar cliente (ADMIN)

PUT /customers/:id – atualizar cliente (ADMIN)

DELETE /customers/:id – deletar cliente (ADMIN)

Atendimentos

GET /attendances – listar atendimentos

POST /attendances – criar atendimento

PUT /attendances/:id – atualizar atendimento

DELETE /attendances/:id – deletar atendimento (ADMIN)

Sistema de Permissões

ADMIN: CRUD completo em todos os módulos

SELLER: visualização de clientes e usuários; CRUD apenas em atendimentos

ATTENDANT: CRUD em atendimentos; não pode acessar usuários ou clientes
