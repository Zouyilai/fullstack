import React from "react"
import { Row, Col, Button, Card, Timeline, Form, Input } from "antd"
import { BugOutlined } from '@ant-design/icons';

export const ComponenteAntd2 = (props) => {
    return <div style={{margin: 20}}>
        <Row gutter={10}>
            <Col span={10}><Button style={{width: "100%"}}>Botao 1</Button></Col>
            <Col span={7}><Button style={{width: "100%"}}>Botao 2</Button></Col>
            <Col span={7}><Button style={{width: "100%"}}>Botao 2</Button></Col>
        </Row>
        <Row gutter={10}>
            <Col span={12}><Card title="Atividade1">Descricao 1</Card></Col>
            <Col span={12}><Card title="Atividade2">Descricao 2</Card></Col>
        </Row>
        <Row style={{marginTop: 20}}>
            <Col span={5}>
                <Timeline>
                    <Timeline.Item>Ola</Timeline.Item>
                    <Timeline.Item dot={<BugOutlined style={{ fontSize: '16px' }} />} color="red">Ola</Timeline.Item>
                    <Timeline.Item>Ola</Timeline.Item>
                </Timeline>
            </Col>
        </Row>
        <Row style={{marginTop: 20}}>
            <Col span={12}>
                <Form name="login"
                onFinish={(dados) => console.log(dados.username)} 
                onFinishFailed={(erros) => console.log(erros)}>
                    <Form.Item label="Username: " name="username"
                    rules={[{required: true, message: 'Informe sue nome'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password: " name="password"
                    rules={[{min: 6, message: 'min 6'}]}>
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Enviar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </div>
}