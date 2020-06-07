import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController {

    async index (request: Request, response: Response){
        //Utiliza-se query params
        const { city, uf , items} = request.query;

        const parsedItems = String(items)
            .split(',') //Separa por vírgula 
            .map(item => Number(item.trim())) //exclui os espaços entre a string

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems) //where aver algum id 
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() //apenas pontos de coletas distintos
            .select('points.*');



        return response.json(points)
    }

    async show (request: Request, response: Response){
        const { id } = request.params;

        //Buscar o ID do banco de dados
        const point = await knex('points').where('id', id).first(); 

        //id not found?
        if(!point){
            return response.status(400).json({ message: 'Point not found'})
        }

        /*
            Query exemple
            select * from items
                join point_items ON items.id = point_items.item_id
                where point_items.point_id = {id}
        */
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id' )
            .where('point_items.point_id', id) //Onde point_itens.point_id = id (passado no params)
            .select('items.title');

        return response.json({ point, items });
    }

    async create (request: Request, response: Response){
        const {
            name, email, whatsapp, latitude, longitude, city, uf, items
        } = request.body;
    
        //para executar apenas se retornar sucesso, faz o rollback caso retorne erro na rota
        const trx = await knex.transaction(); 

        const point = {
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point,
        })
    }
}

export default PointsController;