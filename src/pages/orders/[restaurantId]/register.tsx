/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router'

import { IOrder } from "../../../models"
import env from "../../../config/Environment";
import styles from '../../../styles/Home.module.css'
import FormsStyle from '../../../styles/Forms.module.css'
import { BackButton } from "../../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextInput } from "../../../components";
import { OrderStatus } from "../../../enum";

function RegisterOrder({ _id, cost, shipping, options, status, restaurantId }: IOrder) {
    const [orderOptions, setOptions] = useState(options || [])
    const [orderShipping, setShipping] = useState(`${shipping}` || '')
    const [orderCost, setCost] = useState(`${cost}` || '')
    const [orderStatus, setStatus] = useState(status || '')
    const router = useRouter()
    const handleSubmit = async () => {
        try {
            if (_id) {
                await axios.patch(`${env.app.url}/api/orders`, {
                    _id,
                    options: orderOptions,
                    shipping: +orderShipping,
                    cost: +orderCost,
                    status: OrderStatus.delivered
                })

                handleClickGoTo(`/orders/${restaurantId}/${_id}`)
            }
            else {
                const res = await axios.post(`${env.app.url}/api/orders`, {
                    options: orderOptions,
                    shipping: +orderShipping,
                    cost: +orderCost
                })
                handleClickGoTo(`/orders/${restaurantId}/${res.data.id}`)
            }
        } catch (error) {
            console.log(error)
            return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
        }

    }

    const isFieldFilled = (value: string) => value.length === 0


    const handleClickGoTo = useCallback((route: string) => {
        router.push(route)
    }, [router])

    return (
        <div className={styles.container}>
            <Head>
                <title>Cadastro | Golden Food</title>
            </Head>

            <BackButton />

            <h2 className={FormsStyle.title}>
                {_id ? "Editar" : "Registrar"} Pedido
            </h2>

            <main className={styles.main}>

                {/* <div className={FormsStyle.item}>
          <TextInput
            id="options"
            value={orderOptions}
            label="Pedido"
            onChange={setOptions}
            error={isFieldFilled(orderOptions)} />
        </div> */}

                {_id ? <div className={FormsStyle.item}>
                    <TextInput
                        id="status"
                        value={orderStatus}
                        label="status"
                        onChange={setStatus}
                        error={isFieldFilled(orderStatus)}
                    />
                </div> : <></>
                }

                <div className={FormsStyle.item}>
                    <TextInput
                        id="shipping"
                        value={orderShipping}
                        label="Frete"
                        onChange={setShipping}
                        error={isFieldFilled(orderShipping)}
                        type="number"
                    />
                </div>

                <div className={FormsStyle.item}>
                    <TextInput
                        id="cost"
                        value={orderCost}
                        label="Total"
                        onChange={setCost}
                        error={isFieldFilled(orderCost)}
                        type="number"
                    />
                </div>

                {/* <div className={FormsStyle.item}>
          <TextInput
            id="ingredients"
            value={foodIngredients}
            label="Ingredientes separados por ,"
            onChange={(value: string) => setIngredients(value.split(","))}
            error={foodIngredients.length === 0}
          />
        </div> */}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isFieldFilled(orderCost) /*|| foodIngredients.length === 0*/ || isFieldFilled(orderShipping)}>
                    {_id ? "Editar" : "Registrar"}
                </Button>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { orderId } = context.query

    try {
        const res = await axios.get<IOrder>(`${env.app.url}/api/orders/${orderId}`)

        const order = res.data

        return {
            props: {
                ...order
            },
        }
    } catch (error) {
        return {
            props: {
            },
        }
    }

}

export default RegisterOrder
