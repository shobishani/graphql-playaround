import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router";
import history from "../../utils/history";
import {apoloClient} from "../../utils/apolo-client/apoloclient";
import {gql} from "apollo-boost";
import {Container} from "../../components/Layouts/Container";
import {Cell} from "../../components/Cell/Cell";

const _ViewCountry = (props) => {
    const {match: {params: {code}}} = props;
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(null);
    if (!code) {
        history.push('/');
    }

    function fetchCountry() {
        setCountry(null);
        setLoading(true);
        apoloClient
            .query({
                query: gql`
                    {
                      country(code: "${code}") {
                        name,
                        currency,
                        phone,
                        emoji
                      }
                    }
                `
            })
            .then(({data: {country}}) => setCountry(country))
            .catch(console.log)
            .finally(() => setLoading(false));
    }

    useEffect(fetchCountry, []);
    useEffect(() => {
        console.log('country', country)
    }, [country]);
    return (
        <Container>
            <Wrapper>
                {
                    country &&
                    <Card>
                        <CustomCell>Country: <P>{country.name}</P></CustomCell>
                        <CustomCell>Flag: <P>{country.emoji}</P></CustomCell>
                        <CustomCell>Currency: <P>{country.currency}</P></CustomCell>
                        <CustomCell>Area Code: <P>{country.phone}</P></CustomCell>
                    </Card>
                }
                {
                    (loading && !country) &&
                    <P>Loading.......</P>
                }
            </Wrapper>
        </Container>
    )
};

const CustomCell = styled(Cell)`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const Card = styled.div`
  min-width: 350px;
  border-radius: 5px;
  box-shadow: 0px 0px 45px 0px rgba(0,0,0,0.5);
  overflow: hidden;
  transition: .4s;
  text-transform: uppercase;
  text-align: left;
  padding: 20px;
  
  &:hover{
    cursor: grab;
    transform: scale(1.3);
  }
`;

const Wrapper = styled.div`
   position: absolute;
   width: 100%;
   display: flex;
   justify-content: center;
   margin: 10px;
   top: 20%;
   margin-left: auto;
`;

const P = styled.span`
    margin-left: 10px;
    font-weight: normal;
`;

export const ViewCountry = React.memo(withRouter(_ViewCountry));