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

export const Input = Styled.input`
width: ${(props) => props.width || "100%"};
height: ${(props) => props.height || "30px"};
margin: ${(props) => props.margin || "none"};
padding: ${(props) => props.padding || "0px 5px"};
background: #EDF8DF;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 2px;
`;

export const Button = Styled.button`
width: ${(props) => props.width || "100%"};
height: ${(props) => props.height || "40px"};
font-family: Nova Round;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
background: ${(props) => props.background || "#47926E"};
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
color: #FFFFFF;
cursor:pointer;
`;
