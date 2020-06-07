import React from 'react'; //deve ser usado em toda página que tiver jsx
import { FiLogIn } from 'react-icons/fi' //Pacote de icones 
import { Link } from 'react-router-dom' //para fazer um link entre as páginas sem dar reload

import './styles.css'; //na própria pasta do arquivo já deixamos o css

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de Coleta</strong>
          </Link>
        </main>

      </div>
    </div>
  )
}

export default Home; 
