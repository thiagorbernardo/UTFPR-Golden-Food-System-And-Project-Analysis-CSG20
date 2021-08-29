/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from "next"
import Head from 'next/head'
import ErrorPage from "next/error";

import { IFood } from "../../models/Food"
import styles from '../../styles/BaseScreens.module.css'
import { StandardCard } from "../../components";
import axios from "axios";
import env from "../../config/Environment";
import { IMenu } from "../../models";
import { FoodCategories } from "../../enum";
import { useEffect } from "react";

type Props = {
  foods: IFood[],
  menu: IMenu,
  restaurantId: string
}

interface IFoodCategorized extends IFood {
  category: FoodCategories
}

function Menu({ foods, menu, restaurantId }: Props) {
  // if (!foods.length || !menu) {
  //   return <ErrorPage statusCode={404} title={"Esse restaurante não possui menu"} />;
  // }

  let foodsCategorization = foods.map((food) => {
    let category
    if (menu.dessert.includes(food._id)) category = FoodCategories.dessert
    else if (menu.drinks.includes(food._id)) category = FoodCategories.drinks
    else if (menu.mainCourse.includes(food._id)) category = FoodCategories.mainCourse
    else category = FoodCategories.general

    return {...food, category}
  })

  const filterFoodByCategory = (category: FoodCategories) => foodsCategorization.filter(food => food.category === category)

  foodsCategorization = [
    ...filterFoodByCategory(FoodCategories.mainCourse),
    ...filterFoodByCategory(FoodCategories.drinks),
    ...filterFoodByCategory(FoodCategories.dessert),
    ...filterFoodByCategory(FoodCategories.general)
  ]

  return (
    <main className={styles.main}>
      <Head>
        <title>Menu | Golden Food</title>
      </Head>

      {StandardCard(`${menu ? "Editar" : "Registrar"} Cardápio`, `/menus/register?restaurantId=${restaurantId}`)}
      {foodsCategorization.map((food) => (
        card(food)
      ))}

    </main>

  )
}

const card = ({ _id, name, price, category }: IFoodCategorized) => {
  return (
    <a
      className={styles.card}
      key={_id}
      href={`/foods/${_id}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{name}</h2>
        <h2>{`R$ ${price.toFixed(2)}`}</h2>
      </div>
        <p>{category}</p>
    </a>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantId } = context.query

  try {
    const res = await axios.get(`${env.app.url}/api/menu?restaurantId=${restaurantId}`)

    return {
      props: {
        ...res.data,
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

export default Menu
