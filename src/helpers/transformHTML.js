import React, {ReactHTMLElement} from 'react';
import htmr from 'htmr';
import CLink from '../components/cLink'

export const transformHTML = ( htmlString ) => {

    const transform = {
        a: node => {
            const { href } = node;

            // Going outside?
            if (href.substr(0, 4) === "http") {
            return node;
            }

            // Internal link to some other Gatsby route
            return (
            <CLink to={href}>
                {node.children}
            </CLink>
            );

            // // react-native can't render string without <Text> component
            // // we can test text node by checking component props, text node won't have them
            // if (props.target === '_blank') {
            //   // we use auto incrementing key because it's possible that <Text>
            //   // is rendered inside array as sibling
            //   return <a {...props}>{children[0]}</a>;
            // }
            // console.log(node)
            // // render unknown tag using <View>
            // // ideally you also filter valid props to <View />
            // return <CLink to={node.href} dangerouslySetInnerHTML={{__html:children}}/>;
        }
      }
      
    return htmr(htmlString, { transform });
}
