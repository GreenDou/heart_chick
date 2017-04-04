import { WeatherResult } from './def';
import { Welcome } from './welcome';
import { combineReducers, createStore } from 'redux';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Axios from 'axios';

import { Display } from './display';
import './style.css';
// TODO: Check @types/react-intl if they fix the problem of 2.1.1
// import { IntlProvider } from 'react-intl';

// on_loaded(() => {
// TODO: Maybe use 'react-intl-redux' to switch locale and message on request?
// load_locale_data((locale, msg) => {

const root_reducer = combineReducers({});
const root_store = createStore(root_reducer);

Axios.get(
  'https://api.seniverse.com/v3/weather/now.json?location=ip&language=zh-Hans&unit=c&ts=1491211104972&ttl=1&uid=U370E25570&sig=Oh%2F4Min6Sa%2BwafAvuOE8SR%2BzMbY%3D&callback=showWeather', {
    withCredentials: true,
  }).then((res) => {
    const weather_result = (window as any)['showWeather']();
    render(
  <Provider store={root_store}>
    {/*<IntlProvider*/}
      {/*// locale={locale}*/}
      {/*// messages={msg}*/}
    {/*// >*/}
    <div>
      <Welcome city={weather_result.location.name} weather_code={parseInt(weather_result.now.code)} temperature={weather_result.now.temperature}/>
      <Display />
    </div>
        {/*// </IntlProvider>*/}
  </Provider>
  ,
  document.getElementById('root'));
  });

// const weather_result:WeatherResult = JSON.parse('{"results":[{"location":{"id":"W7W3YQKE4QDH","name":"Haikou","country":"CN","path":"Haikou,Haikou,Hainan,China","timezone":"Asia/Shanghai","timezone_offset":"+08:00"},"now":{"text":"Cloudy","code":"4","temperature":"27"},"last_update":"2017-04-04T15:50:00+08:00"}]}').results[0];


  // })

// });

// initiate_load();
