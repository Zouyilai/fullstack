import React, { useState} from 'react';
// import '../index.css';
import DesenhaLista from '../lista/DesenhaLista';
import FormLista from '../form-lista/FormLista';
import { Link, NavLink, useParams } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const isProfessor = true;
// const lista = ['Feijão', 'Milho', 'Arroz', 'Morango'];
// const itens = ['Calça', 'Camisa', 'Meias'];

// const listItems = itens.map(item => <li key={item}>{item}</li>);

// const DesenhaLista = () => {
//   return <ul>
//       { lista.map((item) => <li>{item}</li>) }
//   </ul>
  
// }

export const Cadastro = () => {
  const itemSelecionado = (item) => alert('selecionado!: ' + item)

  const [lista, addLista] = useState([]);
  const parametros = useParams();
  console.log(parametros);

  const adicionarItem = (item) => {
    // alert(item);
    addLista([...lista, item]);
  }

//   const getItens = async() => {
//     try {
//         fetch("https://controle-gastos.glitch.me/").then((result) => {
//             console.log(result.json());
//         })
        
//     } catch (err) {
//         console.log(err);
//     }
//   }
//   await getItens();
  
  return <>
            <div style ={{margin:30}}>
                <NavLink to="/" style={({isActive})=> isActive ? {backgroundColor: 'red'}:{}}>Login</NavLink>
                <NavLink to="/cadastro/123" style={({isActive})=> isActive ? {backgroundColor: 'red'}:{}}>Cadastro</NavLink>
            </div>
          <div style={{margin: 30}}><Link to="/">Logout</Link></div>
          <div style={{margin: 30}}>UserId: {parametros.userid}</div>
  {/* <React.StrictMode> */}
          <FormLista adicionarCallback={adicionarItem}/>
          <DesenhaLista 
            itens={lista}
            selecionarItemCallback={itemSelecionado}>Filho</DesenhaLista>
        {/* </React.StrictMode> */}
</>
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
// root.render(<Cadastro />);
