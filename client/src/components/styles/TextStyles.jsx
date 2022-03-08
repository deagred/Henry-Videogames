import styled from "styled-components";

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 60px;
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 40px;
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 30px;
`;

export const BodyIntro = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
`;

export const BodyMain = styled.p`
  font-weight: normal;
  font-size: 20px;
  line-height: 140%;
`;

export const MediumText = styled.p`
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
`;

export const Caption = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;

export const Caption2 = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
`;

export const SmallText = styled.p`
  font-weight: normal;
  font-size: 13px;
  line-height: 130%;
`;

export const SmallText2 = styled.p`
  font-weight: 600;
  font-size: 13px;
  line-height: 130%;
  text-transform: uppercase;
`;

export const Tag = styled(SmallText2)`
  background-color: ${props => props.primary ? '#22333B' : 'white'};
  color: ${props => props.primary ? 'white' : '#22333B'};
  border-radius: 10px;
  max-width: max-content;
  max-height: 16px;
  padding: 0 8px;
  user-select: none;
`;

export const Button = styled.button`
  border: none;
  border-radius: 2px;
  cursor: pointer;
  justify-self: center;
  max-width: max-content;
  outline: none;
  padding: 4px 16px;
`

export const Input = styled.input`
  font-size: 16px;
  padding: 8px 16px;
  margin: 8px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 2px;
  color: #fff;
  ::placeholder {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
  }
  &:focus {
    outline:none;
  }
  text-align: center;
`;