
import { getCsrfToken } from "next-auth/react"

export async function getServerSideProps({ req }) {
  const token = await getCsrfToken({ req })
    return {
      props: {
        token
      }, // will be passed to the page component as props
    }
  }

const Orders = ({token }) => {
  console.log("LOBOS", JSON.stringify(token, null, 2))
  return(
    <div></div>
  )
}

export default Orders;