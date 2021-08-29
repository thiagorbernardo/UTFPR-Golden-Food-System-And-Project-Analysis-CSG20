import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";

import { IMenu } from "../../models/Menu"
import styles from '../../styles/Home.module.css'

type Props = {
  menu: IMenu
}

function Food({ menu }: Props) {
  if (!menu) {
    return <ErrorPage statusCode={404} title={"Erro ao procurar menu"} />;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {menu.}
        </h1>

        <p className={styles.description}>
        Preço: {`R$ ${menu.price}`}
        </p>

        <p className={styles.description}>
        Ingredientes: {getIngredients()}
        </p>
      </main>
    </div>

  )
}
const card = ({ _id, name}: IMenu) => {
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
export const getServerSideProps: GetServerSideProps = async (context) =>  {

  const { id } = context.query

  try {
    const res = await axios.get(`http://localhost:3000/api/foods/${id}`)

    const menu: IFood = await res.data

  return {
    props: {
      menu,
    },
  }
  } catch (error) {
    return {
      props: {
        menu: {},
      },
    }
  }

}

export default Food
