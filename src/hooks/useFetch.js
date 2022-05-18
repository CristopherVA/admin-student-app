
const URL = "http://localhost:8000";

const studentFetch = (endpoint, data, method = 'GET') => {
    const url = `${URL}/${endpoint}`;

    if(method === 'GET'){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    studentFetch,
  
}