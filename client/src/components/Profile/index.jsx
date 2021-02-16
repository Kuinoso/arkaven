import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles.js';
import UpdateInfo from '../UpdateInfo';
import UpdatePassword from '../UpdatePassword';

export default function Profile() {
    const classes = useStyles();

    const userData = useSelector(
        (store) => store.UserReducer.userData
    );

    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModal = (type) => {
        setModal(type);

        handleOpen();
    };

    const innerModal = (type) => {
        if (type === 'info') {
            return <UpdateInfo
                userData={userData}
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };

        if (type === 'password') {
            return <UpdatePassword
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };
    };

    return (
        <div>
            {userData &&
                <div className={classes.container}>
                    <div className={classes.leftDiv}>
                        <div className={classes.imageContainer}>
                            {/* <img src={userData.img} alt='upload' className={classes.image} /> */}
                        </div>
                        <h1>{userData.name}</h1>
                    </div>
                    <div className={classes.rigthDiv}>
                        <Button
                            variant="contained"
                            className={classes.login}
                            onClick={() => handleModal('info')}
                        >
                            Update my info
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.login}
                            onClick={() => handleModal('password')}
                        >
                            Reset password
                        </Button>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {innerModal(modal)}
                    </Modal>
                </div>

            }
        </div>
    );
};