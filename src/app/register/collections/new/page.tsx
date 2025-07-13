'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCollectionPage() {
  const [quantity, setQuantity] = useState('')
  const [address, setAddress] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/collections', {
      method: 'POST',
      body: JSON.stringify({
        quantityLiters: parseFloat(quantity),
        address,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      router.push('/dashboard') // redireciona para o painel do usuário
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Solicitar Coleta</h2>
      <input
        type="number"
        placeholder="Quantidade de litros"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="mb-2 p-2 border w-full rounded"
        required
      />
      <textarea
        placeholder="Endereço de coleta"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mb-2 p-2 border w-full rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Solicitar
      </button>
    </form>
  )
}
