import Head from 'next/head'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Home({ localizacoes }) {
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

        {localizacoes.length > 0 ?
          (
            <div className={styles.grid}>
              {localizacoes.map(localizacao => (
                <div className={styles.card} key={localizacao.id}>
                  <h3>{localizacao.endereco}</h3>
                  <div>
                    <small>{localizacao.valor > 0 ? `R$ ${localizacao.valor.toFixed(2)}` : 'Grátis'}</small>
                  </div>
                </div>
              ))}
            </div>
          ) :
          (
            <p className={styles.noData}>Sem localizações cadastradas</p>
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
  const response = await api.get('/localizacoes')
  const localizacoes = response.data

  return {
    props: {
      localizacoes
    }
  }
}