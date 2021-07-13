import Styled from "styled-components";

export const Container = Styled.div`
position:${(props) => props.position || "relative"};
top:${(props) => props.top || "none"};
left:${(props) => props.left || "none"};
right:${(props) => props.right || "none"};
bottom:${(props) => props.bottom || "none"};
display:${(props) => props.display || "flex"};
flex:${(props) => props.flex || "none"};
align-items: ${(props) => props.align || "none"};
justify-content: ${(props) => props.justify || "none"};
flex-direction:${(props) => props.direction || "none"};
height:${(props) => props.height || "none"};
width:${(props) => props.width || "100%"};
background-color:${(props) => props.background || "none"};
font-family:${(props) => props.family || "IBM Plex Sans"};
border:${(props) => props.border || "none"};
border-top:${(props) => props.borderTop || "none"};
border-bottom:${(props) => props.borderBottom || "none"};
border-left:${(props) => props.borderLeft || "none"};
border-right:${(props) => props.borderRight || "none"};
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
overflow:${(props) => props.overflow || "none"};
overflow-x:${(props) => props.overflowX || "none"};
overflow-y:${(props) => props.overflowY || "none"};
z-index:${(props) => props.zIndex || "none"};
text-align:${(props) => props.textAlign || "none"};
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
font-family:${(props) => props.family || "IBM Plex Sans"};
font-size:${(props) => props.size || "14px"};
font-weight:${(props) => props.weight || "none"};
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
background-color:${(props) => props.background || "none"};
line-height:${(props) => props.lineHeight || "15px"};
width:${(props) => props.width || "none"};
cursor:${(props) => props.cursor || "none"};
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
position:${(props) => props.position || "relative"};
top:${(props) => props.top || "none"};
left:${(props) => props.left || "none"};
right:${(props) => props.right || "none"};
bottom:${(props) => props.bottom || "none"};
width: ${(props) => props.width || "100%"};
height: ${(props) => props.height || "40px"};
font-family: Nova Round;
font-style: normal;
font-weight: ${(props) => props.weight || "none"};
font-size: ${(props) => props.size || "14px"};
padding:${(props) => props.padding || "none"};
margin:${(props) => props.margin || "none"};
background: ${(props) => props.background || "#47926E"};
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius:${(props) => props.radius || "5px"}; ;
border-color:${(props) => props.background || "#47926E"};
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
color:${(props) => props.color || "#FFFFFF"} ;
cursor:pointer;
`;

export const Tab = Styled.div`
width: 100px;
height:40px;
margin:0px 5px;
display:flex;
align-items:center;
justify-content:center;
font-family: IBM Plex Sans;
font-weight:bold;
color:white;
cursor:pointer;
background: ${(props) => (props.active ? "#B05656" : "#F17260")};
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px 5px 0px 0px;
`;
