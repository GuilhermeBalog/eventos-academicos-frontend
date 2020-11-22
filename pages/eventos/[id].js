import Head from 'next/head'
import Link from 'next/link'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'
import Layout from '../../components/Layout'

export default function Evento({ evento }) {
  return (
    <Layout>
      <Head>
        <title>Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{evento.nome} - {evento.edicao}ª Edição</h1>

      <p className={styles.description}>
        {evento.tema}
      </p>
      <p className={styles.description}>
        {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}
      </p>

      {/* {eventos.length > 0 ?
          (
            <div className={styles.grid}>
              {eventos.map(evento => (
                <div className={styles.card} key={evento.id}>
                  <h3>{evento.nome} - {evento.edicao}ª Edição</h3>
                  <h4>{evento.tema}</h4>
                  <p>{evento.endereco}</p>
                  <div>
                    <small>{evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}</small>
                    <Link href={`/eventos/${evento.id}`}>
                      <a>
                        <button>Ver mais</button>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) :
          (
            <p className={styles.noData}>Sem eventos cadastrados</p>
          )
        } */}
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
