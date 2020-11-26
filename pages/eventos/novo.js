import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import api from '../../services/api'

export default function NovaLocalizacao() {
  const [edicao, setEdicao] = useState("")
  const [fk_localizacao_id, setLocalizacaoId] = useState("")
  const [nome, setNome] = useState("")
  const [tema, setTema] = useState("")
  const [valorinscricao, setValor] = useState("")
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

    await api.post('/eventos', { edicao, fk_localizacao_id, nome, tema, valorinscricao })
    router.push('/eventos')
  }

  return (
    <Layout>
      <Head>
        <title>Novo evento</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/eventos">
        <a>
          Voltar
        </a>
      </Link>

      <h1>Novo Evento</h1>

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
          >
            {localizacoes.map(localizacao => (
              <option value={localizacao.id} key={localizacao.id}>
                {localizacao.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>Cadastrar</button>
      </form>
    </Layout>
  )
}
