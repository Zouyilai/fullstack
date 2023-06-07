import React from "react";
import { Button, Input, List, Dropdown, Checkbox, Radio, DatePicker, Progress, Slider, Card } from "antd";
import { useState } from "react";

export const ComponenteAntd = () => {
    const [username, setUsername] = useState("");
    const [radioValue, setRadioValue] = useState(1)
    
    const atualizaUsername = (event) => {
        setUsername(event.target.value);
    } 

    const exibirUsername = () => {
        alert(username);
    }

    const selecionaItem = (item) => {
        alert(item.target.id);
    }
    
    return <div style={{marginTop: 10, marginLeft: 10}}>
        <div style={{display:'flex', flexDirection:'row'}}>
        <Input addonBefore="Username:" placeholder="aaa" value={username} onChange={atualizaUsername}/>
        <Button onClick={exibirUsername}>Username</Button>
        </div>

        <div style={{marginTop: 20}}>
            <List header="Lista de Compra" 
                footer="Selecione os itens acima"
                bordered
                dataSource={["Café", "Pizza", "Zou"]}
                renderItem={(item, idx) => (<List.Item onClick={selecionaItem} id={idx}>{item}</List.Item>)}/>
        </div>

        <div style={{marginTop: 10}}>
            <div><Checkbox onChange={(val)=> alert(val.target.checked)}/>selecionar a opção</div>
        </div>

        <div style={{marginTop: 10}}>
            <Radio.Group value={radioValue} onChange={(item) => setRadioValue(item.target.value)}> 
                <Radio value={1}>Item 1</Radio>
                <Radio value={2}>Item 2</Radio>
                <Radio value={3}>Item 3</Radio>
            </Radio.Group>
        </div>

        <div style={{marginTop: 10}}>
            <DatePicker onChange={(data, dataString) => alert(dataString)}/>
        </div>

        <div style={{marginTop: 10}}>
            <Progress type="dashboard" percent={9.7}/>
        </div>

        <div style={{marginTop: 10}}>
            <Slider min={2} max={20} value={5}/>
        </div>

        <div style={{marginTop: 10}}>
            <Card title="Atividade do Dia" bordered style={{width: 300}}>
                <ul>
                    <li>Zou</li>
                    <li>Yi</li>
                    <li>Lai</li>
                </ul>
            </Card>
        </div>
    </div>
}