import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Golden Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao <b >Golden Food</b>
        </h1>

        <p className={styles.description}>
          Aqui você pode selecionar qual informação deseja ver:
        </p>

        <div className={styles.grid}>
          <a href="/foods" className={styles.card}>
            <h2>Receitas &rarr;</h2>
            <p>Encontre as receitas de cada comida.</p>
          </a>

          <a href="/employees" className={styles.card}>
            <h2>Funcionários &rarr;</h2>
            <p>Procure os funcionários da rede e de que unidade eles pertecem.</p>
          </a>

          <a href="/menu" className={styles.card}>
            <h2>Cardápios &rarr;</h2>
            <p>Aqui você pode encontrar o cardápio de cada restaurante e as receitas disponíveis.</p>
          </a>

          <a href="/orders" className={styles.card}>
            <h2>Pedidos &rarr;</h2>
            <p>Veja todos os pedidos concluídos em andamentos de cada unidade da rede.</p>
          </a>

          <a href="/restaurants" className={styles.card}>
            <h2>Restaurantes &rarr;</h2>
            <p>Aqui é possível encontrar todas as unidades da Golden.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Desenvolvido por <b>Thiago, João e Marco</b>
        </a>
      </footer>
    </div>
  )
}
