import React, { useState } from "react";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    Heading,
    Button,
    Grid,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Image,
    Text,
} from "@chakra-ui/react";
import axios from "axios";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchMovies = async () => {
        setIsLoading(true);
        const response = await axios.get(
            `https://www.omdbapi.com/?s=${query}&apikey=f388ee01`
        );
        setResults(response.data.Search);
        setIsLoading(false);
    };

    const selectMovie = async (imdbID) => {
        setIsLoading(true);
        const response = await axios.get(
            `https://www.omdbapi.com/?i=${imdbID}&apikey=f388ee01`
        );
        setSelectedMovie(response.data);
        setIsLoading(false);
    };

    return (
        <Box bgColor="black" p={4}><Heading m="3" align="center" color="lightcoral"> Movie Search App</Heading>
            <Flex mb={4}>
                <InputGroup>
                    <Input
                        type="text"
                        color="white"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchMovies()}
                    />
                </InputGroup>
                <Button ml={2} onClick={searchMovies} isLoading={isLoading}>
                    Search
                </Button>
            </Flex>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {results.map((movie) => (
                    <GridItem key={movie.imdbID}>
                        <Box
                            p={2}
                            borderWidth="1px"
                            borderRadius="md"
                            cursor="pointer"
                            onClick={() => selectMovie(movie.imdbID)}
                        >
                            <Image src={movie.Poster} alt={movie.Title} />
                            <Text mt={2} fontWeight="bold" color="white">
                                {movie.Title}
                            </Text>
                            <Text fontSize="sm" color="white">{movie.Year}</Text>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            <Modal isOpen={selectedMovie !== null} onClose={() => setSelectedMovie(null)} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedMovie?.Title}</ModalHeader>
                    <ModalBody>
                        <Image src={selectedMovie?.Poster} alt={selectedMovie?.Title} mb={4} />
                        <Text><strong>Plot: </strong>{selectedMovie?.Plot}</Text>
                        <Text mt={2}>
                            <strong>IMDb Rating:</strong> {selectedMovie?.imdbRating}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setSelectedMovie(null)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MovieSearch;
