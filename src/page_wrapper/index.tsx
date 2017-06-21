import * as React from 'react';

interface PageStates {
  offset:number;
}

export class PageWrapper extends React.Component<{}, PageStates> {
  private timer:number|undefined;
  constructor() {
    super();
    this.state = {
      offset: 0,
    };
  }

  render() {
    return (
      <div onWheel={this.on_wheel} 
          style={{  transform: `translate(0, ${this.state.offset / 10}px)`}}>
        { this.props.children }
      </div>
    );
  }

  on_wheel = (event:React.WheelEvent<HTMLDivElement>) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({
      offset: this.state.offset + event.deltaY,
    })
    console.log(event.deltaY)
    this.timer = window.setTimeout(
      () => {
        this.setState({
          offset: 0,
        })
        this.timer = undefined;
      },
      500)
  }
}