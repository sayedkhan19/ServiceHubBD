export const myServicePromise = (email, accessToken) =>{
    return fetch(`https://service-provider-code-server.vercel.app/service?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res=>res.json());
}