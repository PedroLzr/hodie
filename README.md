# Hodie

Hodie es un proyecto que recopila y centraliza información cultural diaria desde diversas fuentes web mediante web scraping. Su objetivo es proporcionar en un solo sitio datos como la palabra del día, la frase del día, efemérides, santos y más.
También cuenta con una pequeña sección de economía y actualidad, como los precios de algunas criptomonedas, minerales, productos básicos, horarios de las principales bolsas...

## Características principales

- **Cultura diaria**: En la página principal se pueden encontrar información actualizada sobre la palabra del día, la frase del día, efemérides, santos y más.
- **Sección de economía**: Se obtiene información relevante sobre precios de criptomonedas, materiales y otros datos financieros mediante APIs de terceros.
- **Juegos interactivos**: Incluye juegos como el ahorcado, stop y stop numérico.
- **Desarrollo y tecnología**:
  - Desarrollado en **Python** utilizando **Flask**.
  - Juegos implementados en **JavaScript**.
  - Estilos diseñados con **CSS puro** y **Bootstrap**.
  - Uso de **BeautifulSoup** para realizar el web scraping.
  - Datos estructurados en archivos **JSON**, utilizados tanto para los juegos como para la página principal.

## Instalación y ejecución

Para ejecutar el proyecto localmente, utiliza el script `init.sh`:

Puede ser necesario ejecutar primero `pip install -r requirements.txt`.

```sh
./init.sh
```

También cuenta con un Dockerfile para su ejecución en contenedores Docker.

## API

Hodie expone diversas APIs que permiten acceder a información como:

- **Frase del día**
- **Palabra del día**
- **(En construcción)**

## Tecnologías utilizadas

- **Python** (Flask, BeautifulSoup)
- **JavaScript** (para los juegos)
- **CSS & Bootstrap** (para estilos)
- **APIs externas** (para datos financieros)
- **JSON** (estructura de datos)
- **Docker** (para despliegue)

## Estructura del proyecto

*   **`external_data`**: Contiene datos obtenidos de fuentes externas, organizados por categorías como "culture" y "economy".
*   **`internal_data`**: Almacena datos específicos de la aplicación, incluyendo archivos JSON con curiosidades y frases.
*   **`src`**:
    *   **`config`**: Almacena archivos de configuración.
    *   **`models`**: Define las estructuras de datos utilizadas en la aplicación.
    *   **`routes`**: Define las rutas de la API y las funciones que las manejan.
    *   **`services`**: Contiene la lógica de negocio de la aplicación, separada por dominios (culture, economy). Los adaptadores dentro de cada dominio se encargan de interactuar con diferentes fuentes de datos.
    *   **`utils`**: Incluye funciones de utilidad reutilizables en toda la aplicación.
*   **`static`**: Contiene archivos estáticos como CSS, imágenes y JavaScript.
*   **`templates`**: Almacena las plantillas HTML utilizadas para renderizar las páginas web.

### Archivos Importantes

*   **`main.py`**: El punto de entrada principal de la aplicación Flask.
*   **`requirements.txt`**: Un archivo que lista todas las dependencias de Python necesarias para ejecutar la aplicación.  Puedes instalar estas dependencias usando `pip install -r requirements.txt`.
*   **`Dockerfile`**: Utilizado para construir una imagen de Docker para la aplicación, facilitando la implementación y el escalado.
*   **`init.sh`**: Es un script shell que se utiliza para iniciar la aplicación de forma rápida.