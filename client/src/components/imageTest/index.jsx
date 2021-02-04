import React, { useState } from 'react';
import axios from 'axios';

export default function ImageTest() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        img: '',
    });
    const [imageUploaded, setImageUploaded] = useState({
        loaded: false,
        image: '',
    });
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [pics, setPics] = useState([]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleNewImage = (e) => {
        setImageUploaded({
            image: URL.createObjectURL(e.target.files[0]),
            loaded: true,
        });

        setImage(e.target.files[0]);

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setImageUploaded({
            ...imageUploaded,
            loaded: false,
        });

        setUploading(true);

        const data = new FormData();

        data.append('file', image);
        data.append('upload_preset', 'arkaven');
        data.append('cloud_name', 'kuinoso');

        axios.post('https://api.cloudinary.com/v1_1/kuinoso/image/upload', data)
            .then(res => {
                const user = {
                    ...form,
                    img: res.data.secure_url,
                };

                axios.post('/api/newUser', user)
                    .then(res => {
                        setUploading(false);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log(err)
            });
    };

    const handleClick = (e) => {
        e.preventDefault();

        axios.get('/api/allUsers')
            .then(res => {
                setPics(res.data);
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <div>
            {uploading ?
                <img src='https://image.freepik.com/free-vector/loading-icon_167801-436.jpg' alt='loading' />
                :
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
                            onChange={handleNewImage}
                            id="img"
                            name="img"
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            }
            {imageUploaded.loaded &&
                <img src={imageUploaded.image} alt='profile pic' style={{ width: 100 }} />
            }
            <button onClick={handleClick}>test</button>
            <br></br>
            {pics.map((item, i) =>
                <div key={i}>
                    <h4>{item.name}</h4>
                    <img src={item.img} alt={item.name} style={{ width: 200 }}/>
                </div>
            )}
        </div>
    );
};