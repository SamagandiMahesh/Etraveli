import styled from "styled-components"

export const StyledMovieLayout = styled.div`
  color: #000;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;

  .movie-layout {
    display: flex;
    width: 100%;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background: #f0f8ff;
    box-sizing: border-box;

    select {
      padding: 5px;
      border-radius: 3px;
      border: 1px solid blue;
    }
    input {
      width: 100%;
      margin-left: 10px;
      padding: 5px;
    }
  }

  .movie-details,
  .movie-list,
  .no-movie {
    min-height: 100vh;
  }

  .movie-list {
    width: 60%;
  }

  .no-movie,
  .movie-details {
    width: 40%;
    padding: 20px;
    border-left: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .no-movie {
    justify-content: center;
    align-items: center;
  }
`
