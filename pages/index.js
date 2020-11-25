import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import api from '../services/api'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Eventos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Eventos Acadêmicos </h1>

      <p className={styles.description}>
        Veja nossos eventos acadêmicos
        </p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Eventos</h3>
          <p>Veja todos os eventos cadastrados</p>
          <div>
            <Link href="/eventos">
              <a>
                <button>Ver eventos</button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h3>Localizações</h3>
          <p>Veja todas as localizações cadastradas</p>
          <div>
            <Link href="/localizacoes">
              <a>
                <button>Ver localizações</button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h3>Pessoas</h3>
          <p>Veja todas as pessoas cadastradas</p>
          <div>
            <Link href="/pessoas">
              <a>
                <button>Ver pessoas</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
