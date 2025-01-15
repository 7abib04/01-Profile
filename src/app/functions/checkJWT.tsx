const checkJWT = (router: any) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
        router.push("/");
    }
  };
  export default checkJWT; 