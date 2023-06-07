import React from "react";
import { Button, Input } from "antd";
import { useState } from "react";
    
export const Usuario = () => {
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [pontos, setPontos] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const enviarUsuario = async () => {
        alert([username, senha, pontos, latitude, longitude]);

        const reqBody = {
            "nome": username,
            "senha": senha,
            "pontos": pontos,
            "latitude": latitude,
            "longitude": longitude
        }
        const url = "http://localhost:3000/usuario";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: reqBody }),
            });
            const json = await res.json();
            return { response: json, error: undefined };
        } catch (error) {
            return { response: undefined, error: error };
        }
    };

    return <>
                <h1>Criar Usuário</h1>
                <div style={{marginTop: 10, marginLeft: 10}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Input addonBefore="Username:" value={username} onChange={(item) => setUsername(item.target.value)}/>
                        <Input type="password" addonBefore="Senha:" value={senha} onChange={(item) => setSenha(item.target.value)}/>
                        <Input addonBefore="Pontos:" value={pontos} onChange={(item) => setPontos(item.target.value)}/>
                        <Input addonBefore="Latitude:" value={latitude} onChange={(item) => setLatitude(item.target.value)}/>
                        <Input addonBefore="Longitude:" value={longitude} onChange={(item) => setLongitude(item.target.value)}/>
                        <Button onClick={enviarUsuario}>Username</Button>
                    </div>
                </div>
            </>

}