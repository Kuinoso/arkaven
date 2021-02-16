import React, { useState, useRef } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles.js';

export default function UpdateInfo({ userData, changeModal }) {
    const classes = useStyles();
    const ref1 = useRef();

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = (e) => {

    };

    return (
        <div className={classes.container}>
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
                    <CircularProgress className={classes.loading} />
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