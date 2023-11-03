const Notification = ({ successMessage, errorMessage }) => {
  return (
    <>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="notification">{successMessage}</div>}
    </>
  )
}

export default Notification
