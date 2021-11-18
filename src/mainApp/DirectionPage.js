import React from 'react';
import { Link } from 'react-router-dom';

function DirectionPage() {
    return (
        <div className='directionCards'>
            <div className='row'>
                <div className='col-sm-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Donate Food</h5>
                            <p className='card-text'>
                                If you have food more than you need, Please
                                Donate it to someone who don't have.
                            </p>
                            <div className='btn btn-primary'>
                                <Link to='/direction-page/donate-food'>
                                    Donate Food
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Being Volunteer</h5>
                            <p className='card-text'>
                                Take food from people and give it to who need it
                                the most.
                            </p>
                            <div className='btn btn-primary'>
                                <Link to='/direction-page/volunteering'>
                                    Come Forward
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Become a Philanthropist
                            </h5>
                            <p className='card-text'>
                                Provide money so everything can work seemless,
                                and so no one has to sleep hungry.
                            </p>
                            <div className='btn btn-primary'>
                                <Link to='/direction-page/donate-money'>
                                    Donate Money
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DirectionPage;
