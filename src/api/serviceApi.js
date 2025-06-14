export const myServicePromise = email =>{
    return fetch(`http://localhost:3000/service?email=${email}`).then(res=>res.json());
}