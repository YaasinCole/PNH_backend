const APIService = {

    updateArticle: (id: any, body: any) => {
        return fetch(`http://127.0.0.1:8080/update/${id}/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json());
    },

    insertArticle: (body: any) => {
        return fetch(`http://127.0.0.1:8080/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json());
    },

    deleteArticle: (id: any) => {
        return fetch(`http://127.0.0.1:8080/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
    },

};

export default APIService;