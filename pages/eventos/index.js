import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import api from '../../services/api'
import styles from '../../styles/Home.module.css'

export default function Eventos({ eventos }) {
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

      {eventos.length > 0 ?
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
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await api.get('/eventos')
  const eventos = response.data
  // const eventos = [
  //   { nome: 'Meu evento', edicao: 2, tema: 'Meu tema muito legal', id: 1, valorinscricao: 2.5, endereco: 'Minha rua top, 1390 - Centro' },
  //   { nome: 'Meu evento', edicao: 2, tema: 'Meu tema muito legal', id: 2, valorinscricao: 2.5, endereco: 'Minha rua top, 1390 - Centro' },
  // ]

  return {
    props: {
      eventos
    }
  }
}