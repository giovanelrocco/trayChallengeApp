"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link, Spacer } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import { VendedorType } from '@/types/vendedorType';

export default function Vendedor(){
  
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
        toast.error("Houve um erro ao carregar os vendedores.", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  useEffect(() => {
    getVendedores();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex gap-4">
          <Link href="/vendedor/cadastrar" color="foreground">Criar Vendedor</Link>
        </div> 
        <Spacer y={2} />
        <Table isStriped aria-label="Lista de Vendedores">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nome</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Editar</TableColumn>
            <TableColumn>Excluir</TableColumn>
          </TableHeader>
          <TableBody items={vendedores}>
          { vendedores?.map(vendedor =>
            <TableRow key={vendedor?.id}>
              <TableCell>{vendedor?.id}</TableCell>
              <TableCell>{vendedor?.nome}</TableCell>
              <TableCell>{vendedor?.email}</TableCell>
              <TableCell>
                <Link href={`/vendedor/${vendedor?.id}`} color="foreground">Editar Vendedor</Link>
              </TableCell>
              <TableCell>
                <Link href={`/vendedor/${vendedor?.id}`} color="foreground">Excluir Vendedor</Link>
              </TableCell>
            </TableRow>
            )} 
          </TableBody>
        </Table>
        <ToastContainer />
      </main>
  )
}