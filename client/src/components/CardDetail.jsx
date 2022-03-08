import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import NotFound from './NotFound';
import { Caption, H2, SmallText, Tag } from './styles/TextStyles';

export default function CardDetail() {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const identifier = useParams();
  const state = useSelector(state => state);

  const toRender = state.videogames.find(game => game.uuid === identifier.id || game.id === Number(identifier.id))
    || state.search.find(game => game.uuid === identifier.id || game.id === Number(identifier.id));

  useEffect(() => {
    setDetail(toRender);
    setLoading(false);
  }, [toRender]);

  if (loading) {
    return (<Loading>Loading...</Loading>);
  }

  if (!toRender) {
    return (<NotFound />);
  }

  // <SmallText>Tags</SmallText>
  // {detail?.tags.length && detail.tags.map((tag, id) => (<Tag primary key={id}>{tag}</Tag>))}

  return (
    <>
      {detail && 
        <Wrapper>
          <H2>{detail.title}</H2>
          <img src={detail.thumbnail} alt={detail.title} />
          <Info>
            <SmallText>Release date: {new Date(detail.released).toLocaleDateString()}</SmallText>
            {detail.description && <Caption>Description: {detail.description}</Caption>}
            <SmallText>Total ratings: {detail.total_ratings}</SmallText>
            <SmallText>Rating: {detail.rating}</SmallText>
            <SmallText>Reviews: {detail.reviews}</SmallText>
            <SmallText>Genres:</SmallText>
            <TagContainer>
              {detail.Genres.length && detail.Genres.map(genre => (<Tag key={genre.id}>{genre.name}</Tag>))}
            </TagContainer>
            <SmallText>Platforms:</SmallText>
            <TagContainer>
              {detail?.platforms.length && detail.platforms.map((platform, id) => (<Tag key={id}>{platform}</Tag>))}
            </TagContainer>
            <SmallText>ESRB Rating:</SmallText>
            <Tag>{detail.ESRB}</Tag>
          </Info>
        </Wrapper>}
    </>
  );
}

const Loading = styled.div`
  padding: 300px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

const Wrapper = styled.div`
  padding: 100px;
  img{
    max-width: 500px;
    align-self: center;
    justify-self: center;
    border-radius: 2px;
  }
  display: grid;
  gap: 16px;

  justify-items: center;
`;

const Info = styled.div`
  display: grid;
  gap: 8px;
  align-items: center;
  justify-items: center;
`;

const TagContainer = styled.div`
  display: grid;
  gap: 2px;
`;

