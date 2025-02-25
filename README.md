-----------------------------------------------------------------------------
HITO 6

Para probar la implementación de Socket io, abrir en navegador http://localhost:3000

Modificaciones realizadas:
- Carpeta src: index.ts y app.ts
- Se crea carpeta public para manejo de front 

-----------------------------------------------------------------------------



HITOS ANTERIORES 


Las rutas del siguiente proyecto han sido probadas con Thunder Client

1) Creación de usuario:
    - Realizar el registro de un nuevo usuario en la ruta 'http://localhost:3000/api/v1/auth/register', como sugerencia, se puede utilizar un elemento del archivo users.json

2) Login de usuario: 
   - Realizar el login en la ruta 'http://localhost:3000/api/v1/auth/login' con un método POST, ingresando datos del usuario creado en el punto anterior. La respuesta entrega un token de sesión, copiar el token.

3) Pruebas de CRUD de pacientes:
    -La creación de un nuevo paciente ruta 'http://localhost:3000/api/v1/patients/createPatient'con un método POST. En el body colocar un objeto con id, name, age y diagnostic. (Sugerencia: Utilizar datos del archivo patients.json)
    - Acceder a la lista de pacientes en la ruta 'http://localhost:3000/api/v1/patients' con un método GET, se debe colocar el token de sesión en la sección de Auth/Bearer Token.
    - Buscar datos de un paciente, se debe colocar el rut del paciente directamente en la ruta 'http://localhost:3000/api/v1/patients/:rut', no requiere de token
    - Actualizar datos de paciente en ruta 'http://localhost:3000/api/v1/patients/updatePatient' con un método PUT, no requiere token
    - Eliminar un paciente requiere de Token, la ruta es 'http://localhost:3000/api/v1/patients/deletePatient' con un método DELETE, sólo necesita el id.


Para mayor detalle de la API, consultar en 'http://localhost:3000/api/v1/api-docs/'

12-01-2025 Se implementa ORM Sequelize en proyecto. 
Carpeta config: Configuración conexión a BD con Sequelize
Carpeta models: Se dejan por separado los squemas de usuario y paciente en archivos 'user.ts' y patient.ts. Se modifican los modelos para realizar consultas a la BD por medio de métodos de sequelize

25-01-2025 Único cambio: palabra secreta para JWT

