"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { Button, Input } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CriarVendedor(){
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeNome = (event:ChangeEvent<HTMLInputElement>) => {
    setNome(event?.target?.value);
  }

  const handleChangeEmail = (event:ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target?.value);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token") || ""

    const vendedor = JSON.stringify({
      nome: nome,
      email: email
    });

    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/vendedor',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data : vendedor
      })
      .then(res => {
        toast.success("Vendedor criado com Sucesso.", {
          position: toast.POSITION.TOP_CENTER
        });
        window.location.replace('/vendedor');
      })
      .catch(error => {
        console.error(error);
        toast.error("Houve um erro ao cadastrar o vendedor.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="text" label="Nome" name="nome" placeholder="Nome do Vendedor" onChange={handleChangeNome} />
          </div> 
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="email" label="Email" name="email" placeholder="Email do Vendedor" onChange={handleChangeEmail} />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Button type="submit" color="default">Criar Vendedor</Button>
          </div>
        </div> 
      </form>
      <ToastContainer />
    </main>
  )
}