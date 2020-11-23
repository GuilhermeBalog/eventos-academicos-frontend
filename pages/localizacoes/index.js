import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Localizacoes({ localizacoes }) {
  const [localizacoesAtuais, setLocalizacoes] = useState(localizacoes)

  async function handleDelete(id) {
    await api.delete(`/localizacoes/${id}`)
    setLocalizacoes(localizacoesAtuais.filter(localizacao => localizacao.id !== id))
  }

  return (
    <Layout>
      <Head>
        <title>Localizações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Localizações </h1>

      <p className={styles.description}>
        Veja as localizações disponíveis para realizar um evento acadêmico
      </p>

      {localizacoesAtuais.length > 0 ?
        (
          <div className={styles.grid}>
            <Link href="/localizacoes/novo">
              <a className={styles.newCard}>
                <FaPlus color="#fff" size={36} />
              </a>
            </Link>
            {localizacoesAtuais.map(localizacao => (
              <div className={styles.card} key={localizacao.id}>
                <h3>{localizacao.endereco}</h3>
                <div>
                  <small>{localizacao.valor > 0 ? `R$ ${localizacao.valor.toFixed(2)}` : 'Grátis'}</small>
                  <button className={styles.removeBtn} onClick={() => handleDelete(localizacao.id)}>
                    <FaTrashAlt color='#fff' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) :
        (
          <p className={styles.noData}>Sem localizações cadastradas</p>
        )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await api.get('/localizacoes')
  const localizacoes = response.data

  return {
    props: {
      localizacoes
    },
    revalidate: 1
  }
}