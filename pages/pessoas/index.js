import Head from 'next/head'
import Link from 'next/link'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Home({ pessoas }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Localizações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Localizações </h1>

        <p className={styles.description}>
          Veja as localizações disponíveis para realizar um evento acadêmico
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
      </main>

      <footer className={styles.footer}>
        Feito com &hearts; por Gabriel Michelassi, Gustavo Reis, Guilherme Balog e Vitória Lorentz
      </footer>
    </div>
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