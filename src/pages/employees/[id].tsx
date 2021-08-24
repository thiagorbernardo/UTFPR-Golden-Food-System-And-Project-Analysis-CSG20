/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { IEmployee } from "../../models"
import styles from '../../styles/Home.module.css'

type Props = {
  employee: IEmployee
}

function Food({ employee }: Props) {
  if (!employee) {
    return <ErrorPage statusCode={404} title={"Erro ao procurar funcionário"} />;
  }

  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {employee.name}
        </h1>

        <p className={styles.description}>
          Score: {employee.score}
        </p>

        <p className={styles.description}>
          Horas de trabalho: <b>{employee.workHours} horas</b> por dia
        </p>

        <p className={styles.button} onClick={() => (handleClickGoTo(`/employees/register?employeeId=${employee._id}`))}>
          Editar
        </p>
      </main>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

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
