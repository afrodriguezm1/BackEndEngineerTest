# BackEndEngineerTest

# Endpoints

|Función| dirección | parametros| cabeceras|
|-|-|-|-|
|SignUp | http://<host>:<port>/api/user/signup | username, password|Ninguna|
|SignIn | http://<host>:<port>/api/user/signIn | username, password|Ninguna|
|Buscar | http://<host>:<port>/api/restaurants/signup | latitud, longitud, radio de búsqueda (m)| auth-toke: Token de acceso|
|Historial | http://<host>:<port>/api/restaurants/hisotry | username, password|auth-toke: Token de acceso|