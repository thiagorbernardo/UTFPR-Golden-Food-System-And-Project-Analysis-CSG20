/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router'

import { IRestaurant } from "../../models"
import env from "../../config/Environment";
import styles from '../../styles/Home.module.css'
import FormsStyle from '../../styles/Forms.module.css'
import { BackButton } from "../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextInput } from "../../components";

function Restaurant({ name, _id, city }: IRestaurant) {
  const [restaurantName, setName] = useState(name || '')
  const [restaurantCity, setCity] = useState(city || '')
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (_id) {
        await axios.patch(`${env.app.url}/api/restaurants`, {
          _id,
          name: restaurantName,
          city: restaurantCity
        })

        handleClickGoTo(`/restaurants/${_id}`)
      }
      else {
        const res = await axios.post(`${env.app.url}/api/restaurants`, {
          name: restaurantName,
          city: restaurantCity
        })

        handleClickGoTo(`/restaurants/${res.data.id}`)
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
        {_id ? "Editar" : "Criar"} Restaurante
      </h2>

      <main className={styles.main}>

        <div className={FormsStyle.item}>
          <TextInput id="name" value={restaurantName} label="Nome" onChange={setName} error={isFieldFilled(restaurantName)} />
        </div>

        <div className={FormsStyle.item}>
          <TextInput id="city" value={restaurantCity} label="Cidade" onChange={setCity} error={isFieldFilled(restaurantCity)} />
        </div>

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isFieldFilled(restaurantName) || isFieldFilled(restaurantCity)}>
          {_id ? "Editar" : "Criar"}
        </Button>
      </main>
    </div>
  )
}

interface IResultRestaurant {
  restaurant: IRestaurant,
  profit: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { restaurantId } = context.query

  try {
    const res = await axios.get<IResultRestaurant>(`${env.app.url}/api/restaurants/${restaurantId}`)

    const { restaurant } = res.data

    return {
      props: {
        ...restaurant
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

export default Restaurant
