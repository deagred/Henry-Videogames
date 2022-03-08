import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SmallText2, Tag } from './styles/TextStyles.jsx';

export default function Card(props) {
  const { game } = props;

  return (
    <Wrapper to={`/videogame/${game?.uuid || game.id}`}>
      <Info>
        <SmallText2>{game.title}</SmallText2>
        <img src={game.thumbnail} alt={`${game.title}`} />
      </Info>
      <TagContainer>
        {game.Genres && game.Genres.map(genre => (
          <Tag primary key={genre.id}>{genre.name}</Tag>
        ))}
      </TagContainer>
      {game.ESRB && <Tag>ESRB: {game.ESRB}</Tag>}
    </Wrapper>
  );

}

const Wrapper = styled(Link)`
  img{
    max-width: 200px;
    object-fit: fill;
    border-radius: 2px;
    align-self: center;
    justify-self: center;
  }
  display: grid;
  gap: 8px;
  grid-template-rows: repeat(3, auto);

  max-width: 200px;
  color: #fff;
`;

const Info = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  text-align: center;
  gap: 8px;
`;

const TagContainer = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(auto, auto);
`;