import { GetServerSideProps } from "next"
import axios from "axios";

import { IEmployee } from "../../models";
import styles from '../../styles/BaseScreens.module.css'
import { StandardCard } from "../../components";

type Props = {
  employees: IEmployee[],
  restaurantId: string | null
}

function Blog({ employees, restaurantId }: Props) {
  return (
    <main className={styles.main}>
      {StandardCard("Registrar Funcionário", restaurantId ? `/employees/register?restaurantId=${restaurantId}` : `/employees/register`)}
      {employees.map((post) => (
        card(post)
      ))}
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
        restaurantId: restaurantId || null
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
