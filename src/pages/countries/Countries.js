import React, {useEffect, useState} from 'react';
import {apoloClient} from "../../utils/apolo-client/apoloclient";
import {AutoSizer, List, ScrollSync} from 'react-virtualized';
import {gql} from 'apollo-boost'
import {Container} from "../../components/Layouts/Container";
import styled from 'styled-components';
import {ListItem} from "../../components/ListItem/ListItem";
import {Cell} from "../../components/Cell/Cell";
import {Flex} from "../../components/Flex/Flex";
import {ListHeader} from "../../components/ListHeader/ListHeader";
import {Chip} from "../../components/Chip/Chip";
import history from "../../utils/history";

const _Countries = (props) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    function fetchCountries() {
        if (countries && countries.length) return;
        setLoading(true);
        apoloClient
            .query({
                query: gql`
                    {
                      countries{
                        code,
                        name,
                        emoji,
                        languages{
                          name,
                          native
                        },
                        continent{
                          name,
                          code,
                        }
                      }
                    }
                `
            })
            .then(({data: {countries}}) => setCountries(countries))
            .catch(console.log)
            .finally(() => setLoading(false));
    }

    function onClickCountry(e) {
        history.push(`/countries/${e.currentTarget.id}`)
    }

    function renderRow({index, key, style}) {
        const {name, emoji, languages, continent, code} = countries[index];
        return (
            <ListItem key={key} style={style} id={code} onClick={onClickCountry} className="list-group-item">
                <Flex>
                    <Cell>{name} {emoji}</Cell>
                    <Cell center>
                        {!!(languages && languages.length) && languages.map((i, index) => i.name ?
                            <Chip key={index}>{i.name} / {i.native}</Chip> : null)}
                        {!(languages && languages.length) && 'N/A'}
                    </Cell>
                    <Cell>{continent.name} ({continent.code})</Cell>

                </Flex>
            </ListItem>
        )
    }

    useEffect(fetchCountries, []);

    return (
        <React.Fragment>
            <ScrollSync>
                {({onScroll, scrollTop, scrollLeft}) => (
                    <Container className="list-group-flush">
                        <ListHeader className="list-group-item">
                            <Flex>
                                <Cell><label>Name</label></Cell>
                                <Cell>Spoken Languages (English / Native)</Cell>
                                <Cell>Continent</Cell>
                            </Flex>
                        </ListHeader>
                        {loading && <p>Loading....</p>}
                        <AutoSizer>
                            {
                                ({width, height}) => {
                                    return (
                                        <ListContainer>
                                            <ListWrapper>
                                                <List
                                                    width={width - 20}
                                                    height={height - 60}
                                                    rowHeight={32}
                                                    onScroll={onScroll}
                                                    scrollTop={scrollTop}
                                                    scrollLeft={scrollLeft}
                                                    rowRenderer={renderRow}
                                                    rowCount={(countries && countries.length) ? countries.length : 0}
                                                    overscanRowCount={20}/>
                                            </ListWrapper>
                                        </ListContainer>
                                    );
                                }
                            }
                        </AutoSizer>
                    </Container>
                )}
            </ScrollSync>
        </React.Fragment>
    )
};

const ListContainer = styled.div`
    position: relative;
`;

const ListWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;


export const Countries = React.memo(_Countries);