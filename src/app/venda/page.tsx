"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link, Spacer } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import { VendedorType } from '@/types/vendedorType';

export default function Venda() {
  
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "vendedor_id",
      label: "ID Vendedor",
    },
    {
      key: "valor",
      label: "Valor",
    },
    {
      key: "data_venda",
      label: "Data",
    },
  ];
  
  const [vendedores, setVendedores] = useState<VendedorType[]>([]);

  const getVendas = () => {
    const token = localStorage.getItem("token") || ""
    axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost/api/venda',
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
        toast.error("Houve um erro ao carregar as vendas.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  useEffect(() => {
    getVendas();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex gap-4">
          <Link href="/venda/cadastrar" color="foreground">Criar Venda</Link>
        </div> 
        <Spacer y={2} />
        <Table isStriped aria-label="Lista de Vendas">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={vendedores}>
          {
            vendedores.map((vendedorItem) => (
              <TableRow key={vendedorItem?.id} >
                {(columnKey) => <TableCell>{getKeyValue(vendedorItem, columnKey)}</TableCell>}
              </TableRow>
          ))} 
          </TableBody>
        </Table>
      <ToastContainer />
    </main>
  )
}