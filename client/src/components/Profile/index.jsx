import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles.js';
import UpdateInfo from '../UpdateInfo';
import UpdatePassword from '../UpdatePassword';

export default function Profile() {
    const classes = useStyles();
    const history = useHistory();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const userData = useSelector(
        (store) => store.UserReducer.userData
    );

    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState('');

    useEffect(() => {
        if (!loggedIn) {
            history.push('/');
        };
    }, [loggedIn]);

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
                id={userData._id}
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
                    <img src={userData.img} alt='upload' className={classes.image} />
                    <h1 className={classes.name}>{userData.name}</h1>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            className={classes.modal}
                            onClick={() => handleModal('info')}
                        >
                            Update my info
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.modal}
                            onClick={() => handleModal('password')}
                        >
                            Change password
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