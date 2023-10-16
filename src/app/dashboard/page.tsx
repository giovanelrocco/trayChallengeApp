"use client"

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = typeof window !== undefined ? window.localStorage.getItem("token") : '';
    if (!token && typeof window !== undefined) {
      window.location.replace('/login');
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
