import styled from "styled-components";

export const StyledMovieItem = styled.li`
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  > span {
    flex: 1;
    text-align: left;

    &:nth-child(2) {
      flex: 3;
    }

    &:last-child {
      text-align: right;
    }
  }
`;
