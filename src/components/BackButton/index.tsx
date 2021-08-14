import { useCallback } from "react";
import { useRouter } from 'next/router'

import styles from './styles.module.css'
import { FaArrowLeft } from 'react-icons/fa';

export const BackButton: React.FC = () => {
  const router = useRouter()

  const handleClickGoTo = useCallback((route: string) => {
    router.push(route)
  }, [router])


  return (
    <FaArrowLeft className={styles.a} size="26" onClick={() => {
      const paths = router.route.split("/")

      const popPaths = paths.slice(0, paths.length - 1)

      if(popPaths.length === 1) return handleClickGoTo("/")
      handleClickGoTo(popPaths.join("/"))
    }} />

  )
}
