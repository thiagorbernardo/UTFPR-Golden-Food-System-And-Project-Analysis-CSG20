/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import { useCallback } from "react";
import { useRouter } from 'next/router'

import { IRestaurant } from "../../models"
import styles from '../../styles/Home.module.css'
import env from "../../config/Environment";
import { BackButton } from "../../components/BackButton";

type Props = {
  restaurant: IRestaurant
}

function Food({ restaurant }: Props) {
  if (!restaurant) {
    return <ErrorPage statusCode={404} title={"Erro ao procurar restaurante"} />;
  }

  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])


  return (
    <div className={styles.container}>
      <Head>
        <title>{restaurant.name}</title>
      </Head>

      <BackButton />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {restaurant.name}
        </h1>

        <p className={styles.description}>
          {restaurant.city}
        </p>

        <div className={styles.buttonGrid}>
          <p className={styles.button} onClick={() =>  handleClickGoTo(`/restaurants/`)}>
            Pedidos
          </p>

          <p className={styles.button} onClick={() =>  handleClickGoTo(`/restaurants/`)}>
            Funcionários
          </p>

          <p className={styles.button} onClick={() =>  handleClickGoTo(`/restaurants/`)}>
            Cardápio
          </p>
        </div>

        <p className={styles.button}>
          Calcular lucro diário
        </p>
      </main>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.query

  try {
    const res = await axios.get(`${env.app.url}/api/restaurants/${id}`)

    const restaurant: IRestaurant = await res.data

    return {
      props: {
        restaurant,
      },
    }
  } catch (error) {
    return {
      props: {
        restaurant: {},
      },
    }
  }

}

export default Food
