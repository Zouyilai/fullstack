import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import DesenhaLista from './lista/DesenhaLista';
import FormLista from './form-lista/FormLista';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const isProfessor = true;
// const lista = ['Feijão', 'Milho', 'Arroz', 'Morango'];
// const itens = ['Calça', 'Camisa', 'Meias'];

// const listItems = itens.map(item => <li key={item}>{item}</li>);

// const DesenhaLista = () => {
//   return <ul>
//       { lista.map((item) => <li>{item}</li>) }
//   </ul>
  
// }

const Principal = () => {
  const itemSelecionado = (item) => alert('selecionado!: ' + item)

  const [lista, addLista] = useState([]);

  const adicionarItem = (item) => {
    // alert(item);
    addLista([...lista, item]);
  }

  return <React.StrictMode>
          <FormLista adicionarCallback={adicionarItem}/>
          <DesenhaLista 
            itens={lista}
            selecionarItemCallback={itemSelecionado}>Filho</DesenhaLista>
        </React.StrictMode>
}

// const itemSelecionado = (item) => alert('selecionado!: ' + item)

// const [lista, addLista] = useState([]);

// const adicionarItem = (item) => {
//   // alert(item);
//   addLista([...lista, item]);
// }

// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     {/* <button>Olá</button> */}
//     {/* expressao {} */}

//     {/* {isProfessor && <h1>Professor</h1>}
//     {!isProfessor && <button>Aluno</button>}
//     <h1>{isProfessor ? "Professor" : "Aluno"}</h1> */}

//     {/* <ul>
//       { lista.map((item) => <li>{item}</li>) }
//     </ul> */}
//     {/* <ul>
//       { lista.filter((item) => { if (item.startsWith("M")) <li>{item}</li>} }
//     </ul> */}
//     {/* <ul>{listItems}</ul> */}
//     <FormLista adicionarCallback={adicionarItem}/>
//     <DesenhaLista 
//       itens={['arroz', 'feijão', 'Gato']}
//       selecionarItemCallback={itemSelecionado}>Filho</DesenhaLista>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

root.render(<Principal />);
