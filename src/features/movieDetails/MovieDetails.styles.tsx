import styled from "styled-components";

export const StyledSection = styled.section`
  margin-bottom: 20px;

  .movie-details__content {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
`;

export const StyledImage = styled.img`
  width: 150px;
  height: 200px;
  margin-right: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledRatingList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export const StyledRatingItem = styled.li`
  margin: 5px 0;
  display: inline-flex;
  border: 1px solid blue;
  border-radius: 15px;
  margin-right: 10px;
  padding: 8px;
  color: blue;
  font-size: 14px;
  background-color: #f0f8ff;
`;
