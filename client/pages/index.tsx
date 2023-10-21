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

  const updateArticleData = (updatedArticle: any) => {
    // Update the articles state with the updatedArticle
    setArticles((prevArticles) => {
      return prevArticles.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      });
    });

    // Clear the editedArticle state in the Form component
    setEditedArticle([]);
  };

  const openForm = () => {
    setEditedArticle([{ title: '', body: '', id: 0, date: '' }])
  }

  const insertedArticle = (article: any) => {
    const new_article = [...articles, article]
    setArticles(new_article)
  }

  const deleteArticle = (article: any) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    })
    setArticles(new_articles);
  }
  return (
    <div className='Index'>
      <div className="row">
        <div className="col">
          <h1>YAY </h1>
        </div>
        <div className="col">
          <button
            className="btn btn-success"
            onClick={openForm}
          >Inseert Article</button>
        </div>
      </div>
      <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />
      {editedArticle.length > 0 ? (
        <Form article={editedArticle[0]} updateArticleData={updateArticleData} insertArticleData={insertedArticle} />
      ) : null}    </div>
  );
}


export default Index