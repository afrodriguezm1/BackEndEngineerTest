# BackEndEngineerTest

# Endpoints

|Función| dirección | parametros| cabeceras|
|-|-|-|-|
|SignUp | .../api/user/signup | username, password|Ninguna|
|SignIn | .../api/user/signIn | username, password|Ninguna|
|Buscar | .../api/restaurants/signup | latitud, longitud, radio de búsqueda (m)| auth-token: Token de acceso|
|Historial | .../api/restaurants/hisotry | username, password|auth-token: Token de acceso|

# Ejecución

- En la carpeta raíz del proyecto ejecutar npm install
- copiar en la carpeta raiz el archivo .env con las variables de entorno
- desde la carpeta raíz ejecutar npm start o npm run start