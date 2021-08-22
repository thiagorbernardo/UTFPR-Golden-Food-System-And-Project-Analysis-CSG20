import styles from '../../styles/Forms.module.css'


export const StandardCard = (title: string, route: string) => {
  return (
    <a
      className={styles.card}
      href={route}
    >
      <h2>{title}</h2>
    </a>
  )
}
