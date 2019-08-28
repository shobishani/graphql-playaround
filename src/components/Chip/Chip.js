import React from 'react';
import styled from 'styled-components';

export const Chip = styled.div`
    display: inline-block;
    background: #cacaca;
    border-radius: 4%;
    padding: 3px 10px;
    min-width: 50px;
    margin: 0 1px;
    &:hover { 
        cursor: pointer;
        background: #a8a8a8;
    }
`;