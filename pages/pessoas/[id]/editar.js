import Head from 'next/head'
import api from '../../../services/api'
import Layout from '../../../components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'

export default function EditarPessoa({ pessoa }) {
  const [nome, setNome] = useState(pessoa ? pessoa.nome : "")
  const [idade, setIdade] = useState(pessoa ? pessoa.idade : "")
  const [sexo, setSexo] = useState(pessoa ? pessoa.sexo : true)

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (router.isFallback || !pessoa) {
    return <p className={styles.noData}>Carregando...</p>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await api.put(`/pessoas/${router.query.id}`, { nome, idade, sexo })
    router.push('/pessoas')
  }

  return (
    <Layout>
      <Head>
        <title>Editar Pessoa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href="#" onClick={() => router.back()}>
        Voltar
      </a>

      <h1>Editar Pessoa</h1>

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
            onChange={e => setSexo(e.target.value === "true")}
            value={sexo}
          >
            <option value={true}>
              Homem
            </option>
            <option value={false}>
              Mulher
            </option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Editar</button>
      </form>

    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await api.get('/pessoas')
  const pessoas = response.data

  const paths = pessoas.map(pessoa => {
    return { params: { id: pessoa.id.toString() } }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const response = await api.get(`/pessoas/${params.id}`)
  const pessoa = response.data

  return {
    props: {
      pessoa
    }
  }
}
