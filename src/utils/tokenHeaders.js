const tokenHeader = new Headers();
tokenHeader.set('token', sessionStorage.getItem('token'));

export default tokenHeader;