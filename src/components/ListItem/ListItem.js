import React from 'react';
import styled from 'styled-components';

export const ListItem = styled.div`
    display: flex;
    border-radius: 1px;
    justify-content: flex-start;
    align-items: center;
    opacity: 0.6;
    width: auto;
    height: auto;
    transition: background 2ms ease-in-out;
    &:hover {
        cursor: pointer;
        background: #EAEAEA;
    }
`;