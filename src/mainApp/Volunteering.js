import React, { useState, useEffect } from 'react';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    addDoc,
} from 'firebase/firestore';
import { db, useAuth } from '../funct/firebaseConfig';

function Volunteering(props) {
    const [change, setChange] = useState(false);
    const [volunteer, setVolunteer] = useState([]);
    const user = useAuth();
    const [accepted, setAccepted] = useState(false);

    const arr = [];
    const getData = async () => {
        const q = query(
            collection(db, 'userdata'),
            where('accepted', '==', false)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setVolunteer(arr);
    };

    useEffect(() => {
        getData();
    }, [change]);
    // here change hook is used to reload page everytime order is accepted

    const acceptOrder = async (item) => {
        console.log('order will get accepted  ' + item.id);

        await updateDoc(doc(db, 'userdata', item.id), {
            accepted: true,
            acceptedBy: user.email,
        });

        try {
            await addDoc(
                collection(db, `userOrder/${user.email}/acceptedOrder`),
                {
                    id: item.id,
                    contactNo: item.contactNo,
                    typeOfFood: item.typeOfFood,
                    foodQuantity: item.foodQuantity,
                    lastTime: item.lastTime,
                    location: item.location,
                }
            );
            setChange(!change);
            setAccepted(true);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className='llist '>
            {/* Volunteering Opportunity will be visible here */}
            <div>
                <div className='d-lg-flex justify-content-center headingSpace'>
                    <h1>Available Orders</h1>
                </div>
                <div className='d-lg-flex justify-content-center'>
                    {accepted ? (
                        <h5 className='alert alert-success' role='alert'>
                            Order Accepted
                        </h5>
                    ) : (
                        <div />
                    )}
                </div>
                {volunteer.map((item) => {
                    return (
                        <div
                            key={item.id + 'top'}
                            className='d-lg-flex justify-content-center '
                        >
                            <div
                                key={item.id + 'div'}
                                className='card myCard mar'
                            >
                                <div
                                    key={item.id + 'tag'}
                                    className='card-body '
                                >
                                    <h5
                                        key={item.id + 'card'}
                                        style={{ textAlign: 'center' }}
                                        className='card-title'
                                    >
                                        {item.location}
                                    </h5>
                                    <div
                                        id={item.id + 'id'}
                                        className='myCardItems'
                                    >
                                        <li key={item.id + 'contact'}>
                                            Contact No : {item.contactNo}
                                        </li>
                                        <li key={item.id + 'food'}>
                                            Type of Food : {item.typeOfFood}
                                        </li>
                                        <li key={item.id + 'foodquantity'}>
                                            Food Quantity :{item.foodQuantity}
                                        </li>
                                        <li key={item.id + 'lastTime'}>
                                            Available till : {item.lastTime}
                                        </li>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <button
                                            key={item.id + 'key'}
                                            onClick={() => acceptOrder(item)}
                                            className='btn btn-primary myCardItems'
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Volunteering;
