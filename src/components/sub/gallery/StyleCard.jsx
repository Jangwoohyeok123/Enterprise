import styled from 'styled-components';

export const StyledArticle = styled.article`
	height: ${props => (props.type === 'fix' ? '25vh' : '')};
`;

// StyledArticle 은 Props 에 따라서 크기를 height 만 결정한다. 나머지는 컴포넌트에서 처리하자
