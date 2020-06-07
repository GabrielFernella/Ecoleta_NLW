import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();

        table.integer('point_id')
            .notNullable()
            .references('id') //o campo da referencia da chave estranjeira
            .inTable('points') //a tabela da referencia

        table.integer('item_id')
            .notNullable()
            .references('id') //o campo da referencia da chave estranjeira
            .inTable('items') //a tabela da referencia
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('point_items');
}