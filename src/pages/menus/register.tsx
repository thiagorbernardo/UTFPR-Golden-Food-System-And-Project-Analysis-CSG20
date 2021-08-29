/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { useRouter } from 'next/router'
import MenuItem from '@material-ui/core/MenuItem';

import { IFood, IMenu, IOrder } from "../../models"
import env from "../../config/Environment";
import styles from '../../styles/Home.module.css'
import FormsStyle from '../../styles/Forms.module.css'
import { BackButton } from "../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextSelect } from "../../components";
import { OrderStatus } from "../../enum";

interface Props {
  menu: IMenu
  foods: IFood[]
  restaurantId: string
}

function RegisterOrder({ menu, foods, restaurantId }: Props) {
  const [dessert, setDessert] = useState(menu?.dessert || [])
  const [general, setGeneral] = useState(menu?.general || [])
  const [drinks, setDrinks] = useState(menu?.drinks || [])
  const [mainCourse, setMainCourse] = useState(menu?.mainCourse || [])
  const [unavailableFoods, setUnavailableFOods] = useState(menu?.unavailableFoods || [])
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (menu) {
        await axios.patch(`${env.app.url}/api/menu`, {
          _id: menu._id,
          dessert,
          general,
          drinks,
          mainCourse,
          unavailableFoods,
        })
      }
      else {
        await axios.post(`${env.app.url}/api/menu?restaurantId=${restaurantId}`, {
          dessert,
          general,
          drinks,
          mainCourse,
          unavailableFoods,
          restaurantId
        })
      }
        handleClickGoTo(`/menus?restaurantId=${restaurantId}`)
      } catch (error) {
      console.log(error)
      return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
    }

  }

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
        {menu ? "Editar" : "Registrar"} Cardápio
      </h2>

      <main className={styles.main}>
          <div className={FormsStyle.item}>
            <TextSelect
              id="mainCourse"
              value={mainCourse}
              label="Pratos Principais"
              onChange={setMainCourse}
              error={mainCourse.length === 0}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
        </div>

        <div className={FormsStyle.item}>
            <TextSelect
              id="drinks"
              value={drinks}
              label="Bebidas"
              onChange={setDrinks}
              error={drinks.length === 0}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
        </div>

        <div className={FormsStyle.item}>
            <TextSelect
              id="dessert"
              value={dessert}
              label="Sobremesas"
              onChange={setDessert}
              error={dessert.length === 0}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
        </div>

        <div className={FormsStyle.item}>
            <TextSelect
              id="general"
              value={general}
              label="Gerais"
              onChange={setGeneral}
              error={general.length === 0}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
        </div>

        <div className={FormsStyle.item}>
            <TextSelect
              id="unavailableFoods"
              value={unavailableFoods}
              label="Pratos Indisponíveis"
              onChange={setUnavailableFOods}
              error={false}
            >
              {foods.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {`${option.name} - ${option.price}`}
                </MenuItem>
              ))}
            </TextSelect>
          </div>


        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        disabled={dessert.length === 0 || mainCourse.length === 0 || drinks.length === 0 || general.length === 0}
        >
          {menu ? "Editar" : "Registrar"}
        </Button>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { restaurantId } = context.query

  try {
    const resMenu = await axios.get(`${env.app.url}/api/menu/?restaurantId=${restaurantId}`)
    const resFoods = await axios.get(`${env.app.url}/api/foods/`)

    return {
      props: {
        menu: resMenu.data.menu,
        foods: resFoods.data,
        restaurantId
      },
    }
  } catch (error) {
    return {
      props: {
        foods: [],
        menu: {},
        restaurantId
      },
    }
  }

}

export default RegisterOrder
