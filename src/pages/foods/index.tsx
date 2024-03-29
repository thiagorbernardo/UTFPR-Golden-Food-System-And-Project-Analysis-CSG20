import { GetServerSideProps } from "next"
import ErrorPage from "next/error";

import { IFood } from "../../models/Food"
import styles from '../../styles/BaseScreens.module.css'
import axios from "axios";
import { StandardCard } from "../../components";

type Props = {
  foods: IFood[]
}

function Blog({ foods }: Props) {
  if (!foods.length) {
    return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
  }

  return (
    <main className={styles.main}>
      {StandardCard("Registrar Receita", "/foods/register")}
      {foods.map((post) => (
        card(post)
      ))}
    </main>

  )
}

const card = ({ _id, name, ingredients }: IFood) => {
  return (
    <a
      className={styles.card}
      key={_id}
      href={`/foods/${_id}`}
    >
      <h2>{name}</h2>
    </a>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {

      const res = await axios.get('http://localhost:3000/api/foods')
      const foods: IFood[] = res.data

    return {
      props: {
        foods,
      },
    }
  } catch (error) {
    return {
      props: {
        foods: [],
      },
    }
  }
}

export default Blog
