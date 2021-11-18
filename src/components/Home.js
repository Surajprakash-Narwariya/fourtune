import React, { useState, useEffect } from 'react';

function Home() {
    const [heading, setHeading] = useState('');
    const [index, setIndex] = useState(0);

    const loop = (index) => {
        const message = 'Thank You for Thinking about  SERVING . . .';
        setIndex((index) => {
            return index + 1;
        });
        setHeading((heading) => {
            return heading + message.charAt(index);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            loop(index);
        }, 100);
    }, [heading]);

    return (
        <div>
            <h3 className='d-lg-flex   bgImage'>
                <span className='headingSpace txtSize'> {heading}</span>
            </h3>
            <div></div>
        </div>
    );
}

export default Home;
