import { GetServerSideProps } from "next"
import Head from 'next/head'
import ErrorPage from "next/error";

import { IEmployee } from "../../models";
import styles from '../../styles/BaseScreens.module.css'
import axios from "axios";

type Props = {
  employees: IEmployee[]
}

function Blog({ employees }: Props) {
  if (!employees.length) {
    return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Funcionários</title>
      </Head>

      {/* <div className={styles.grid}> */}
      {employees.map((post) => (
        card(post)
      ))}
      {/* </div> */}
    </main>

  )
}

const card = ({ _id, name }: IEmployee) => {
  return (
    <a
      className={styles.card}
      key={_id}
      href={`/employees/${_id}`}
    >
      <h2>{name}</h2>
      {/* <p>Ingredientes: {ingredients.join(', ')}</p> */}
    </a>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantId } = context.query as any

  try {
    const res = await axios.get(`http://localhost:3000/api/employees`, {
      params: {
        restaurantId
      }
    })
      const employees: IEmployee[] = res.data

    return {
      props: {
        employees,
      },
    }
  } catch (error) {
    return {
      props: {
        employees: [],
      },
    }
  }
}

export default Blog
