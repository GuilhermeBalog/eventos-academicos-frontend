import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrashAlt, FaPlus, FaEdit } from 'react-icons/fa'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Eventos() {
  const [eventos, setEventos] = useState([])

  useEffect(async () => {
    const response = await api.get('/eventos')
    setEventos(response.data)
  }, [])

  async function handleDelete(id, event) {
    event.target.disabled = true
    await api.delete(`/eventos/${id}`)
    setEventos(eventos.filter(evento => evento.id !== id))
  }

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
        <Link href="/eventos/novo">
          <a className={styles.newCard}>
            <FaPlus color="#fff" size={36} />
          </a>
        </Link>
        {eventos.length > 0 ?
          eventos.map(evento => (
            <div className={styles.card} key={evento.id}>
              <h3>{evento.nome} - {evento.edicao}ª Edição</h3>
              <h4>{evento.tema}</h4>
              <p>
                <strong>{evento.localizacao}</strong>
                {' - '}
                {evento.endereco}
              </p>
              <div>
                <small>Ingresso: {evento.valorinscricao > 0 ? `R$ ${evento.valorinscricao.toFixed(2)}` : 'Grátis'}</small>
                <div>
                  <Link href={`/eventos/${evento.id}`}>
                    <a>
                      <button>Ver mais</button>
                    </a>
                  </Link>
                  <Link href={`/eventos/${evento.id}/editar`}>
                    <a>
                      <button>
                        <FaEdit color='#fff' />
                      </button>
                    </a>
                  </Link>
                  <button className={styles.removeBtn} onClick={(e) => handleDelete(evento.id, e)}>
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
