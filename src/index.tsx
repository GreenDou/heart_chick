import { combineReducers, createStore } from 'redux';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { WeatherResult } from './def';
import { PageWrapper } from './page_wrapper';
import { Welcome } from './welcome';
import { Display } from './display';
import './style.css';
// TODO: Check @types/react-intl if they fix the problem of 2.1.1
// import { IntlProvider } from 'react-intl';

// on_loaded(() => {
// TODO: Maybe use 'react-intl-redux' to switch locale and message on request?
// load_locale_data((locale, msg) => {

const root_reducer = combineReducers({});
const root_store = createStore(root_reducer);

const weather_result: WeatherResult = JSON.parse('{"results":[{"location":{"id":"WS10730EM8EV","name":"Shenzhen","country":"CN","path":"Shenzhen,Shenzhen,Guangdong,China","timezone":"Asia/Shanghai","timezone_offset":"+08:00"},"now":{"text":"Cloudy","code":"4","temperature":"23"},"last_update":"2017-04-07T22:10:00+08:00"}]}').results[0];
render(
  <Provider store={root_store}>
    {/*<IntlProvider*/}
    {/*// locale={locale}*/}
    {/*// messages={msg}*/}
    {/*// >*/}
    <Router>
      <div>
        <Route exact path='/' render={() => {
          return (
            <PageWrapper>
              <Welcome city={weather_result.location.name}
                  weather_code={parseInt(weather_result.now.code)}
                  temperature={weather_result.now.temperature} />
            </PageWrapper>
          );
        }}>
        </Route>
        <Route path='/display' render={() => {
          return (
            <Display />
          );
        }}>
        </Route>
      </div>
    </Router>
    {/*// </IntlProvider>*/}
  </Provider>
  ,
  document.getElementById('root'));



  // })

// });

// initiate_load();
