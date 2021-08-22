/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { IFood } from "../../models/Food"
import styles from '../../styles/Home.module.css'

type Props = {
  food: IFood
}

function Food({ food }: Props) {
  if (!food) {
    return <ErrorPage statusCode={404} title={"Erro ao procurar receita"} />;
  }

  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])

  const totalOfIngredients = food.ingredients.length
  const getIngredients = () => food.ingredients.slice(0, totalOfIngredients - 1).join(', ') + ' e ' + food.ingredients[totalOfIngredients - 1]

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {food.name}
        </h1>

        <p className={styles.description}>
          Preço: {`R$ ${food.price}`}
        </p>

        <p className={styles.description}>
          Ingredientes: {getIngredients()}
        </p>

        <p className={styles.button} onClick={() => (handleClickGoTo(`/foods/register?foodId=${food._id}`))}>
          Editar
        </p>
      </main>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.query

  try {
    const res = await axios.get(`http://localhost:3000/api/foods/${id}`)

    const food: IFood = await res.data

    return {
      props: {
        food,
      },
    }
  } catch (error) {
    return {
      props: {
        food: {},
      },
    }
  }

}

export default Food
