import React from 'react';
import styled from 'styled-components';

export const Cell = styled.div`
    min-width: 20%;
    text-align: ${props => props.center ? 'center' : 'inherit'}
`;