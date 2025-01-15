const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = '/';
  };
  export default handleLogout;