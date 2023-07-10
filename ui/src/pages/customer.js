/*
Copyright (c) 2022, CloudBlue LLC
All rights reserved.
*/
import createApp, {
  Card,
} from '@cloudblueconnect/connect-ui-toolkit';
import '@fontsource/roboto/500.css';
import '../../styles/index.css';


createApp({ 'tab-card': Card });

fetch('/api/ta_context').then((response) => {
  response.json().then((data) => {
    document.getElementById('context').innerText = JSON.stringify(data, null, 4);
  });
});
