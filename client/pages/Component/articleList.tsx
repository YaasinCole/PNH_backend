import React from 'react'
import APIService from '@/services/APIService';
import Link from 'next/link'

function articleList(props: { articles: any[]; editArticle: (article: any) => void; deleteArticle: (article: any) => void }) {

    const editArticle = (article: any) => {
        props.editArticle(article);

    }
    const deleteArticle = (article: any) => {
        APIService.deleteArticle(article.id)
            .then(() => props.deleteArticle(article))
    }
    return (
        <div>
            {props.articles && props.articles.map((article) => {
                return (
                    <div key={article.id}>
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                        <p>{article.date}</p>

                        <div className="row">
                            <div className="col-md-1">
                                <button className="btn btn-primary"
                                    onClick={() => editArticle(article)}> Update</button>
                            </div>
                            <div className="col">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteArticle(article)}>Delete</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default articleList;