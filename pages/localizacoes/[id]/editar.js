import Head from 'next/head'
import Link from 'next/link'
import api from '../../../services/api'
import Layout from '../../../components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Localizacao({ localizacao }) {
  const [endereco, setEndereco] = useState(localizacao ? localizacao.endereco : "")
  const [valor, setValor] = useState(localizacao ? localizacao.valor : "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await api.put(`/localizacoes/${router.query.id}`, { endereco, valor })
    router.push('/localizacoes')
  }

  return (
    <Layout>
      <Head>
        <title>Editar Localizacao</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/localizacoes">
        <a>
          Voltar
        </a>
      </Link>

      <h1>Editar Localização</h1>

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
        <button type="submit" disabled={loading ? 'disabled' : ''}>Editar</button>
      </form>

    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await api.get('/localizacoes')
  const localizacoes = response.data

  const paths = localizacoes.map(localizacao => {
    return { params: { id: localizacao.id.toString() } }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const response = await api.get(`/localizacoes/${params.id}`)
  const localizacao = response.data

  return {
    props: {
      localizacao
    }
  }
}
