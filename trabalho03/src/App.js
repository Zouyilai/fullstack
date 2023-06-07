import './App.css';
import { UserOutlined, ExperimentOutlined, FireFilled, TrophyOutlined } from '@ant-design/icons';
import { Button, Layout, Avatar, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Html5Outlined} from '@ant-design/icons';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Usuario } from './Usuario';

function App() {
  const rotas = createBrowserRouter([{
    path: "/",
    element: <h1>Boa férias, professor!</h1>
  },
  {
    path: "/usuario",
    element: <Usuario/>
  },
  {
    path: "/premio",
    element: <h1>Premio</h1>
  },
  {
    path: "/reciclagem",
    element: <h1>recilcagem</h1>
  }]);

  const Conteudo = (props) => {
    return <RouterProvider router={rotas} />
  }

  const itemMenuSelecionado = (item) => {
    rotas.navigate(item.key)
  }

  return (
    <Layout style={{height: "100vh"}}>
      <Header style={{color: "white"}}>

        <div style={{width: "100%", flex:"1", alignContent:"center", alignItems:"center", display:'flex', flexDirection:'row'}}>
          <Avatar style={{float: "left"}} icon={ <FireFilled /> }/>
          <h1 style={{color: "white", flex: "10"}}>Sistema de Reciclagem</h1>
        </div>
      </Header>
    
      <Layout>
        <Layout.Sider>
          <Menu theme='dark'onClick={itemMenuSelecionado}>
            <Menu.Item key="/usuario" icon={<UserOutlined/>}>Usuário</Menu.Item>
            <Menu.Item key="/premio" icon={<TrophyOutlined />}>Prêmio</Menu.Item>
            <Menu.Item key="/reciclagem" icon={<ExperimentOutlined />}>Reciclagem</Menu.Item>
          </Menu>
        </Layout.Sider>
        <Content>
          <div style={{marginLeft: 10}}>
          <Conteudo /></div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
