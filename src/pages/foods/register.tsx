/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router'

import { IFood } from "../../models"
import env from "../../config/Environment";
import styles from '../../styles/Home.module.css'
import FormsStyle from '../../styles/Forms.module.css'
import { BackButton } from "../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextInput } from "../../components";

function Restaurant({ name, _id, ingredients, price }: IFood) {
  const [foodName, setName] = useState(name || '')
  const [foodIngredients, setIngredients] = useState(ingredients || [])
  const [foodPrice, setPrice] = useState(`${price}` || '')
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (_id) {
        await axios.patch(`${env.app.url}/api/foods`, {
          _id,
          name: foodName,
          ingredients: foodIngredients,
          price: foodPrice
        })

        handleClickGoTo(`/foods/${_id}`)
      }
      else {
        const res = await axios.post(`${env.app.url}/api/foods`, {
          name: foodName,
          ingredients: foodIngredients,
          price: foodPrice
        })

        handleClickGoTo(`/foods/${res.data.id}`)
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
        {_id ? "Editar" : "Registrar"} Receita
      </h2>

      <main className={styles.main}>

        <div className={FormsStyle.item}>
          <TextInput
            id="name"
            value={foodName}
            label="Nome"
            onChange={setName}
            error={isFieldFilled(foodName)} />
        </div>

        <div className={FormsStyle.item}>
          <TextInput
            id="price"
            value={foodPrice}
            label="Preço"
            onChange={setPrice}
            error={isFieldFilled(foodPrice)}
            type="number"
          />
        </div>

        <div className={FormsStyle.item}>
          <TextInput
            id="ingredients"
            value={foodIngredients}
            label="Ingredientes separados por ,"
            onChange={(value: string) => setIngredients(value.split(","))}
            error={foodIngredients.length === 0}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isFieldFilled(foodName) || foodIngredients.length === 0 || isFieldFilled(foodPrice)}>
          {_id ? "Editar" : "Registrar"}
        </Button>
      </main>
    </div>
  )
}

interface IResultRestaurant {
  restaurant: IFood,
  profit: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { restaurantId } = context.query

  try {
    const res = await axios.get<IResultRestaurant>(`${env.app.url}/api/foods/${restaurantId}`)

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
