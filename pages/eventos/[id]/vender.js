import Head from 'next/head'
import Link from 'next/link'
import api from '../../../services/api'
import styles from '../../../styles/Home.module.css'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function VenderIngresso({ evento }) {
  const [fk_pessoas_id, setPessoaId] = useState("")
  const [pessoas, setPessoas] = useState([])

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (router.isFallback || !evento) {
    return <p className={styles.noData}>Carregando...</p>
  }

  useEffect(async () => {
    const response = await api.get('/pessoas')
    setPessoas(response.data)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await api.post('/ingressos', {
      fk_evento_id: evento.id,
      fk_pessoas_id,
      datacompra: new Date().toISOString()
    })

    router.push(`/eventos/${evento.id}`)
  }

  return (
    <Layout>
      <Head>
        <title>Vender ingresso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href={`/eventos/${evento.id}`}>
          <a>
            Voltar
            </a>
        </Link>
        {' | '}
        <Link href={`/eventos/${evento.id}/editar`}>
          <a>
            Editar
            </a>
        </Link>
      </div>

      <h1>
        Vender ingresso para {evento.nome} - {evento.edicao}ª Edição
        </h1>

      <p className={styles.description}>
        Valor base do ingresso: {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fk_pessoas_id">Selecione o comprador</label>
          <select
            name="fk_pessoas_id"
            id="fk_pessoas_id"
            onChange={e => setPessoaId(e.target.value)}
            value={fk_pessoas_id}
          >
            {pessoas.map(pessoa => (
              <option value={pessoa.id} key={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>Vender</button>
      </form>
    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await api.get('/eventos')
  const eventos = response.data

  const paths = eventos.map(evento => {
    return { params: { id: evento.id.toString() } }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const response = await api.get(`/eventos/${params.id}`)
  const evento = response.data

  return {
    props: {
      evento
    }
  }
}
