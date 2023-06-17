<p align="center" width="100%">
    <img width="100%" src="https://i.imgur.com/PUJLUaV.png">
    <img src="https://i.imgur.com/6sJmkcX.png">
</p>

**Mobility** es una **Aplicación Móvil** multiplataforma diseñada con el propósito de abordar de manera **eficiente** y **efectiva** la complejidad que implica administrar y organizar todo contenido fotográfico generado durante un viaje.

## Indice

- [Introducción](#introducción)
- [Requisitos](#requisitos)
- [Arquitectura](#arquitectura)
- [Diseño](#diseño)
- [Puesta en producción](#puesta-en-producción)
- [Conclusiones](#conclusiones)

## Introducción

Mobility es una **aplicación móvil multiplataforma** diseñada para **simplificar** y **optimizar** la gestión del contenido fotográfico generado durante los viajes. Su objetivo principal es unificar todo el material visual en un mismo sitio, facilitando así la labor de profesores y gestores al descargar y publicar ese contenido en diversas plataformas.

En el ámbito educativo, Mobility se convierte en una herramienta **invaluable** para los profesores. Les permite recopilar de manera eficiente las fotografías capturados por los estudiantes durante un viaje de estudio. Los profesores pueden invitar a los estudiantes a cargar su contenido en la aplicación, creando así un repositorio centralizado de imágenes. Esto facilita a los profesores el acceso y la revisión del material, permitiéndoles utilizarlo en actividades educativas, presentaciones o proyectos.

Por otro lado, Mobility también beneficia a los gestores de viajes al simplificar la tarea de recopilar y organizar el contenido visual generado durante los viajes grupales. La aplicación permite a los gestores descargar rápidamente todas las fotografías y videos capturados por los participantes y utilizarlos para crear una narrativa visual del viaje. Además, Mobility ofrece la capacidad de compartir fácilmente este contenido en redes sociales, páginas web institucionales u otros canales de comunicación relevantes, lo que ayuda a promover la experiencia del viaje y aumentar la visibilidad de la institución.

## Requisitos

### Requisitos Funcionales

- Los usuarios deben de poder iniciar sesión y registrarse.
- Los usuarios deben poder acceder a la cámara del dispositivo y hacer fotografías.
- Los usuarios deben de poder crear publicaciones.
- Los usuarios deben de poder eliminar sus propias publicaciones.
- Los gestores deben poder acceder a una sección privada para crear viajes.
- Los gestores deben de poder eliminar su propio viaje.
- Los gestores deben de poder eliminar publicaciones de usuarios.
- Los gestores deben poder organizar viajes y crear su respectivo código de enlace para invitar a alumnos.
- Los gestores deben de tener acceso a un endpoint especifico que devuelve todos los datos del contenido de un viaje.

### Requisitos No Funcionales

- **Rendimiento**: La aplicación debe cargar y procesar las imágenes de manera rápida y eficiente.
- **Seguridad**: Se deben implementar medidas de seguridad para proteger la privacidad del contenido visual.
- **Usabilidad**: La interfaz de usuario debe ser intuitiva y fácil de usar, incluso para usuarios sin experiencia técnica.
- **Compatibilidad**: La aplicación debe ser compatible con diferentes plataformas móviles y versiones del sistema operativo.
- **Escalabilidad**: La aplicación debe ser capaz de manejar un volumen creciente de contenido fotográfico a medida que más usuarios la utilicen.

## Arquitectura

Mobility es una aplicación móvil desarrollada en **React Native**, que utiliza un backend construido en **NestJs**, siguiendo una arquitectura hexagonal. Esta elección de tecnologías y arquitectura tiene como objetivo principal facilitar la escalabilidad de la aplicación.

### Base de datos

La base de datos elegida para Mobility es **MongoDB**, una opción NoSQL que simplifica el manejo de modelos gracias a sus API específicas para cada lenguaje de programación. MongoDB almacena los datos en documentos flexibles en formato JSON, lo que permite una representación natural y coherente de la información.

Esta elección de base de datos simplifica el desarrollo y brinda flexibilidad para adaptarse a cambios en los modelos de datos y requerimientos de Mobility.

### React Native

React Native es un framework que permite crear aplicaciones móviles multiplataforma utilizando una única base de código. Con React Native, los desarrolladores pueden escribir una vez y ejecutar en múltiples plataformas como iOS y Android. Esta reutilización de código es muy importante porque evita la necesidad de desarrollar y mantener dos versiones separadas de la aplicación para cada plataforma.

La ventaja de este enfoque es la eficiencia del proceso de desarrollo. Los equipos de desarrollo pueden concentrarse en escribir y pulir el código al mismo tiempo en lugar de tener que lidiar con dos conjuntos de código diferentes para diferentes plataformas móviles. Esto reduce el esfuerzo y acelera el tiempo de desarrollo, lo que permite que las aplicaciones salgan al mercado más rápido. Ser capaz de usar una sola base de código en React Native también significa que no hay pérdida de funcionalidad o rendimiento.

Las aplicaciones desarrolladas con React Native tienen un rendimiento comparable al de las aplicaciones nativas porque el código se traduce en componentes nativos específicos de la plataforma. En resumen, React Native proporciona una forma eficiente y productiva de desarrollar aplicaciones móviles multiplataforma.

### NestJs

Por otro lado, NestJs es un framework de desarrollo de aplicaciones backend en Node.js que utiliza el lenguaje TypeScript. Implementa una arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores. Esta arquitectura promueve una separación clara de las capas de aplicación y facilita la modularidad y la reutilización de código. Además, permite adaptarse fácilmente a cambios futuros y escalar la aplicación de manera eficiente, ya sea agregando nuevos módulos o aumentando la capacidad de procesamiento.

### Arquitectura hexagonal

La arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores, es un enfoque de diseño de software que busca separar claramente las responsabilidades de una aplicación. En esta arquitectura, el núcleo de la aplicación se encuentra en el centro, representando las reglas de negocio, mientras que los puertos y adaptadores se encargan de la comunicación con el mundo exterior.

NestJs, un framework de desarrollo backend en Node.js, implementa la arquitectura hexagonal proporcionando una estructura modular. En NestJs, los controladores actúan como puertos de entrada, manejando las solicitudes HTTP, mientras que los servicios representan la lógica de negocio central. Los adaptadores, como los repositorios, se conectan a bases de datos u otros sistemas de almacenamiento.

Esta separación de responsabilidades en capas facilita la reutilización y el mantenimiento del código. La arquitectura hexagonal permite realizar pruebas unitarias y realizar cambios en los adaptadores sin afectar el núcleo de la aplicación. También ofrece flexibilidad y escalabilidad, permitiendo adaptarse a nuevos requisitos y cambios en el entorno.

En resumen, la arquitectura hexagonal se basa en la separación de responsabilidades en una aplicación, y NestJs la implementa proporcionando una estructura modular. Esto promueve la reutilización, facilita el mantenimiento y permite adaptarse a cambios, haciendo que el desarrollo de aplicaciones backend sea más eficiente y flexible.

### Diagrama de Arquitectura

![DiagramaArquitectura](https://i.imgur.com/6CisAe9.jpeg)

### Diagrama de Clases

![DiagramaArquitectura](https://i.imgur.com/IPWvgkj.png)

### Resumen

La combinación de React Native como frontend y NestJs como backend, junto con la arquitectura hexagonal, proporciona una base sólida para el desarrollo de Mobility. Permite una separación clara de responsabilidades, facilita la reutilización de componentes y módulos, y ofrece la flexibilidad necesaria para escalar la aplicación a medida que crece la demanda de usuarios y funcionalidades.

En resumen, Mobility utiliza la potencia de React Native y NestJs con una arquitectura hexagonal para proporcionar una experiencia de desarrollo eficiente y escalable. Esto garantiza que la aplicación pueda adaptarse a futuras necesidades y crecer de manera sostenible, brindando a los usuarios una plataforma confiable y de alto rendimiento.

## Diseño

### Backend

El backend, al utilizar el framework **NestJs**, nos permite aprovechar los beneficios de la **Programación Orientada a Objetos** (_POO_) y la **Inyección de Dependencias** (_ID_), lo cual favorece la modularidad, reutilización de código y la gestión eficiente de dependencias en nuestros proyectos.

Adicionalmente, al utilizar **TypeScript**, contamos con un sistema de tipos robusto que nos ayuda a prevenir errores en tiempo de compilación y facilita el mantenimiento y refactorización del código. Esto nos permite crear aplicaciones escalables y de fácil mantenimiento, con una arquitectura bien definida y desacoplada.

En resumen, la combinación del framework **NestJs** y **TypeScript** en el backend nos proporciona una base sólida para desarrollar aplicaciones de alta calidad, con un enfoque en la legibilidad, mantenibilidad y escalabilidad del código.

#### Autenticación

Para la autenticación se han utilizado tokens **JWT**. Este sistema funciona de la siguiente forma.

El servidor almacena un secreto el cual utiliza para generar este token JWT. Una vez el usuario inicia sesión generamos un token JWT con un payload que guarde información no sensible del usuario para poder identificar ese token con ese usuario.

Una vez tenemos el token, se lo pasamos al usuario el cual deberá almacenar para poder acceder a los endpoints.

Una vez tiene el usuario almacenado el token y quiere acceder a un endpoint protegido, debemos pasar por la cabecera este token para que el servidor lo revise.

Una vez el servidor recibe este token, verificará si es valido y no ha expirado y extraerá el payload del token para inyectar en la request la información del usuario.

#### Buenas practicas

Para la protección de rutas, se ha utilizado **Passport**, que es un middleware de autenticación para aplicaciones web desarrollado para Node.js. Este nos ofrece tener distintas estrategias de autenticación como por ejemplo autenticación con tokens **JWT** o por ejemplo autenticación con **Google**.

Adicionalmente, se han protegido todas las rutas por defecto y se ha habilitado un decorador propio al que he llamado **@Public** que lo que hace es saltarse la autenticación y abrir ese endpoint al público.

_Ejmplo de uso:_

```typescript
 @Public()
 @Get()
 publicRoute() {
   return {
     message: 'Esta es una ruta pública.',
   };
 }
```

---

Otro decorador propio muy util es **@UserRequired**, basicamente este decorador inyecta dentro de la request la información de usuario.

_Ejmplo de uso:_

```typescript
@UserRequired()
@Get('me')
 async me(@Request() { user }: UserRequest) {
   return user;
 }
```

_Sin este decorador habría que hacerlo de la siguiente manera:_

```typescript
@Get('me')
 async me(@Request() { user }: JwtPayloadRequest) {
   const user = this.userService.findOne(user?.id);
   if(!user) {
       throw new NotFoundException('Usuario no encontrado');
   }
   return user;
 }
```

De esta manera evitamos repetir código cada vez que necesitemos mas información sobre el usuario.

---

El decorador **@Roles** nos permite filtrar un endpoint para un role especifico o para varios roles.

_Ejmplo de uso:_

Con este ejemplo, solo permitimos a usuarios que son administradores acceder a obtener todos los usuarios.

```typescript
 @Roles(Role.Admin)
 @Get()
 async findAll() {
   return this.userService.findAll();
}
```

Sin este decorador tendríamos que obtener los datos del usuario y luego comprobar si el role que tiene es el que queremos filtrar.

También podemos utilizarlo de esta manera para soportar varios roles.

```typescript
 @Roles(Role.Admin, Role.Teacher)
```

### Frontend

En el frontend tambíen se han utilizado buenas practicas como es el uso de custom hooks para reutilizar código, uso de contextos y modularización de componentes.

Aqui un ejemplo custom hook para la creación de menus flotantes.

```javascript
export const useMenu = (anchor, items) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <Menu
      style={styles.menu}
      visible={visible}
      anchor={<TouchableOpacity onPress={showMenu}>{anchor}</TouchableOpacity>}
      onRequestClose={hideMenu}
    >
      {items.map((item, index) => {
        if (item == null) {
          return <MenuDivider key={index} />;
        }

        return (
          <MenuItem
            style={styles.item}
            key={index}
            onPress={() => {
              item.onPress();
              hideMenu();
            }}
          >
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
```

Gracias a este hook propio se pueden hacer menús flotantes así de simple:

```javascript
const Menu = useMenu(
  <Icon name={'dots-horizontal'} size={24} color="#3f3f3f"></Icon>,
  [
    {
      name: 'Eliminar',
      onPress: async () => await deletePost(id),
    },
  ],
);
```

Este es un ejemplo de muchos custom hooks que hay a lo largo del proyeto.

## Puesta en producción

\*Versión de NodeJs recomendada: **v19.5.0\***

### Backend

Lo primero de todo será instalar las dependencias del proyecto.

```bash
npm install
```

Ahora instalaremos los contenedores de docker.

```bash
docker-compose -f docker-compose.yml up -d
```

Por último iniciaremos el proyecto en modo desarrollo.

```bash
npm run start:dev
```

### Frontend

Lo primero de todo será instalar las dependencias del proyecto.

```bash
npm install
```

Una vez instaladas las dependencias iniciaremos el servicio.

```bash
npx expo start
```

## Conclusiones

En resumen, Mobility es una aplicación móvil poderosa y versátil que simplifica la gestión del contenido fotográfico en viajes. Su enfoque en la eficiencia, la usabilidad y la escalabilidad la convierte en una herramienta valiosa tanto para profesores como para gestores de viajes. Con una arquitectura robusta y buenas prácticas de diseño, Mobility ofrece una experiencia confiable y de alto rendimiento para los usuarios.

En cuanto a la arquitectura, Mobility utiliza React Native como framework de desarrollo para el frontend y NestJs como framework de desarrollo backend. La combinación de estas tecnologías, junto con la arquitectura hexagonal, proporciona una base sólida para el desarrollo de la aplicación. React Native permite crear aplicaciones móviles multiplataforma con una única base de código, mientras que NestJs implementa una arquitectura modular y escalable en el backend.

El diseño de Mobility se centra en la utilización de buenas prácticas, lo que garantizan la seguridad y la eficiencia en el manejo de datos y la interacción con los usuarios.
