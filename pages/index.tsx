import styles from '../styles/Home.module.css'
import ContactForm from 'components/ContactForm'

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <ContactForm />
    </div>
  )
}
