import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";

import { IEmployee } from "../../models"
import styles from '../../styles/Home.module.css'

type Props = {
  employee: IEmployee
}

function Food({ employee }: Props) {
  if (!employee) {
    return <ErrorPage statusCode={404} title={"Erro ao procurar funcionário"} />;
  }

  // const totalOfIngredients = employee.ingredients.length
  // const getIngredients = () => employee.ingredients.slice(0, totalOfIngredients - 1).join(', ') + ' e ' + employee.ingredients[totalOfIngredients - 1]

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {employee.name}
        </h1>

        <p className={styles.description}>
        Score: {employee.score}
        </p>

        {/* <p className={styles.description}>
        Ingredientes: {employee.}
        </p> */}
      </main>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {

  const { id } = context.query

  try {
    const res = await axios.get(`http://localhost:3000/api/employees/${id}`)

    const employee: IEmployee = await res.data

  return {
    props: {
      employee,
    },
  }
  } catch (error) {
    return {
      props: {
        employee: {},
      },
    }
  }

}

export default Food
