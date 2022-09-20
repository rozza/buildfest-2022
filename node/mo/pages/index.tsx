import { MoLink } from "../utils/types"
import Link from "next/link"


// Define the components props
interface IndexProps {
  links: Array<MoLink>
}

// define the page component
function Index(props: IndexProps) {
  const { links } = props

  return (
    <div className="containter">
      <div className="control">
        <Link href="./links/create/"><button className="button is-primary">Create new</button></Link>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {links.map(link => (
              <tr key={link._id}>
                <td>{link.alias}</td>
                <td>{link.link}</td>
                <td><Link href={`./links/${link._id}`}><button className="button is-link is-primary">Edit</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get molink data from API
  const res = await fetch(process.env.API_URL as string)
  const links = await res.json()

  // return props
  return {
    props: { links },
  }
}

export default Index
