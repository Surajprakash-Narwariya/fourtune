import React, { useState, useEffect } from 'react';
import { query, getDocs, collection } from 'firebase/firestore';
import { db, useAuth } from '../funct/firebaseConfig';
// import { query, collection, getDocs, where } from 'firebase/firestore';
// import { useAuth } from '../funct/firebaseConfig';

function DashBoard(props) {
    const user = useAuth();
    const [acceptedOrder, setAcceptedOrder] = useState([]);
    const [postedOrder, setPostedOrder] = useState([]);

    const [showAcceptedOrder, setShowAcceptedOrder] = useState(true);
    // console.log(props);

    let tempPostedOrder = [];
    let tempArr = [];
    useEffect(() => {
        if (user) {
            getAcceptedOrder();
            getPostedOrder();
        }
    }, [user]);

    const getAcceptedOrder = async () => {
        try {
            const q = query(
                collection(db, `userOrder/${user.email}/acceptedOrder`)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                tempArr.push(doc.data());
            });
            setAcceptedOrder(tempArr);
            // console.log(acceptedOrder);
        } catch (e) {
            console.log(e);
        }
    };

    const getPostedOrder = async () => {
        try {
            const que = query(
                collection(db, `userOrder/${user.email}/orderPosted`)
            );

            const querySnap = await getDocs(que);
            querySnap.forEach((d) => {
                tempPostedOrder.push(d.data());
            });
            setPostedOrder(tempPostedOrder);
        } catch (e) {
            console.log(e);
        }
    };

    if (!user) {
        return (
            <div className='d-lg-flex justify-content-center '>
                <div
                    className='spinner-grow text-dark vertical-center'
                    role='status'
                >
                    <span className='visually-hidden'>Loading...</span>{' '}
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className='llist '>
                <div className='dashButton'>
                    <button
                        className='btn btn-secondary'
                        style={{ float: 'right' }}
                        onClick={() => setShowAcceptedOrder(true)}
                    >
                        Order Accepted
                    </button>

                    <button
                        className='btn btn-secondary'
                        onClick={() => setShowAcceptedOrder(false)}
                    >
                        Order Posted
                    </button>
                </div>

                <div>
                    <div className='d-lg-flex justify-content-center headingSpace'>
                        <h1> DashBoard</h1>
                    </div>
                    <div className='d-lg-flex  justify-content-center'>
                        {showAcceptedOrder ? (
                            <h5> Order Accepted</h5>
                        ) : (
                            <h5>Order Posted</h5>
                        )}
                    </div>

                    {showAcceptedOrder
                        ? acceptedOrder.map((item) => {
                              return (
                                  <div key={item.id + 'div139'}>
                                      <div
                                          key={item.id + 'block'}
                                          className='d-lg-flex justify-content-center'
                                      >
                                          <div
                                              key={item.id + 'card'}
                                              className='card myCard'
                                          >
                                              <div
                                                  key={item.id + 'cardbody'}
                                                  className='card-body'
                                              >
                                                  <h5
                                                      key={item.id + 'card'}
                                                      style={{
                                                          textAlign: 'center',
                                                      }}
                                                      className='card-title'
                                                  >
                                                      {item.location}
                                                  </h5>
                                                  <div
                                                      key={item.id + 'div'}
                                                      className='myCardItems'
                                                  >
                                                      <li
                                                          key={
                                                              item.id +
                                                              'contact'
                                                          }
                                                      >
                                                          Contact No :{' '}
                                                          {item.contactNo},{' '}
                                                      </li>
                                                      <li
                                                          key={item.id + 'food'}
                                                      >
                                                          Type of Food :{' '}
                                                          {item.typeOfFood}
                                                      </li>
                                                      <li
                                                          key={
                                                              item.id + 'qfood'
                                                          }
                                                      >
                                                          Quantity of Food :
                                                          {item.foodQuantity}
                                                      </li>
                                                      <li
                                                          key={item.id + 'time'}
                                                      >
                                                          Available till :{' '}
                                                          {item.lastTime}
                                                      </li>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : postedOrder.map((item) => {
                              return (
                                  <div key={item.id + 'key234'}>
                                      <div
                                          key={item.id + 'block2'}
                                          className='d-lg-flex justify-content-center'
                                      >
                                          <div
                                              key={item.id + 'card2'}
                                              className='card myCard mar'
                                          >
                                              {/* <h5 className='card-header'> Card Title</h5> */}
                                              <div
                                                  key={item.id + 'cardbody2'}
                                                  className='card-body'
                                              >
                                                  <div
                                                      key={item.id + 'div'}
                                                      className='myCardItems'
                                                  >
                                                      <li
                                                          key={
                                                              item.id +
                                                              'contact2'
                                                          }
                                                      >
                                                          Contact No :{' '}
                                                          {item.contactNo}
                                                      </li>
                                                      <li
                                                          key={
                                                              item.id +
                                                              'foodtype'
                                                          }
                                                      >
                                                          Type of Food :{' '}
                                                          {item.typeOfFood}
                                                      </li>
                                                      <li
                                                          key={
                                                              item.id +
                                                              'quality2'
                                                          }
                                                      >
                                                          Quantity of Food :
                                                          {item.foodQuantity}
                                                      </li>
                                                      <li
                                                          key={item.id + 'time'}
                                                      >
                                                          Available till :{' '}
                                                          {item.lastTime}
                                                      </li>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}

                    {}
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
