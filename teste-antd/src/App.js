import './App.css';
import { AppleOutlined, QuestionCircleOutlined, UserOutlined, LoadingOutlined, ScissorOutlined } from '@ant-design/icons';
import { Button, Layout, Avatar, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Html5Outlined} from '@ant-design/icons';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ComponenteAntd } from './ComponenteAntd';
import { ComponenteAntd2 } from './ComponenteAntd2';

function App() {
  const rotas = createBrowserRouter([{
    path: "/",
    element: <ComponenteAntd/>
  },
  {
    path: "/usuario",
    element: <ComponenteAntd2/>
  },
  {
    path: "/duvida",
    element: <h1>Dúvida</h1>
  },
  {
    path: "/excluir",
    element: <h1>Excluir</h1>
  }]);

  const Conteudo = (props) => {
    return <RouterProvider router={rotas} />
  }

  const itemMenuSelecionado = (item) => {
    rotas.navigate(item.key)
  }                                                                                                                                                                                                                                                                                                                            

  return (
    // <div style={{margin:50}}>
    //   <Button icon={<AppleOutlined/>}>Clique aqui</Button>
    // </div>
    <Layout style={{height: "100vh"}}>
      <Header style={{color: "white"}}>

        <div style={{width: "100%", flex:"1", alignContent:"center", alignItems:"center", display:'flex', flexDirection:'row'}}>
          <Avatar style={{float: "left"}} icon={ <Html5Outlined /> }/>
          <h1 style={{color: "white", flex: "10"}}>Cabeçalho</h1>
        </div>
      </Header>
    
    <Layout>
      <Layout.Sider>
        <Menu theme='dark' onClick={itemMenuSelecionado}>
          <Menu.Item key="/usuario" icon={<UserOutlined/>}>Usuário</Menu.Item>
          <Menu.Item key="/duvida" icon={<QuestionCircleOutlined/>}>Dúvidas</Menu.Item>
          <Menu.Item key="/excluir" icon={<ScissorOutlined />}>Excluir</Menu.Item>
        </Menu>
    </Layout.Sider>
        <Content>
          <div style={{marginLeft: 10}}>
          <Conteudo /></div>
        </Content>
    </Layout>
      <Footer>
        <h1>Rodapé</h1>
      </Footer>
    </Layout>
    //ou so importa o Layout e coloca Layout.Hearder
  );

}

export default App;
