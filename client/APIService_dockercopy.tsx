// const apiUrl = process.env.REACT_APP_API_URL;

// const APIService = {

//     updateArticle: (id: any, body: any) => {
//         return fetch(`${apiUrl}/update/${id}/`, {
//             method: 'PUT',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         })
//             .then((response) => response.json());
//     },

//     insertArticle: (body: any) => {
//         return fetch(`${apiUrl}/add`, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         })
//             .then((response) => response.json());
//     },

//     deleteArticle: (id: any) => {
//         return fetch(`${apiUrl}/delete/${id}/`, {
//             method: 'DELETE',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//         })
//     },

// };

// export default APIService;