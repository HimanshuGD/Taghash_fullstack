import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/bar');
    };

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={handleClick}>Polls</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
