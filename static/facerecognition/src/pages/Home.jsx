import React from 'react';
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
                    <Link to="/register">
                        <button>REGISTER</button>
                    </Link>
                    <Link to="/attendance">
                        <button>MARK ATTENDANCE</button>
                    </Link>
        </div>
    );
};

export default Home;