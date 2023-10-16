"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Select, SelectItem } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import type { VendedorType } from '@/types/vendedorType';
import 'react-toastify/dist/ReactToastify.css';

export default function EnviarEmail() {

  const [vendedor, setVendedor] = useState('');

  const [vendedores, setVendedores] = useState<VendedorType[]>([]);

  const getVendedores = () => {
    const token = localStorage.getItem("token") || ""
    axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/vendedor',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        setVendedores(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVendedores();
  }, [])

  const handleChangeVendedor = (event:ChangeEvent<HTMLSelectElement>) => {
    setVendedor(event?.target?.value);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token") || ""
    axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/vendedor/' + vendedor + '/email',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        toast.success("Email enviado com Sucesso.", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.log(error);
        toast.error("Houve um erro ao enviar o email.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select 
              label="Selecione um Vendedor" 
              onChange={handleChangeVendedor}
            >
              {vendedores.map((vendedorItem) => (
                <SelectItem key={vendedorItem?.id} value={vendedorItem?.id}>
                  {vendedorItem?.email}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Button type="submit" color="default">Enviar Email</Button>
          </div>
        </div> 
      </form>
      <ToastContainer />
    </main>
  )
}