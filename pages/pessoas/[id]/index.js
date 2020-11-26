import Head from 'next/head'
import Link from 'next/link'
import api from '../../../services/api'
import styles from '../../../styles/Home.module.css'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Pessoa({ pessoa }) {
  const router = useRouter()

  if (router.isFallback || !pessoa) {
    return <p className={styles.noData}>Carregando...</p>
  }

  return (
    <Layout>
      <Head>
        <title>Pessoa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href="/pessoas">
          <a>
            Voltar
          </a>
        </Link>
        {' | '}
        <Link href={`/pessoas/${pessoa.id}/editar`}>
          <a>
            Editar
          </a>
        </Link>
      </div>

      <h1>
        {pessoa.nome}
      </h1>

      <p className={styles.description}>
        {pessoa.sexo ? 'Homem' : 'Mulher'}
        {' - '}
        {pessoa.idade} anos
      </p>

      {pessoa.eventos.length > 0 ?
        <>
          <h2>Ingressos comprados</h2>
          <div className={styles.grid}>
            {pessoa.eventos.map(evento => (
              <div className={styles.card} key={evento.id}>
                <h3>{evento.nome} - {evento.edicao}ª Edição</h3>
                <h4>{evento.tema}</h4>
                <p>Comprado em {new Date(evento.datacompra).toLocaleDateString()}</p>
                <div>
                  <small>
                    {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}
                  </small>
                  <Link href={`/eventos/${evento.id}`}>
                    <a>
                      <button>Ver mais</button>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
        :
        <h2 className={styles.noData}>
          Sem ingressos comprados
        </h2>
      }
    </Layout>
  )
}

async function getStaticPaths() {
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

export async function getServerSideProps({ params }) {
  const response = await api.get(`/pessoas/${params.id}`)
  const pessoa = response.data

  return {
    props: {
      pessoa
    }
  }
}
