/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { IOrder } from "../../../models/Order"
import styles from '../../../styles/Home.module.css'

type Props = {
    order: IOrder
}

function Order({ order }: Props) {
    if (!order) {
        return <ErrorPage statusCode={404} title={"Erro ao procurar pedido"} />;
    }

    const router = useRouter()

    const handleClickGoTo = useCallback((route: string) => {
        router.push(route)
    }, [router])

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {`${order.status}`}
                </h1>
                {order.options.map(({ name, price }) => (
                    <p className={styles.description}>
                        {`${name} - R$ ${price}`}
                    </p>
                ))}
                <p className={styles.description}>
                    Frete: {`R$ ${order.shipping}`}
                </p>

                <p className={styles.description}>
                    Total: {`R$ ${order.cost + order.shipping}`}
                </p>
                <p className={styles.button} onClick={() => (handleClickGoTo(`/orders/${order.restaurantId}/register?orderId=${order._id}`))}>
                    Editar
                </p>
            </main>
        </div>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.query

    try {
        const res = await axios.get(`http://localhost:3000/api/orders/${id}`)

        const order: IOrder= await res.data

        return {
            props: {
                order,
            },
        }
    } catch (error) {
        return {
            props: {
                order: {},
            },
        }
    }

}

export default Order
