const addTokenToHeaders = () => {
  const headers = new Headers();
  headers.set('token', sessionStorage.getItem('token'));

  return headers
}


export default addTokenToHeaders;