import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Golden Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao <b>Golden Food</b>
        </h1>

        <p className={styles.description}>
          Aqui você pode selecionar qual informação deseja ver:
        </p>

        <div className={styles.grid}>

          <Link href="/restaurants" passHref >
            <div className={styles.card}>
            <h2>Restaurantes &rarr;</h2>
            <p>Aqui é possível encontrar todas as unidades da Golden.</p>
            </div>
          </Link>


          <Link href="/orders" passHref >
          <div className={styles.card}>
            <h2>Pedidos &rarr;</h2>
            <p>Veja todos os pedidos de cada unidade da rede.</p>
            </div>
          </Link>

          <Link href="/employees" passHref >
          <div className={styles.card}>
            <h2>Funcionários &rarr;</h2>
            <p>Procure os funcionários da rede e de que unidade eles pertecem.</p>
            </div>
          </Link>

          <Link href="/foods" passHref >
          <div className={styles.card}>
            <h2>Receitas &rarr;</h2>
            <p>Encontre as receitas de cada comida.</p>
            </div>
          </Link>

          {/* <Link href="/menus" passHref >
          <div className={styles.card}>
            <h2>Cardápios &rarr;</h2>
            <p>
              Aqui você pode encontrar o cardápio de cada restaurante e as
              receitas disponíveis.
            </p>
            </div>
          </Link> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Desenvolvido por <b>Thiago, João e Marco</b>
        </a>
      </footer>
    </div>
  );
}
