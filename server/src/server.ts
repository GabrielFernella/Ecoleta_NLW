import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors()); //permite que URLs externas acessem minha API
app.use(express.json());
app.use(routes);

//visualizar os arquivos em upload através de rotas
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))) 

app.listen(3333);