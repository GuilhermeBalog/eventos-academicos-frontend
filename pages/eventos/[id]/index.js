import Head from 'next/head'
import Link from 'next/link'
import { FaMoneyBillWave } from 'react-icons/fa'
import api from '../../../services/api'
import styles from '../../../styles/Home.module.css'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Evento({ evento }) {
  const router = useRouter()
  const [ingressos, setIngressos] = useState(evento.pessoas)

  if (router.isFallback || !evento) {
    return <p className={styles.noData}>Carregando...</p>
  }

  useEffect(async () => {
    const response = await api.get(`/eventos/${evento.id}`)
    const eventoResponse = response.data

    setIngressos(eventoResponse.pessoas)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href="/eventos">
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
        {evento.nome} - {evento.edicao}ª Edição
      </h1>

      <p className={styles.description}>
        {evento.tema}
      </p>

      <small>
        <strong>{evento.localizacao}</strong>
        {' - '}
        {evento.endereco}
      </small>

      <p className={styles.description}>
        Valor base do ingresso: {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}
      </p>

      <h2>Ingressos Vendidos</h2>

      <div className={styles.grid}>
        <Link href={`/eventos/${evento.id}/vender`}>
          <a className={`${styles.newCard}`}>
            <FaMoneyBillWave color="#fff" size={36} />
            <br />
            <strong>Vender ingresso</strong>
          </a>
        </Link>
        {ingressos.length > 0 && ingressos.map(pessoa => (
          <div className={styles.card} key={pessoa.id}>
            <h3>{pessoa.nome}</h3>
            <h4>{pessoa.idade} anos</h4>
            <p>Comprado em {new Date(pessoa.datacompra).toLocaleDateString()}</p>
            <div>
              <Link href={`/pessoas/${pessoa.id}`}>
                <a>
                  <button>Ver mais</button>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
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
