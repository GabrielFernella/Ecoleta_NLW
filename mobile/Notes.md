# Pacotes 
1. npm install -g expo-cli //instalar o expo de forma global  yarn global add expo-cli
2. expo init mobile //iniciar aplicação do expo, use o template com o Typescript
3. expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto //Pacote de instalação de fontes do google no expo
4. npm install @react-navigation/native //navegator para react native
5. expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view //Pacotes do expo
6. npm install @react-navigation/stack // Navegação em Pilha
7. expo install react-native-maps //mapas para o react native
8. expo install expo-constants
9. expo install react-native-svg // componente para entender imagens svg
10. npm install axios




# Processos
1. Instalar pacotes
2. Organizar a estrutura de pastas e arquivos 
3. Montar as páginas da sua aplicação
4. Montar conexão entre as páginas (rotas)




# Como funciona ?
* O react native funciona através de tags que precisam ser importadas, como o <Text></Text>
* import React from 'react'; deve estar em todos arquivos






@Vinícius Fraga @GhDk @GabrielFernella Encontrei o problema... Por algum motivo o yarn esta instalando alguns pacotes com versões incompatíveis com o expo:
expo install @react-native-community/masked-view
expo install react-native-reanimated
expo install react-native-screens
expo install react-native-safe-area-context

Quem estiver com o mesmo problema, é só executar esses comandos que corrige os pacotes incompatíveis





expo init teste --npm 
cd teste
expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
npm install @react-navigation/native 
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
npm start


1:33 timer