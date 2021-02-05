import React, { useState, useRef } from 'react';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import background from '../../images/retro.jpg';
import buttonBackground from '../../images/button.jpg';

import { useStyles } from './styles.js';

export default function SignUp({ open, handleClose }) {
    const classes = useStyles();
    const ref1 = useRef();

    const [selectedPic, setSelectedPic] = useState('https://res.cloudinary.com/kuinoso/image/upload/v1612556663/avatar_k6pn5r.png');

    const handleNewImage = (e) => {
        setSelectedPic(URL.createObjectURL(e.target.files[0]));

        // setImage(e.target.files[0]);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.container}>
                <div>
                    <div className={classes.headerContainer}>
                        <h2 className={classes.header}>Join Arkaven</h2>
                        <p className={classes.subHeader}>
                            Already a member?
                            <span className={classes.subLink}> Log In</span>
                        </p>
                    </div>
                    <div className={classes.imageContainer}>
                        <img src={selectedPic} alt='upload' className={classes.image} />
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
                        <TextField label="Name" className={classes.textField} />
                        <TextField label="Email" className={classes.textField} />
                        <TextField label="Password" type='Password' className={classes.textField} />
                        <TextField label="Confirm password" type='Password' className={classes.textField} />
                    </div>
                </div>
                <div className={classes.rightDiv}>  
                    <img src={background} alt='background' className={classes.background} />
                    <div className={classes.button}>
                        <img src={buttonBackground} alt='button' className={classes.buttonImage}/>
                        <h1>JOIN</h1>
                    </div>
                </div>
            </div>
        </Modal>
    );
};