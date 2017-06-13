import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { map } from 'lodash';

const style = require('./style.css');

@CSSModules(style)
export class Display extends React.Component<{}, {}> {
  render() {
    const display_images = ['backup', 'browser', 'calculator'];
    const image_elements = map(display_images, (image) => {
          return (<img key={image} src={(require(`./asset/${image}.png`) as any)} />);
        });
    return (
      <div styleName="display">
        {image_elements}
      </div>);
  }
}
