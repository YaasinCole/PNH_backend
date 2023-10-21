import React, { useEffect, useState } from 'react'
import APIService from '../../services/APIService';

interface Article {
    id: number; // Add this line
    title: string;
    body: string;
    date: string;
}
interface FormProps {
    article: Article;
    updateArticleData: (updatedArticle: Article) => void;
    insertArticleData: (insertArticle: Article) => void;
}

function Form(props: FormProps) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (props.article && props.article.title && props.article.body) {
            setTitle(props.article.title);
            setBody(props.article.body);
        }
    }, [props.article]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const updateArticle = async () => {
        try {
            const response = await APIService.updateArticle(props.article.id, { title, body });

            // Update the article data in the parent component (Index) via the callback
            props.updateArticleData(response);

            // Handle a successful update here
        } catch (error) {
            console.error(error);
            // Handle errors here (e.g., show an error message to the user)
        }
    };

    const insertArticle = () => {
        APIService.insertArticle({ title, body })
            .then(response => {
                props.updateArticleData(response); // Update the parent component's state with the new article
                props.insertArticleData(response); // Optionally, you can log the response
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-title">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <label htmlFor="body" className="form-title">
                        Description:
                    </label>
                    <textarea
                        rows={5}
                        id="body"
                        className="form-control"
                        placeholder=" Please Enter description"
                        value={body}
                        onChange={handleBodyChange}
                    />
                    {props.article.id !== 0 ? <button
                        className="btn btn-success mt-3"
                        onClick={updateArticle}>Update</button> :

                        <button
                            className="btn btn-success mt-3"
                            onClick={insertArticle}>Insert</button>
                    }

                </div>
            ) : null}
        </div>
    );
}


export default Form 