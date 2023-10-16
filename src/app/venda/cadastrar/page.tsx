"use client"

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Select, SelectSection, SelectItem } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import type { VendedorType } from '@/types/vendedorType';
import 'react-toastify/dist/ReactToastify.css';

export default function CriarVenda() {

  const [vendedorId, setVendedorId] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [vendedores, setVendedores] = useState<VendedorType[]>([]);

  const handleChangeVendedor = (event:ChangeEvent<HTMLSelectElement>) => {
    setVendedorId(event?.target?.value);
  }

  const handleChangeValor = (event:ChangeEvent<HTMLInputElement>) => {
    setValor(event?.target?.value);
  }

  const handleChangeData = (event:ChangeEvent<HTMLInputElement>) => {
    setData(event?.target?.value);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const venda = JSON.stringify({
      vendedor_id: vendedorId,
      valor: valor,
      data_venda: data
    });

    const token = localStorage.getItem("token") || ""

    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/venda',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data : venda
      })
      .then(res => {
        toast.success("Venda criada com Sucesso.", {
          position: toast.POSITION.TOP_CENTER
        });
        window.location.replace('/venda');
      })
      .catch(error => {
        console.log(error);
        toast.error("Houve um erro ao cadastrar a venda.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  const getVendedores = () =>  {
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
  }

  useEffect(() => {
    getVendedores();
  }, [])

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
            <Input type="number" label="Valor" name="valor_venda" placeholder="Valor da Venda" onChange={handleChangeValor} />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="date" label="Data" name="data_venda" placeholder="Data da Venda" onChange={handleChangeData} />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Button type="submit" color="default">Criar Venda</Button>
          </div>
        </div> 
      </form>
      <ToastContainer />
    </main>
  )
}