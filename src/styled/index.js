import Styled from "styled-components";

export const Container = Styled.div`
position:${(props) => props.position || "relative"};
top:${(props) => props.top || "none"};
left:${(props) => props.left || "none"};
right:${(props) => props.right || "none"};
bottom:${(props) => props.bottom || "none"};
display:flex;
align-items: ${(props) => props.align || "none"};
justify-content: ${(props) => props.justify || "none"};
flex-direction:${(props) => props.direction || "none"};
height:${(props) => props.height || "none"};
width:${(props) => props.width || "100%"};
background-color:${(props) => props.background || "none"};
border:${(props) => props.border || "none"};
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
`;

export const Text = Styled.p`
postion:${(props) => props.postion || "relative"};
top:${(props) => props.top || "none"};
left:${(props) => props.left || "none"};
right:${(props) => props.right || "none"};
bottom:${(props) => props.bottom || "none"};
color:${(props) => props.color || "black"};
text-align:${(props) => props.align || "none"};
vertical-align:${(props) => props.verticalAlign || "none"};
text-transform:${(props) => props.transform || "none"};
font-family:${(props) => props.family || "none"};
font-size:${(props) => props.size || "10px"};
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
background-color:${(props) => props.background || "none"};
`;
