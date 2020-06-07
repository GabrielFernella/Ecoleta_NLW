import React from 'react';
import {AppLoading} from 'expo'; //Apploading - Pagina de carregamento
import { StatusBar } from 'react-native'; 

import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto' //Fontes google
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'//Fontes google


import Routes from './src/routes';

export default function App() {
  //Fontes
    const [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Roboto_500Medium,
      Ubuntu_700Bold
    })
    //Caso não tenha carregado as fontes, o app ficará carregando
    if(!fontsLoaded) {
      return <AppLoading />
    }


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
