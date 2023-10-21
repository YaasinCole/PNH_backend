import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ArticleList from './Component/articleList'
import Form from './Component/form'


interface Article {
  id: number; // Add this line
  title: string;
  body: string;
  date: string;
}

function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editedArticle, setEditedArticle] = useState<Article[]>([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8080/get", {
      'method': 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => setArticles(response))
      .catch(error => console.log(error))
  }, []);

  const editArticle = (article: Article) => {
    setEditedArticle([article])

  }

  return (
    <div className='Index'>
      <h1>YAY </h1>
      <ArticleList articles={articles} editArticle={editArticle} />
      {editedArticle.length > 0 ? <Form article={editedArticle[0]} /> : null}
    </div>
  );
}


export default Index