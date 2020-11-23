import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import api from '../../services/api'

export default function NovaLocalizacao() {
  const [endereco, setEndereco] = useState("")
  const [valor, setValor] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await api.post('/localizacoes', { endereco, valor })
    router.push('/localizacoes')
  }

  return (
    <Layout>
      <Head>
        <title>Nova localização</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Nova localização</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            id="endereco"
            placeholder="Digite o endereço"
          />
        </div>
        <div>
          <label htmlFor="valor">Valor do aluguel</label>
          <input
            type="text"
            name="valor"
            value={valor}
            onChange={e => setValor(e.target.value)}
            id="valor"
            placeholder="Digite o valor"
          />
        </div>
        <button type="submit" disabled={loading}>Cadastrar</button>
      </form>
    </Layout>
  )
}
