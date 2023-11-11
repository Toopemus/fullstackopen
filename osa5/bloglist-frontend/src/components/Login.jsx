import PropTypes from "prop-types"

const Login = ({ handleLogin, username, password, usernameHandler, passwordHandler }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>username </label>
          <input
            value={username}
            onChange={usernameHandler}
            type="text"
            id="username"
          />
        </div>
        <div>
          <label>password </label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            id="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired  
}

export default Login
