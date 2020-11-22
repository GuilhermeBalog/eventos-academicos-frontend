import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Pessoas({ pessoas }) {
  return (
    <Layout>
      <Head>
        <title>Pessoas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pessoas</h1>

      <p className={styles.description}>
        Veja as pessoas cadastradas no nosso sistema
      </p>

      {pessoas.length > 0 ?
        (
          <div className={styles.grid}>
            {pessoas.map(pessoa => (
              <div className={styles.card} key={pessoa.id}>
                <h3>{pessoa.nome}</h3>
                <h4>{pessoa.idade} anos</h4>
                <div>
                  <p>{pessoa.sexo ? 'Homem' : 'Mulher'}</p>
                  <Link href={`/pessoas/${pessoa.id}`}>
                    <a>
                      <button>Ver participações</button>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) :
        (
          <p className={styles.noData}>Sem pessoas cadastradas</p>
        )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await api.get('/pessoas')
  const pessoas = response.data

  return {
    props: {
      pessoas
    }
  }
}