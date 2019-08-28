import React from 'react';
import history from "../../utils/history";

const home = (props) => {
    return (
        <div>
            <a href="#" onClick={()=> history.push('/countries')}>Countries</a>
        </div>
    )
};

export const Home = React.memo(home);