import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addVideogame } from '../actions/actions.js';
import { Button, H2, Input, SmallText2, Tag } from './styles/TextStyles.jsx';

export default function CreateForm() {
  const genres = useSelector(state => state.genres);
  const platforms = useSelector(state => state.platforms);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: {
      error: true,
      message: ''
    },
    description: {
      error: true,
      message: ''
    },
    release_date: {
      error: true,
      message: ''
    },
    rating: {
      error: true,
      message: ''
    },
  });

  const [formInfo, setFormInfo] = useState({
    name: '',
    description: '',
    release_date: '',
    rating: '',
    genres: [],
    platforms: []
  });

  useEffect(()=>{
    console.log(errors)
  },[errors])


  const handleInput = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    setFormInfo(prevState => ({ ...prevState, [property]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const test = Object.keys(errors).map(key=>errors[key].error)
    if (!test.includes(true)) {
      dispatch(addVideogame(formInfo));
      alert(`Videogame added successfully.`);
    }
  };

  const addTag = (e) => {

    const currentTag = {
      id: e.target.id,
      name: e.target.innerHTML.trim()
    };

    const existingGenre = formInfo.genres.find(genre => genre.name === currentTag.name);
    const existingPlatform = formInfo.platforms.find(platform => platform.name === currentTag.name);
    // remove if added twice
    if (existingGenre) {
      let newGenres = formInfo.genres.filter(genre => genre.name !== existingGenre.name);
      setFormInfo({ ...formInfo, genres: newGenres });
    }

    if (existingPlatform) {
      let newPlatforms = formInfo.platforms.filter(platform => platform.name !== existingPlatform.name);
      setFormInfo({ ...formInfo, platforms: newPlatforms });
    }
    // add
    if (!existingPlatform && !existingGenre) {
      const validGenre = genres.find(genre => genre.name === currentTag.name);
      const validPlatform = platforms.find(platform => platform.name === currentTag.name);

      if (validGenre) {
        let newGenres = formInfo.genres.concat(validGenre);
        setFormInfo({ ...formInfo, genres: newGenres });
      }

      if (validPlatform) {
        let newPlatforms = formInfo.platforms.concat(validPlatform);
        setFormInfo({ ...formInfo, platforms: newPlatforms });
      }
    }
  };

  const validateInput = () => {

    if (!formInfo.name) {
      setErrors({ ...errors, name: { message: 'You must enter a name.', error: true } });
    } else if (formInfo.name.length < 4) {
      setErrors({ ...errors, name: { message: 'Name must be at least 4 characters long.', error: true } });
    } else {
      setErrors({ ...errors, name: { message: '', error: false } });
    }

    if (!formInfo.description) {
      setErrors({ ...errors, description: { message: 'You must enter a description.', error: true } });
    } else if (formInfo.description.split(' ').length < 10) {
      setErrors({ ...errors, description: { message: 'Use at least 10 words to describe the game.', error: true } });
    } else {
      setErrors({ ...errors, description: { message: '', error: false } });
    }

    if (!formInfo.release_date) {
      setErrors({ ...errors, release_date: { message: 'You must enter a release date.', error: true } });
    } else {
      setErrors({ ...errors, release_date: { message: '', error: false } });
    }

    if (!formInfo.rating) {
      setErrors({ ...errors, rating: { message: 'You must enter a rating.', error: true } });
    } else if (!/\d{1}\.\d{1,2}/.test(formInfo.rating)) {
      setErrors({ ...errors, rating: { message: 'Rating must be a valid float.', error: true } });
    } else {
      setErrors({ ...errors, rating: { message: '', error: false } });
    }

  };

  return (
    <Wrapper>
      <H2>Submit a videogame</H2>
      <Form onChange={handleInput} onSubmit={handleSubmit} >
        <ValidatedInput>
          <Input onChange={validateInput} name="name" type='text' placeholder='title' /> 
          {errors.name.error && <p>{errors.name.message}</p>}
        </ValidatedInput>
        <ValidatedInput>
          <Input onChange={validateInput} name="description" type='text' placeholder='description' />
          {errors.description.error && <p>{errors.description.message}</p>}
        </ValidatedInput>
        <ValidatedInput>
          <Input onChange={validateInput} name="release_date" type='date' placeholder='date' />
          {errors.release_date.error && <p>{errors.release_date.message}</p>}
        </ValidatedInput>
        <ValidatedInput>
          <Input onChange={validateInput} name="rating" type='text' placeholder='rating' />
          {errors.rating.error && <p>{errors.rating.message}</p>}
        </ValidatedInput>
        <SmallText2>Select genres:</SmallText2>
        <TagContainer>
          {genres && genres.map(genre => (
            <Tag2 onClick={addTag} name={genre.name} key={genre.id} id={genre.id} > {genre.name} </Tag2>
          ))}
        </TagContainer>
        <SmallText2>Select platforms:</SmallText2>
        <TagContainer>
          {platforms && platforms.map(platform => (
            <Tag2 onClick={addTag} name={platform.name} key={platform.id} id={platform.id} > {platform.name} </Tag2>
          ))}
        </TagContainer>
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  text-align: center
`;

const ValidatedInput = styled.div`
  display: grid;
  grid-template-columns: auto auto
  p{
    font-size: 4px;
    color: red;
    text-transform: uppercase;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(9, auto);
  padding: 40px 0;
  gap: 16px;
`;

const TagContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(4, auto);
  gap: 8px;
  padding: 16px 0;
`;

const Tag2 = styled(Tag)`
  cursor: pointer;
`;