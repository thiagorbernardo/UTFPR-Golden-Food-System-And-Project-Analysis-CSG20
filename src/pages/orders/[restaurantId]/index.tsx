import { GetServerSideProps } from "next"
import Head from 'next/head'
import ErrorPage from "next/error";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from 'next/router'

import { IOrder } from "../../../models"
import styles from '../../../styles/BaseScreens.module.css'
import env from "../../../config/Environment";
import { BackButton } from "../../../components/BackButton";
import { StandardCard } from "../../../components";

type Props = {
  orders: IOrder[]
  restaurantId: string
}

function Blog({ orders, restaurantId }: Props) {
  return (
    <main className={styles.main} >
      <Head>
        <title>Pedidos</title>
      </Head>
      <BackButton/>
      {StandardCard("Registrar Pedido", `/orders/${restaurantId}/register`)}
      {orders.map(({_id, createdAt, status}) => (
        <Card key={_id} _id={_id} status={status} createdAt={createdAt} restaurantId={restaurantId}/>
      ))}
    </main>

  )
}


const Card: React.FC<Partial<IOrder>> = ({ _id, createdAt, status, restaurantId}) => {
  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])
  const date = new Date(createdAt!)

  return (
    <a
      className={styles.card}
      key={_id}
      onClick={() =>  handleClickGoTo(`/orders/${restaurantId}/${_id}`)}
    >
      <p>{status}</p>
      <p>{date.toISOString().substr(0, 10)}</p>

    </a>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { restaurantId } = context.query

  try {
    const res = await axios.get(`${env.app.url}/api/orders?restaurantId=${restaurantId}`)

    const orders: IOrder[] = res.data

    return {
      props: {
        orders,
        restaurantId
      },
    }
  } catch (error) {
    return {
      props: {
        orders: [],
        restaurantId
      },
    }
  }
}

export default Blog
