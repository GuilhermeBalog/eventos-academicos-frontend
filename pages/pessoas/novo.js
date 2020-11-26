import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import api from '../../services/api'

export default function NovaPessoa() {
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [sexo, setSexo] = useState(true)

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await api.post('/pessoas', { nome, idade, sexo })
    router.push('/pessoas')
  }

  return (
    <Layout>
      <Head>
        <title>Nova pessoa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Nova pessoa</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            id="nome"
            placeholder="Digite o nome"
          />
        </div>
        <div>
          <label htmlFor="idade">Idade</label>
          <input
            type="number"
            name="idade"
            value={idade}
            onChange={e => setIdade(e.target.value)}
            id="idade"
            placeholder="Digite a idade"
          />
        </div>
        <div>
          <label htmlFor="sexo">Sexo</label>
          <select
            name="sexo"
            id="sexo"
            onChange={e => setSexo(e.target.value)}
            value={sexo}
          >
            <option value={true}>
              Masculino
            </option>
            <option value={false}>
              Feminino
            </option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Cadastrar</button>
      </form>
    </Layout>
  )
}
