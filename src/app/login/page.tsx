"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { Button, Input } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event:ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target?.value);
  }

  const handleChangePass = (event:ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target?.value);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credenciais = JSON.stringify({
      email: email,
      password: password
    });

    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/login',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data : credenciais
      })
      .then(res => {
        toast.success("Logado com Sucesso.", {
          position: toast.POSITION.TOP_CENTER
        });
        localStorage.setItem("token", res.data.token);
        window.location.replace('/dashboard');
      })
      .catch(error => {
        console.error(error.response.data);
        toast.error("Erro ao Logar.\n" + JSON.stringify(error.response.data), {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="email" label="Email" name="email" placeholder="Enter your email" onChange={handleChangeEmail} />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="password" label="Senha" name="password" placeholder="Enter your password" onChange={handleChangePass} />
          </div> 
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Button type="submit" color="default">Login</Button>
          </div>
        </div> 
      </form>
      <ToastContainer />
    </main>
  )
}