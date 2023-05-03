import React from "react";
import './DesenhaLista.css';

// const lista = ['Feijão', 'Milho', 'Arroz', 'Morango'];

const DesenhaLista = (props) => {
    //componente vazio para juntar as duas coisas
  return (<>
  <div className="titulo">{props.children}
  </div>
  <ul>
      { props.itens.map((item) => 
        //aqui nao precisa de () na função
        <li onClick={props.selecionarItemCallback.bind(this,item)} 
            key={item}>{item}</li>) }
  </ul>
  </>);
}

export default DesenhaLista;