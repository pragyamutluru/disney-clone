import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../app/features/movie/movieSlice";
import { selectUserName } from "../app/features/user/userSlice";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const [recommends, setRecommends] = useState([]);
  const [newDisneys, setNewDisneys] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const moviesCollection = collection(db, "movies");

    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
      let tempRecommends = [];
      let tempNewDisneys = [];
      let tempOriginals = [];
      let tempTrending = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const movie = { id: doc.id, ...data };

        switch (data.type) {
          case "recommend":
            tempRecommends.push(movie);
            break;
          case "new":
            tempNewDisneys.push(movie);
            break;
          case "original":
            tempOriginals.push(movie);
            break;
          case "trending":
            tempTrending.push(movie);
            break;
          default:
            break;
        }
      });

      setRecommends(tempRecommends);
      setNewDisneys(tempNewDisneys);
      setOriginals(tempOriginals);
      setTrending(tempTrending);

      dispatch(
        setMovies({
          recommend: tempRecommends,
          newDisney: tempNewDisneys,
          original: tempOriginals,
          trending: tempTrending,
        })
      );
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [dispatch]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
