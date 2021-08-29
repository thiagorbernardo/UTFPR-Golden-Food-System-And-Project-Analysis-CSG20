/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useRouter } from 'next/router'
import MenuItem from '@material-ui/core/MenuItem';

import { IFood, IOrder } from "../../../models"
import env from "../../../config/Environment";
import styles from '../../../styles/Home.module.css'
import FormsStyle from '../../../styles/Forms.module.css'
import { BackButton } from "../../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextInput, TextSelect } from "../../../components";
import { OrderStatus } from "../../../enum";
import { useEffect } from "react";

interface Props extends IOrder {
  foods: IFood[]
}

function RegisterOrder({ _id, cost, shipping, options, status, restaurantId, foods }: Props) {
  if (!foods.length) {
    return <ErrorPage statusCode={404} title={"Esse restaurante não possui um cardápio para poder criar um pedido!"} />;
  }

  const [orderOptions, setOptions] = useState(options || [])
  const [selectedOptions, setSelected] = useState<string[]>([])
  const [orderShipping, setShipping] = useState(shipping ? `${shipping}` : '')
  const [orderCost, setCost] = useState(`${cost}` || '')
  const [orderStatus, setStatus] = useState(status || '')
  const router = useRouter()

  useEffect(() => {
    const selectedFoods = foods.filter(value => selectedOptions.includes(value._id)).map(({name, price}) => ({name, price}))
    setOptions(selectedFoods)

    const totalPrice = selectedFoods.reduce((acc, curr) => acc + curr.price, 0)
    setCost(`${totalPrice + (+orderShipping || 0)}`)
  }, [orderShipping, foods, selectedOptions])

  const handleSubmit = async () => {
    try {
      if (_id) {
        await axios.patch(`${env.app.url}/api/orders`, {
          _id,
          status: OrderStatus.delivered
        })

        handleClickGoTo(`/orders/${restaurantId}/${_id}`)
      }
      else {
        const res = await axios.post(`${env.app.url}/api/orders?restaurantId=${restaurantId}`, {
          options: orderOptions,
          shipping: +orderShipping,
          cost: +orderCost - +orderShipping,
          restaurantId
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
        {_id ? <div className={FormsStyle.item}>
          <TextInput
            id="status"
            value={orderStatus}
            label="Status"
            onChange={setStatus}
            error={isFieldFilled(orderStatus)}
            select
          >
            {Object.values(OrderStatus).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextInput>
        </div> : <>
          <div className={FormsStyle.item}>
            <TextSelect
              id="options"
              value={selectedOptions}
              label="Pedido"
              onChange={setSelected}
              error={selectedOptions.length === 0}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
          </div>
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
              disabled
            />
          </div>
        </>
        }

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!_id ? isFieldFilled(orderCost) || orderOptions.length === 0 || isFieldFilled(orderShipping): isFieldFilled(orderStatus)}>
          {_id ? "Editar" : "Registrar"}
        </Button>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { orderId, restaurantId } = context.query

  try {
    const res = await axios.get<IOrder>(`${env.app.url}/api/orders/${orderId}`)

    const order = res.data

    const props = { ...order, foods: [] }

    if (!orderId) {
      const resMenu = await axios.get(`${env.app.url}/api/menu/?restaurantId=${restaurantId}`)

      const menu = resMenu.data
      props.foods = menu.foods
    }

    return {
      props: {
        ...props,
        restaurantId
      },
    }
  } catch (error) {
    return {
      props: {
        foods: [],
        restaurantId
      },
    }
  }

}

export default RegisterOrder
