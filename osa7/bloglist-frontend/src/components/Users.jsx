import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data)
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} state={user}>
                  {user.name}
                </Link>
              </td>

              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
