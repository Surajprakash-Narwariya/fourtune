import React, { useRef, useState, useEffect } from 'react';
import { db, useAuth } from '../funct/firebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { fetchName } from '../funct/locationFetch';

function DonateFood(props) {
    const user = useAuth();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [status, setStatus] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [address, setAddress] = useState();

    const [disable, setDisable] = useState(false);

    const contactRef = useRef();
    const typeOfFoodRef = useRef();
    const foodQuantityRef = useRef();
    const lastTimeRef = useRef();

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Location is not supported');
        } else {
            setStatus('Locating...');

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setStatus(null);
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                },
                () => {
                    setStatus('Unable to retrieve location');
                }
            );
        }
    };

    useEffect(() => {
        if (address && !submitted) {
            push();
        }
    }, [address, submitted]);

    const addressFinderAndSubmit = async (longitude, latitude) => {
        console.log(longitude);
        console.log(latitude);
        const data = await fetchName(longitude, latitude);
        console.log(data);
        let name = '';
        data.features[0].context.map((item) => {
            name = name + ', ' + item.text;
        });
        const add = name.slice(2, name.length);
        console.log(add);
        setAddress(add);
    };

    const push = async () => {
        try {
            const docRef = await addDoc(collection(db, 'userdata'), {
                id: '',
                contactNo: contactRef.current.value,
                typeOfFood: typeOfFoodRef.current.value,
                foodQuantity: foodQuantityRef.current.value,
                lastTime: lastTimeRef.current.value,
                location: address,
                accepted: false,
                donaterEmail: user.email,
                acceptedByEmail: '',
            });

            await updateDoc(doc(db, 'userdata', docRef.id), {
                id: docRef.id,
            });
            setSubmitted(true);

            try {
                await addDoc(
                    collection(db, `userOrder/${user.email}/orderPosted`),
                    {
                        id: docRef.id,
                        contactNo: contactRef.current.value,
                        typeOfFood: typeOfFoodRef.current.value,
                        foodQuantity: foodQuantityRef.current.value,
                        lastTime: lastTimeRef.current.value,
                    }
                );
            } catch (e) {
                alert(e.message);
            }

            contactRef.current.value = '';
            typeOfFoodRef.current.value = '';
            foodQuantityRef.current.value = '';
            lastTimeRef.current.value = '';
            setLatitude(null);
            setLongitude(null);
            setStatus('');
            setAddress(null);

            console.log(docRef.id);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className='d-lg-flex justify-content-center loginForm'>
            <div>
                <div className='d-lg-flex justify-content-center headingSpace'>
                    <h2>Enter Details</h2>
                </div>
                <div className='mb-3'>
                    {submitted ? (
                        <h5 className='alert alert-success' role='alert'>
                            Submitted Successfully
                        </h5>
                    ) : (
                        <div />
                    )}
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Contact No.</label>
                    <input
                        ref={contactRef}
                        type='number'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                    <div id='emailHelp' className='form-text'>
                        We'll never share your Contact No. with anyone else.
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Type of food</label>
                    <input
                        ref={typeOfFoodRef}
                        type='text'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Food Quantity</label>
                    <input
                        ref={foodQuantityRef}
                        type='number'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                    <div id='emailHelp' className='form-text'>
                        How many people can eat.
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Last time to avail</label>
                    <input
                        ref={lastTimeRef}
                        type='time'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                </div>

                <div className='mb-3 form-check'>
                    <input
                        onClick={getLocation}
                        type='checkbox'
                        className='form-check-input'
                        id='exampleCheck1'
                    />
                    <label className='form-check-label'>
                        Enable location access
                    </label>
                    <div>
                        {status}
                        <div>
                            latitude is {latitude}, longitude is : {longitude}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => addressFinderAndSubmit(longitude, latitude)}
                    disabled={latitude ? disable : !disable}
                    className='btn btn-primary'
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default DonateFood;
