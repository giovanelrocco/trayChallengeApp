"use client"

import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';


export default function EditarVendedor() {
  const params = useParams();
  const id = params.id;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  const getVendedor = useCallback(() => {
    const token = localStorage.getItem("token") || ""
    axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost/api/vendedor/' + id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setEmail(res.data.email);
        setNome(res.data.nome);
      })
      .catch(error => {
        console.error(error);
        toast.error("Houve um erro ao cadastrar o vendedor.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }, []);

  useEffect(() => {
    getVendedor();
  }, [getVendedor])

  const handleChangeNome = (event:ChangeEvent<HTMLInputElement>) => {
    setNome(event?.target?.value);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token") || ""

    const vendedor = JSON.stringify({
      nome: nome
    });

    axios.request({
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/vendedor/' + id,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data : vendedor
      })
      .then(res => {
        toast.success("Vendedor editado com Sucesso.", {
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
          <input type="hidden" name="id" value={id}/>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="text" label="Nome" name="nome" value={nome} placeholder="Nome do Vendedor" onChange={handleChangeNome} />
          </div> 
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="email" label="Email" name="email" value={email}  placeholder="Email do Vendedor" isDisabled />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Button type="submit" color="default">Editar Vendedor</Button>
          </div>
        </div> 
        </form>
        <ToastContainer />
    </main>
  )
}