import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/">
            Home
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/eventos">
              Eventos
            </Link>
          </li>
          <li>
            <Link href="/localizacoes">
              Localizações
            </Link>
          </li>
          <li>
            <Link href="/pessoas">
              Pessoas
            </Link>
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        Feito com &hearts; por Gabriel Michelassi, Gustavo Reis, Guilherme Balog e Vitória Lorentz
      </footer>
    </div>
  )
}
