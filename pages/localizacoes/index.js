import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrashAlt, FaPlus, FaEdit } from 'react-icons/fa'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Localizacoes() {
  const [localizacoesAtuais, setLocalizacoes] = useState([])

  useEffect(async () => {
    const response = await api.get('/localizacoes')
    setLocalizacoes(response.data)
  }, [])

  async function handleDelete(id, event) {
    event.target.disabled = true
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

      <div className={styles.grid}>
        <Link href="/localizacoes/novo">
          <a className={styles.newCard}>
            <FaPlus color="#fff" size={36} />
          </a>
        </Link>
        {localizacoesAtuais.length > 0 ?
          localizacoesAtuais.map(localizacao => (
            <div className={styles.card} key={localizacao.id}>
              <h3>{localizacao.nome ? localizacao.nome : 'Nome do local'}</h3>
              <p>{localizacao.endereco}</p>
              <div>
                <small>
                  Aluguel: {localizacao.valor > 0 ? `R$ ${localizacao.valor.toFixed(2)}` : 'Grátis'}
                </small>
                <div>
                  <Link href={`/localizacoes/${localizacao.id}/editar`}>
                    <a>
                      <button>
                        <FaEdit color='#fff' />
                      </button>
                    </a>
                  </Link>
                  <button className={styles.removeBtn} onClick={(e) => handleDelete(localizacao.id, e)}>
                    <FaTrashAlt color='#fff' />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.card}>
              <p className={styles.noData}>Carregando...</p>
            </div>
          )
        }
      </div>
    </Layout>
  )
}
