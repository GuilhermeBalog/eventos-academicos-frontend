import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function NovaLocalizacao() {
  const [endereco, setEndereco] = useState("")
  const [valor, setValor] = useState("")
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
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
          <input type="text" name="endereco" onChange={e => setEndereco(e.target.value)} id="endereco" placeholder="Digite o endereço" />
        </div>
        <div>
          <label htmlFor="valor">Valor do aluguel</label>
          <input type="text" name="valor" onChange={e => setValor(e.target.value)} id="valor" placeholder="Digite o valor" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </Layout>
  )
}
