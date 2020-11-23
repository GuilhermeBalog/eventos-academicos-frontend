import Head from 'next/head'
import Link from 'next/link'
import api from '../../../services/api'
import styles from '../../../styles/Home.module.css'
import Layout from '../../../components/Layout'

export default function Evento({ evento }) {
  return (
    <Layout>
      <Head>
        <title>Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/eventos">
        <a>
          Voltar
        </a>
      </Link>
      <h1>{evento.nome} - {evento.edicao}ª Edição</h1>

      <p className={styles.description}>
        {evento.tema}
      </p>
      <p className={styles.description}>
        {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}
      </p>
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
    fallback: false
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
