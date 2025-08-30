// Arquivo: api-produto/knexfile.js
module.exports = {
  development: {
    client: 'sqlite3', // driver mesmo...
    connection: {
      filename: './produto.sqlite3' // agora é produto, não cursos
    },
    useNullAsDefault: true, // sqlite pede isso senão reclama
    migrations: {
      directory: './migrations' // pasta onde ficam versões do schema (meio bagunça mas ok)
    }
  }
};
