import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as PIXI from 'pixi.js';

const style = require('./style.css');

const weather_chick = require('../display/asset/weather.png');
const hill_1 = require<string>('./asset/hill1.png');
const hill_2 = require<string>('./asset/hill2.png');
const hill_3 = require<string>('./asset/hill3.png');
const hill_4 = require<string>('./asset/hill4.png');
const hill_5 = require<string>('./asset/hill5.png');
const cloud = require<string>('./asset/cloud.png');
const resources = [ weather_chick, hill_1, hill_2, hill_3, hill_4, hill_5, cloud ];

interface WelcomeProps {
  city:string;
  temperature:string;
  weather_code:number;
}

@CSSModules(style)
export class Welcome extends React.Component<WelcomeProps, {}> {
  private pixi_element:HTMLElement;
  private pixi_app:PIXI.Application;
  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#336699');
    gradient.addColorStop(1, '#33ccff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const texture = PIXI.Texture.fromCanvas(canvas);
    const sprite = new PIXI.Sprite(texture);
    sprite.position.set(-width / 2, -height /2);

    this.pixi_app = new PIXI.Application(width, height);
    this.pixi_app.stage.pivot.set(-width / 2, -height / 2);
    this.pixi_app.stage.addChild(sprite);

    this.init_sprites();
    this.pixi_element.appendChild(this.pixi_app.view);
  }

  render() {
    return (
      <div styleName="welcome" ref={(element) => this.pixi_element = element}></div>);
  }

  private init_sprites() {

    PIXI.loader.add(resources).load((loader:PIXI.loaders.Loader, res:any) => {
      const weather_chick_sprite = this.add_sprite(
        'weather_chick',
        res[(weather_chick as string)].texture,
        0, 0);
      weather_chick_sprite.width = 400;
      weather_chick_sprite.height = 400;
      this.init_hills(res);
      this.init_cloud(res);
      this.init_weather();
    });
  }

  private add_sprite(name:string, texture:PIXI.Texture, x:number, y:number, alpha?:number) {
    const sprite = new PIXI.Sprite(texture);
    sprite.name = name;
    sprite.pivot.set(sprite.width / 2, sprite.height / 2);
    sprite.position.set(x, y);
    if (alpha) {
      sprite.alpha = alpha;
    }
    this.pixi_app.stage.addChild(sprite);
    return sprite;
  };

  private init_hills(res:PIXI.loaders.IResourceDictionary) {
    this.add_sprite(
        'hill_1',
        res[hill_1].texture,
        -this.pixi_app.stage.width / 2 + res[hill_1].texture.width / 2,
        this.pixi_app.stage.height / 2 - res[hill_1].texture.height / 2);
      this.add_sprite(
        'hill_2',
        res[hill_2].texture,
        -this.pixi_app.stage.width * 0.25,
        this.pixi_app.stage.height / 2 - res[hill_2].texture.height / 2);
      this.add_sprite(
        'hill_3',
        res[(hill_3 as string)].texture,
        this.pixi_app.stage.width * 0.2,
        this.pixi_app.stage.height / 2 - res[(hill_3 as string)].texture.height / 2);
      this.add_sprite(
        'hill_4',
        res[hill_4].texture,
        this.pixi_app.stage.width * 0.3,
        this.pixi_app.stage.height / 2 - res[hill_4].texture.height / 2);
      this.add_sprite(
        'hill_5',
        res[hill_5].texture,
        this.pixi_app.stage.width * 0.5 - res[hill_5].texture.width / 2,
        this.pixi_app.stage.height / 2 - res[hill_5].texture.height / 2);
  }

  private init_cloud(res:PIXI.loaders.IResourceDictionary) {
    this.add_sprite(
      'cloud_1',
      res[cloud].texture,
      this.pixi_app.stage.width * -0.125,
      this.pixi_app.stage.height * -0.25,
      0.2);
    this.add_sprite(
      'cloud_2',
      res[cloud].texture,
      this.pixi_app.stage.width * 0.25,
      this.pixi_app.stage.height * -0.1,
      0.5);
    this.add_sprite(
      'cloud_3',
      res[cloud].texture,
      this.pixi_app.stage.width * -0.225,
      this.pixi_app.stage.height * 0.175,
      0.5);
    this.add_sprite(
      'cloud_4',
      res[cloud].texture,
      this.pixi_app.stage.width * 0.125,
      this.pixi_app.stage.height * 0.35,
      0.2);
  }

  private init_weather() {
    const text_city = new PIXI.Text(this.props.city, {
      fontFamily: 'SimHei, monospace',
      fontSize: 40,
      fill: '#FFFFFF',
    });
    text_city.pivot.set(text_city.width / 2, text_city.height / 2);
    text_city.position.set(0, this.pixi_app.stage.height * -0.5 + text_city.height / 2 + 80);
    this.pixi_app.stage.addChild(text_city);

    const text_temperature = new PIXI.Text(this.props.temperature + '°', {
      fontFamily: 'SimHei, monospace',
      fontSize: 40,
      fill: '#FFFFFF',
    });
    text_temperature.pivot.set(text_temperature.width / 2, text_temperature.height / 2);
    text_temperature.position.set(0, text_city.y + text_city.height / 2 + 16 + text_temperature.height / 2);
    this.pixi_app.stage.addChild(text_temperature);
  }
}

