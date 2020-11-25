import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Pessoas() {
  const [pessoas, setPessoas] = useState([])

  useEffect(async () => {
    const response = await api.get('/pessoas')
    setPessoas(response.data)
  }, [])

  async function handleDelete(id, event) {
    event.target.disabled = true
    const response = await api.delete(`/pessoas/${id}`)
    console.log(response);
    setPessoas(pessoas.filter(pessoa => pessoa.id !== id))
  }

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

      <div className={styles.grid}>
        <Link href="/pessoas/novo">
          <a className={styles.newCard}>
            <FaPlus color="#fff" size={36} />
          </a>
        </Link>
        {pessoas.length > 0 ?
          pessoas.map(pessoa => (
            <div className={styles.card} key={pessoa.id}>
              <h3>{pessoa.nome}</h3>
              <h4>{pessoa.idade} anos</h4>
              <div>
                <p>{pessoa.sexo ? 'Homem' : 'Mulher'}</p>
                <div>
                  <Link href={`/pessoas/${pessoa.id}`}>
                    <a>
                      <button>Ver ingressos</button>
                    </a>
                  </Link>
                  <Link href={`/pessoas/${pessoa.id}/editar`}>
                    <a>
                      <button>
                        <FaEdit color='#fff' />
                      </button>
                    </a>
                  </Link>
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => handleDelete(pessoa.id, e)}
                  >
                    <FaTrashAlt color='#fff' />
                  </button>
                </div>
              </div>
            </div>
          )) :
          (
            <div className={styles.card}>
              <p className={styles.noData}>Carregando...</p>
            </div>
          )
        }
      </div>
    </Layout>
  )
}
