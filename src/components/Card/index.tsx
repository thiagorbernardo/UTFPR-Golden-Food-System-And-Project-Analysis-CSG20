import { useCallback } from "react";
import { useRouter } from 'next/router'

import styles from '../../styles/BaseScreens.module.css'
import { IRestaurant } from "../../models"

type Props = {}

export const Card: React.FC<IRestaurant> = ({ _id, name, city }) => {
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
