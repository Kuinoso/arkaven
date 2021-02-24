import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers, getUserData } from '../../redux/userReducer/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles.js';

export default function UpdateInfo({ userData, changeModal, openModal, closeModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ref1 = useRef();

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadMessage, setLoadMessage] = useState('Please wait');
    const [name, setName] = useState(userData.name);
    const [selectedPic, setSelectedPic] = useState({
        pic: userData.img,
        loaded: false,
    });

    const handleNewImage = (e) => {
        setSelectedPic({
            pic: URL.createObjectURL(e.target.files[0]),
            loaded: true,
        });

        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const validateName = () => {
        return name.length > 0;
    };

    const resetState = () => {
        setLoading(false);

        setImage('');

        setSelectedPic({
            ...selectedPic,
            loaded: false,
        });

        setLoadMessage('Please wait');
    };

    const refreshUsers = () => {
        axios.get('/api/allUsers')
            .then(res => {
                dispatch(getAllUsers(res.data));
            })
            .catch(err => console.log(err));
    };

    const getData = (user) => {
        axios.get(`/api/user/${user}`)
            .then(res => {
                dispatch(getUserData(res.data));
            })
            .catch(err => console.log(err));
    };

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    const displayMessage = () => {
        setTimeout(function () { setLoadMessage('Setting up the arcade...') }, 5000);
        setTimeout(function () { setLoadMessage('Please wait') }, 10000);
        setTimeout(function () { setLoadMessage('Uploading picture...') }, 15000);
        setTimeout(function () { setLoadMessage('Please wait') }, 20000);
        setTimeout(function () { setLoadMessage('Finishing final details...') }, 25000);
    };

    const handleSubmit = (e) => {
        setLoading(true);

        displayMessage();

        if (selectedPic.loaded) {
            const data = new FormData();

            data.append('file', image);
            data.append('upload_preset', 'arkaven');
            data.append('cloud_name', 'kuinoso');

            axios.post('https://api.cloudinary.com/v1_1/kuinoso/image/upload', data)
                .then(res => {
                    const user = {
                        name: toTitleCase(name),
                        img: res.data.url,
                    };

                    axios.put(`/api/editUser/${userData._id}`, user)
                        .then((res) => {
                            resetState();

                            closeModal();

                            refreshUsers();

                            getData(res.data);

                            Swal.fire({
                                icon: 'success',
                                text: 'Info has been updated!',
                            });
                        })
                        .catch(err => {
                            setLoading(false);
                            setLoadMessage('Please wait');

                            closeModal();

                            Swal.fire({
                                icon: 'error',
                                text: err.response.data.errorMessage,
                            })
                                .then(() => openModal())
                                .catch(err => console.log(err));
                        });
                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            const user = {
                name: toTitleCase(name),
                img: selectedPic.pic,
            };

            axios.put(`/api/editUser/${userData._id}`, user)
                .then((res) => {
                    resetState();

                    closeModal();

                    refreshUsers();

                    getData(res.data);

                    Swal.fire({
                        icon: 'success',
                        text: 'Info has been updated!',
                    });
                })
                .catch(err => {
                    console.log(err);

                    setLoading(false);
                    setLoadMessage('Please wait');

                    closeModal();

                    Swal.fire({
                        icon: 'error',
                        text: err.response.data.errorMessage,
                    })
                        .then(() => openModal())
                        .catch(err => console.log(err));
                });
        };
    };

    return (
        <div 
        className={classes.container}
        onKeyDown={(e) => {
            if (e.keyCode === 13 && validateName()) {
                handleSubmit();
            };
        }}
        >
            <div className={classes.headerContainer}>
                <h2 className={classes.header}>Update my info</h2>
                <p className={classes.subLink} onClick={() => changeModal('password')}> Change Password</p>
            </div>
            <div className={classes.imageContainer}>
                <img src={selectedPic.pic} alt='upload' className={classes.image} />
                <input
                    type="file"
                    onChange={handleNewImage}
                    id="img"
                    name="img"
                    accept="image/*"
                    className={classes.fileInput}
                    ref={ref1}
                />
                <AddCircleOutlineIcon
                    onClick={() => { ref1.current.click() }}
                    className={classes.fileButton}
                />
            </div>
            <div className={classes.fieldsContainer}>
                <div className={classes.textDiv}>
                    <TextField
                        label="Name"
                        name='name'
                        value={name}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                </div>
                {loading ?
                    <div className={classes.load}>
                        <CircularProgress className={classes.loading} />
                        <p className={classes.message}>{loadMessage}</p>
                    </div>
                    :
                    <Button
                        variant="contained"
                        disabled={!validateName()}
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Update info
                    </Button>
                }
            </div>
        </div>
    );
};