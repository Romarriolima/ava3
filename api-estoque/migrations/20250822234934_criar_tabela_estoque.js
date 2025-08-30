exports.up = function(knex) {
  return knex.schema.createTable('produto', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.integer('quantidade').notNullable();
    table.float('preco').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};