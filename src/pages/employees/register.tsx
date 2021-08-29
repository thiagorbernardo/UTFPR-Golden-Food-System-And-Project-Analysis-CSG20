/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next"
import ErrorPage from "next/error";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router'
import MenuItem from '@material-ui/core/MenuItem';

import { IEmployee, IRestaurant } from "../../models"
import env from "../../config/Environment";
import styles from '../../styles/Home.module.css'
import FormsStyle from '../../styles/Forms.module.css'
import { BackButton } from "../../components/BackButton";
import { Button } from "@material-ui/core";
import { TextInput } from "../../components";

interface Props extends IEmployee{
  restaurantOptions: IRestaurant[]
}

function RegisterEmployee({ name, _id, workHours, score, restaurantId, restaurantOptions }: Props) {
  const [employeeName, setName] = useState(name || '')
  const [employeeRestaurantId, setRestaurantId] = useState(restaurantId || '')
  const [employeeWorkHours, setWorkHours] = useState(`${workHours}` || '')
  const [employeeScore, setScore] = useState(`${score}` || '')
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (_id) {
        await axios.patch(`${env.app.url}/api/employees?restaurantId=${employeeRestaurantId}`, {
          _id,
          name: employeeName,
          workHours: +employeeWorkHours,
          score: +employeeScore
        })

        handleClickGoTo(`/employees/${_id}`)
      }
      else {
        const res = await axios.post(`${env.app.url}/api/employees?restaurantId=${employeeRestaurantId}`, {
          name: employeeName,
          workHours: +employeeWorkHours,
          score: +employeeScore
        })

        handleClickGoTo(`/employees/${res.data.id}`)
      }
    } catch (error) {
      console.log(error)
      return <ErrorPage statusCode={404} title={"Essa informação não pode ser resgatada"} />;
    }

  }

  const isFieldFilled = (value: string) => value.length === 0


  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])

  return (
    <div className={styles.container}>
      <h2 className={FormsStyle.title}>
        {_id ? "Editar" : "Registrar"} Funcionário
      </h2>

      <main className={styles.main}>

        <div className={FormsStyle.item}>
          <TextInput
            id="name"
            value={employeeName}
            label="Nome"
            onChange={setName}
            error={isFieldFilled(employeeName)} />
        </div>

        <div className={FormsStyle.item}>
          <TextInput
            id="restaurantId"
            value={employeeRestaurantId}
            label="Restaurante"
            onChange={setRestaurantId}
            error={isFieldFilled(employeeRestaurantId)}
            select
            disabled={restaurantId != null }
          >
            {restaurantOptions.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {`${option.name}:${option.city}`}
            </MenuItem>
          ))}
            </TextInput>
        </div>

        <div className={FormsStyle.item}>
          <TextInput
            id="workHours"
            value={employeeWorkHours}
            label="Horas de Trabalho"
            onChange={setWorkHours}
            error={isFieldFilled(employeeWorkHours) || +employeeWorkHours > 8}
            helperText={+employeeWorkHours > 8 ? "Um funcionário não pode trabalhar mais de 8 horas no dia" : undefined}
            type="number"
          />
        </div>

        <div className={FormsStyle.item}>
          <TextInput
            id="Score"
            value={employeeScore}
            label="Score"
            onChange={setScore}
            error={isFieldFilled(employeeScore)}
            type="number"
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isFieldFilled(employeeName) || isFieldFilled(employeeScore) || isFieldFilled(employeeRestaurantId) || isFieldFilled(employeeWorkHours) || +employeeWorkHours > 8}>
          {_id ? "Editar" : "Registrar"}
        </Button>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { employeeId, restaurantId } = context.query

  const getRestaurantOptions = async () => {
    const restaurantsResponse = await axios.get<IRestaurant>(`${env.app.url}/api/restaurants`)

    return restaurantsResponse.data
  }

  try {
    const res = await axios.get<IEmployee>(`${env.app.url}/api/employees/${employeeId}`)

    const employee = res.data

    return {
      props: {
        ...employee,
        restaurantOptions: await getRestaurantOptions(),
        restaurantId: restaurantId || null
      },
    }
  } catch (error) {
    return {
      props: {
        restaurantOptions: await getRestaurantOptions(),
        restaurantId: restaurantId || null
      },
    }
  }

}

export default RegisterEmployee
