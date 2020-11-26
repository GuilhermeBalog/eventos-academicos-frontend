import Head from 'next/head'
import api from '../../../services/api'
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Localizacao({ evento }) {
  const [edicao, setEdicao] = useState(evento ? evento.edicao : "")
  const [fk_localizacao_id, setLocalizacaoId] = useState(evento ? evento.fk_localizacao_id : "")
  const [nome, setNome] = useState(evento ? evento.nome : "")
  const [tema, setTema] = useState(evento ? evento.tema : "")
  const [valorinscricao, setValor] = useState(evento ? evento.valorinscricao : "")
  const [localizacoes, setLocalizacoes] = useState([])

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(async () => {
    const response = await api.get('/localizacoes')
    setLocalizacoes(response.data)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await api.put(`/eventos/${router.query.id}`, { edicao, fk_localizacao_id, nome, tema, valorinscricao })
    router.push('/eventos')
  }

  return (
    <Layout>
      <Head>
        <title>Editar Evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href="#" onClick={() => router.back()}>
        Voltar
      </a>

      <h1>Editar Evento</h1>

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
          <label htmlFor="edicao">Edição</label>
          <input
            type="text"
            name="edicao"
            value={edicao}
            onChange={e => setEdicao(e.target.value)}
            id="edicao"
            placeholder="Digite a edição"
          />
        </div>
        <div>
          <label htmlFor="tema">Tema</label>
          <input
            type="text"
            name="tema"
            value={tema}
            onChange={e => setTema(e.target.value)}
            id="tema"
            placeholder="Digite o tema"
          />
        </div>
        <div>
          <label htmlFor="valor">Valor da inscrição</label>
          <input
            type="text"
            name="valor"
            value={valorinscricao}
            onChange={e => setValor(e.target.value)}
            id="valor"
            placeholder="Digite o valor da inscrição"
          />
        </div>
        <div>
          <label htmlFor="fk_localizacao_id">Escolha a localização</label>
          <select
            name="fk_localizacao_id"
            id="fk_localizacao_id"
            onChange={e => setLocalizacaoId(e.target.value)}
            value={fk_localizacao_id}
          >
            {localizacoes.map(localizacao => (
              <option value={localizacao.id} key={localizacao.id}>
                {localizacao.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>Editar</button>
      </form>

    </Layout>
  )
}

async function getStaticPaths() {
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

export async function getServerSideProps({ params }) {
  const response = await api.get(`/eventos/${params.id}`)
  const evento = response.data

  return {
    props: {
      evento
    }
  }
}
