import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import axios from "axios";
import { useCallback } from "react";
import { useRouter } from 'next/router'

import { IRestaurant } from "../../models"
import styles from '../../styles/BaseScreens.module.css'
import env from "../../config/Environment";
import { BackButton } from "../../components/BackButton";
import { StandardCard } from "../../components";

type Props = {
  restaurants: IRestaurant[]
}

function Restaurants({ restaurants }: Props) {
  if (!restaurants.length) {
    return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
  }

  return (
    <main className={styles.main} >
      {StandardCard("Criar Restaurante", "/restaurants/register")}

      {restaurants.map(({_id, city, name}) => (
        <Card key={_id} _id={_id} city={city} name={name}/>
      ))}
    </main>

  )
}


const Card: React.FC<IRestaurant> = ({ _id, name, city }) => {
  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])

  return (
    <a
      className={styles.card}
      key={_id}
      onClick={() =>  handleClickGoTo(`/restaurants/${_id}`)}
    >
      <h2>{name}</h2>
      <p>{city}</p>
    </a>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${env.app.url}/api/restaurants`)
    const restaurants: IRestaurant[] = res.data

    return {
      props: {
        restaurants,
      },
    }
  } catch (error) {
    return {
      props: {
        restaurants: [],
      },
    }
  }
}

export default Restaurants
