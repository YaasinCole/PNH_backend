import React, { useEffect, useState } from 'react'


interface Article {
    id: number; // Add this line
    title: string;
    body: string;
    date: string;
}

function Form(props: any) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        // When props.article changes, update the title and body states
        if (props.article && props.article.length > 0) {
            setTitle(props.article[0].title || '');
            setBody(props.article[0].body || '');
        }
    }, [props.article]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    console.log('props.article: ', props.article);
    console.log('title: ', title);
    console.log('body: ', body);
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
                </div>
            ) : null}
        </div>
    );
}


export default Form 