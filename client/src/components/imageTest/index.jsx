import React, { useState } from 'react';
import axios from 'axios';

export default function ImageTest() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        file: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const json = JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
        });
        let dataP = new FormData();
        let images = form.file;

        dataP.append('images', images);
        dataP.append('json', json);
        axios({
            url: '/api/newUser',
            method: 'POST',
            data: dataP,
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data;`,
            },
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        const json = {
            name: form.name,
        };

        axios.post('/api/newGame', json);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={form.name}
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label for="email">Email</label>
                    <textarea
                        id="email"
                        name="email"
                        value={form.email}
                        rows="2"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label for="password">Password</label>
                    <textarea
                        id="password"
                        name="password"
                        value={form.password}
                        rows="2"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label for="image">Upload Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        id="img"
                        name="img"
                        accept="image/*"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <button onClick={handleClick}>test</button>
        </div>
    );
};