import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('artist'); 
  const [results, setResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const CLIENT_ID = "2f149abbac19439d8be9d563b256b562";
  const CLIENT_SECRET = "8bce132dfae24e8492f55805b5b57a70";

  useEffect(() => {
    const getAccessToken = async () => {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      };

      try {
        const result = await fetch("https://accounts.spotify.com/api/token", authParameters);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching the access token:', error);
      }
    };

    getAccessToken();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: searchInput,
          type: searchType 
        }
      });

      if (searchType === 'artist') {
        const artist = response.data.artists.items[0];
        if (!artist) {
          setResults([]);
          return;
        }

        const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            include_groups: 'album,single',
            market: 'US'
          }
        });

        setResults(albumsResponse.data.items);
      } else if (searchType === 'track') {
        setResults(response.data.tracks.items);
      }
    } catch (error) {
      console.error('Error fetching the search results:', error);
    }
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for an artist or song..."
          />
          <select className='select'
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="artist">Artist</option>
            <option value="track">Song</option>
          </select>
          <button className='button' type="submit">Search</button>
        </form>
      </div>
      <Container className="search-container">
        <Row>
          {results.map((result) => (
            <Col key={result.id} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <Card.Body>
                  <Card.Title>{result.name}</Card.Title>
                  {searchType === 'artist' ? (
                    <>
                      <Card.Text>Release Date: {result.release_date}</Card.Text>
                      <Card.Text>Total Tracks: {result.total_tracks}</Card.Text>
                      <iframe
                        src={`https://open.spotify.com/embed/album/${result.id}`}
                        width="100%"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        title={result.name}
                      ></iframe>
                    </>
                  ) : (
                    <iframe
                      src={`https://open.spotify.com/embed/track/${result.id}`}
                      width="100%"
                      height="380"
                      frameBorder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                      title={result.name}
                    ></iframe>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Search;
