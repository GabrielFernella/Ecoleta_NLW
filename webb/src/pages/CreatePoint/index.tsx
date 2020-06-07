import React,{ useEffect, useState,ChangeEvent, FormEvent } from 'react'; //deve ser usado em toda página que tiver jsx
import {Link, useHistory} from 'react-router-dom'; //para fazer um link entre as páginas sem dar reload
import {FiArrowLeft} from 'react-icons/fi'//Pacote de icones 
import {Map, TileLayer, Marker} from 'react-leaflet';
import { LeafletMouseEvent} from 'leaflet'
import axios from 'axios'; //buscando a api externa, recursos de estado do IBGE

import api from '../../services/api'; //recursos da api (server)

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint = () => {

   //Sempre que cria um estado para um array ou objeto, precisa informar o tipo da variável que será armazenada
   interface Item {
      id: number;
      title: string;
      image_url: string;
   }

   interface IBGEUFResponse {
      sigla: string;
   }

   interface IBGECityResponse {
      nome: string;
   }


   //Criando um estado do componente
   const [ items, setItems ] = useState<Item[]>([]);
   const [ufs, setUfs] = useState<string[]>([]);
   const [cities, setCities] = useState<string[]>([]);


   const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);//minha localidade do mapa selecionada

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      whatsapp: '',
   })

   const [selectedUf, setSelectedUf] = useState('0'); //uf selecionada
   const [selectedCity, setSelectedCity] = useState('0'); //city selecionada
   const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);//localidade do mapa selecionada
   const [selectedItem, setSelectedItem] = useState<number[]>([]); //Items selecionados
   
   const history = useHistory();


   //Função que pega os valores da api de itens
   useEffect( () => {
      navigator.geolocation.getCurrentPosition(position => {
         const { latitude, longitude } = position.coords;

         setInitialPosition([latitude,longitude]);
      })
   }, [])

   useEffect( () => {
      api.get('items').then(response => {
         setItems(response.data);
      });
   },[]);

   //Função que pega os valores da api dos estados 
   useEffect( () => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then( response => {
         const ufInitials = response.data.map(uf => uf.sigla);

         setUfs(ufInitials);
      })
   },[])

   useEffect( () => {
      //carregar as cidades sempre que o usuário selecionar a UF
      if(selectedUf === '0'){
         return;
      }

      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then( response => {
         const cityNames = response.data.map(city => city.nome);
         
         setCities(cityNames);
      })

   },[selectedUf])


   //Funções 
   function handleSelectUF(event: ChangeEvent<HTMLSelectElement>){
      const uf = event.target.value;

      setSelectedUf(uf);
   }

   function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
      const city = event.target.value;

      setSelectedCity(city);
   }

   function handleMapClick(event: LeafletMouseEvent){
      setSelectedPosition([
         event.latlng.lat,
         event.latlng.lng,
      ])
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement>){
      const {name, value } = event.target;

      setFormData({...formData,[name]: value })
   }

   //função para selecionar os itens da api
   function handleSelectItem(id: number){
      const alreadySelected = selectedItem.findIndex(item => item === id);
      if(alreadySelected >= 0){
         //se achar, remove do selected
         const filteredItems =  selectedItem.filter(item => item !== id);
         setSelectedItem(filteredItems);

      } else{
         //Se não achar, seleciona
         setSelectedItem([...selectedItem, id])
      }

      
   }

   //Função para salvar os dados na nossa API
   async function handleSubmit(event: FormEvent){
      event.preventDefault();

      const {name, email, whatsapp} = formData;
      const uf = selectedUf;
      const city = selectedCity;
      const [latitude, longitude] = selectedPosition;
      const items = selectedItem;


      const data = {
         name,
         email,
         whatsapp,
         uf,
         city,
         latitude,
         longitude,
         items
      }
      await api.post('points', data);

      alert('Ponto de coleta criado!');

      history.push('/');
   }

   //Pagina
   return (
      <div id="page-create-point">
         <header>
            <img src={logo} alt="Ecoleta"/>

            <Link to="/">
               <FiArrowLeft />
               Voltar para Home
            </Link>
         </header>

         <form onSubmit={handleSubmit}>
            <h1>Cadastro do <br/> ponto de coleta </h1>

         <fieldset>
            <legend>
               <h2>Dados</h2>
            </legend>

            <div className="field">
               <label htmlFor="name">Nome da Entidade</label>
               <input 
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
               />
            </div>

            <div className="field-group">
               <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input 
                     type="email"
                     name="email"
                     id="email"
                     onChange={handleInputChange}
                  />
               </div>
               <div className="field">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input 
                     type="text"
                     name="whatsapp"
                     id="whatsapp"
                     onChange={handleInputChange}
                  />
               </div>
            </div>
         </fieldset>

         <fieldset>
            <legend>
               <h2>Endereço</h2>
               <span>Selevione o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />

            </Map>

            <div className="field-group">

               <div className="field">
                  <label htmlFor="uf">Estado (UF)</label>
                  <select 
                     name="uf" 
                     id="uf" 
                     value={selectedUf} 
                     onChange={handleSelectUF}>
                     <option value="0">Selecione uma UF</option>
                     {ufs.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                     ))}
                  </select>
               </div>

               <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select 
                  name="city" 
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                  >
                     <option value="0">Selecione uma Cidade</option>
                     {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                     ))}
                  </select>
               </div>

            </div>
         </fieldset>

         <fieldset>
            <legend>
               <h2>Ítens de coleta</h2>
               <span>Selevione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
               {  //Utilizando useState, interface..
               items.map(item => (
                  <li 
                  key={item.id} 
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItem.includes(item.id) ? 'selected' : '' }
                  >
                     <img src={item.image_url} alt={item.title} />
                     <span>{item.title}</span>
                  </li>
               ))}
               
            </ul>
         </fieldset>

         <button type="submit">
            Cadastrar ponto de coleta
         </button>

         </form>

      </div>
   )
};

export default CreatePoint;