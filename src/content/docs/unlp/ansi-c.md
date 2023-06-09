---
title: ANSI C
lang: es
createdAt: 2023-06-09
---

Referencia breve para ANSI C (versión C90). Información más detallada en [cppreference.com](https://en.cppreference.com/w/c).

<!-- toc -->

## Librerías estándar

Algunas de las declaraciones de algunas de las librerías estándar de C.

### `<limits.h>`

Límites definidos como macros/constantes.

|   Nombre    | Constante                                          |
| :---------: | :------------------------------------------------- |
| `CHAR_BIT`  | Número de bits en un byte                          |
| `CHAR_MIN`  | Valor mínimo de `char`                             |
| `CHAR_MAX`  | Valor máximo de `char`                             |
| `SHRT_MIN`  | Valor mínimo de `short`                            |
| `SHRT_MAX`  | Valor máximo de `short`                            |
|  `INT_MIN`  | Valor mínimo de `int`                              |
|  `INT_MAX`  | Valor máximo de `int`                              |
| `LONG_MIN`  | Valor mínimo de `long`                             |
| `LONG_MAX`  | Valor máximo de `long`                             |
| `UCHAR_MAX` | Valor máximo de `unsigned char`                    |
| `USHRT_MAX` | Valor máximo de `unsigned short`                   |
| `UINT_MAX`  | Valor máximo de `unsigned int`                     |
| `ULONG_MAX` | Valor máximo de `unsigned long`                    |
|  `FLT_MIN`  | Valor mínimo positivo normalizado de `float`       |
|  `FLT_MAX`  | Valor máximo finito de `float`                     |
|  `DBL_MIN`  | Valor mínimo positivo normalizado de `double`      |
|  `DBL_MAX`  | Valor máximo finito de `double`                    |
| `LDBL_MIN`  | Valor mínimo positivo normalizado de `long double` |
| `LDBL_MAX`  | Valor máximo finito de `long double`               |

### `<math.h>`

Funciones matemáticas comunes.

```c
double exp( double arg );
```

Retorna $e^\text{arg}$. Retorna `+HUGE_VAL` si ocurre overflow.

---

```c
double log( double arg );
double log10( double arg );
```

Retorna $\ln (\text{arg})$ y $\log_{10} (\text{arg})$ respectivamente. Retorna `-HUGE_VAL` si es muy negativo y `NaN` si `arg` está fuera del dominio.

---

```c
double pow( double base, double exponent );
```

Retorna $\text{base}^\text{exponent}$. Retorna `±HUGE_VAL` si ocurre overflow.

---

```c
double sqrt( double arg );
```

Retorna $\sqrt{\text{arg}}$. Retorna `NaN` si `arg` está fuera del dominio.

---

```c
double sin( double arg );
double cos( double arg );
double tan( double arg );
double asin( double arg );
double acos( double arg );
double atan( double arg );
double atan2( double y, double x );
double sinh( double arg );
double cosh( double arg );
double tanh( double arg );
double asinh( double arg );
double acosh( double arg );
double atanh( double arg );
```

Funciones trigonométricas. Retorna `NaN` si `arg` está fuera del respectivo dominio.

`atan2` calcula $\arctan(\frac{y}{x})$.

Las funciones hiperbólicas retornan `±HUGE_VAL` si ocurre overflow.

---

```c
double ceil( double arg );
double floor( double arg );
```

Funciones de redondeo. Retornan $\lceil \text{arg} \rceil$ y $\lfloor \text{arg} \rfloor$ respectivamente.

### `<stdio.h>`

Funciones para utilizar una entrada/salida genérica.

```c
typedef /* unspecified */ FILE;
```

Denota un _stream_ o transmisión. Puede ser un literal archivo, `stdin`, y más.

---

```c
#define stdin  /* implementation-defined */
#define stdout /* implementation-defined */
#define stderr /* implementation-defined */
```

Transimsiones de texto predefinidas. Están asociadas al _standard input_, al _standard output_ y al _standard error_ respectivamente.

---

```c
FILE *fopen( const char *filename, const char *mode );
```

Abre un archivo en la dirección `filename` relativa al ejecutable con el modo `mode`. Retorna un puntero a `FILE` si se logró abrir y `NULL` de lo contrario.

Los modos son

|        | Nombre            | Explicación                            | Si el archivo existe   | Si el archivo no existe |
| :----- | :---------------- | :------------------------------------- | :--------------------- | :---------------------- |
| `"r"`  | _read_            | abre un archivo para lectura           | lee desde el inicio    | error                   |
| `"w"`  | _write_           | crea un archivo para escritura         | lo borra               | lo crea                 |
| `"a"`  | _append_          | adjuntar a un archivo                  | escribe desde el final | lo crea                 |
| `"r+"` | _read extended_   | abre un archivo para lectura/escritura | lee desde el inicio    | error                   |
| `"w+"` | _write extended_  | crea un archivo para lectura/escritura | lo borra               | lo crea                 |
| `"a+"` | _append extended_ | abre un archivo para lectura/escritura | escribe desde el final | lo crea                 |

Estos modos abren el archivo para lectura/escritura de texto. Para abrir un archivo en modo binario se utiliza `"b"`.

---

```c
int fclose( FILE *stream );
```

Cierra el archivo. Retorna `0` si lo logró y `EOF` de lo contrario.

---

```c
size_t fread( void *buffer, size_t size, size_t count, FILE *stream );
size_t fwrite( const void *buffer, size_t size, size_t count, FILE *stream );
```

Lee y escribe (respectivamente) de un archivo binario.

- `buffer` es un puntero a un arreglo de elementos,
- `size` es la longitud del elemento en bytes,
- `count` es la cantidad de elementos a leer/escribir,
- `stream` es el archivo en cuestión.

`fread` lee el archivo y guarda el resultado en el arreglo. Retorna la cantidad de elementos que logró leer (que puede ser menor a `count`). Modifica en indicador `eof`.

`fwrite` lee el arreglo y guarda los elementos en el archivo. Retorna la cantidad de elementos que logró escribir (que puede ser menor a `count`).

---

```c
int fgetc( FILE *stream );
int getchar(void);
```

Lee el siguiente carácter del archivo y lo convierte en `int` positivo. Retorna `EOF` si ocurre un error. Modifica en indicador `eof`.

`getchar()` es equivalente a hacer `fgetc(stdin)`.

---

```c
char *fgets( char *str, int count, FILE *stream );
```

Lee hasta `count - 1` caracteres del archivo y los guarda en el string `str`. La lectura se detiene al encontrar un salto de línea `\n` (el cual se guardará en `str`) o hasta llegar al fin del archivo.

Retorna `str` y `NULL` si ocurrió un error. Modifica en indicador `eof`.

---

```c
int fputc( int ch, FILE *stream );
int putchar( int ch );
```

Escribe el carácter `ch`  en el archivo. Retorna `EOF` si ocurre un error.

`putchar(ch)` es equivalente a hacer `fputc(ch, stdout)`.

---

```c
int fputs( const char *str, FILE *stream );
```

Escribe cada carácter del string en el archivo. Retorna `EOR` si ocurrió un error.

---

```c
int scanf( const char *format, ... );
int sscanf( const char *buffer, const char *format, ... );
int fscanf( FILE *stream, const char *format, ... );
```

Leen texto de manera variable según un formato.

- `fscanf` lo lee en un archivo,
- `sscanf` lo lee en un string,
- y `scanf(format, ...)` es equivalente a `fscanf(stdin, format, ...)`.

Retornan la cantidad de argumentos correctamente asignados (que puede ser cero en caso de error) o `EOF`. Modifica en indicador `eof`.

El string `format` consiste de un texto leído con máscaras opcionales. El texto de `format` será leído carácter a carácter y causará que la función falle si el siguiente carácter del archivo no es idéntico.

Una expeción importante son los blancos (`" "`, `"\n"`, `"\t\t"`, etc). Cada espacio consumirá todos los blancos consecutivos de la entrada (determinados por `isspace`). Nótese que no hay diferencia entre escribir `" "`, `"\n"` ni ningún otro blanco válido.

Las máscaras de lectura
- comienzan con `%`;
- (opcional) `*` lee el formato especificado pero no lo guarda;
- (opcional) un entero mayor a cero que especifica la longitud máxima del resultado y, por ende, la longitud máxima de lecuta para esa máscara;
- (opcional) un modificador de longitud de la entrada que marca, por ejemplo, la diferencia entre un entero `d`, _short_ `hd` y _long_ `dl`;
- y el especificador de formato.

El especificador puede ser...

|             Esp.             | Explicación                                                                            |        `h`        |     (nada)      |       `l`        |      `L`       |
| :--------------------------: | :------------------------------------------------------------------------------------- | :---------------: | :-------------: | :--------------: | :------------: |
|             `%`              | lee un literal `%`                                                                     |        --         |       --        |        --        |       --       |
|             `c`              | lee un carácter (o varios si una longitud es especificada)                             |        --         |     `char*`     |    `wchar_t*`    |       --       |
|             `s`              | lee un string hasta el primer blanco (incluso con longitud especificada)               |        --         |     `char*`     |    `wchar_t*`    |       --       |
|           `[set]`            | lee un carácter si es especificado en `set` (o varios si una longitud es especificada) |        --         |     `char*`     |    `wchar_t*`    |       --       |
|             `i`              | lee un entero con signo                                                                |     `short*`      |     `int*`      |     `long*`      |       --       |
|             `d`              | lee un entero con signo (decimal)                                                      |     `short*`      |     `int*`      |     `long*`      |       --       |
|             `u`              | lee un entero sin signo (decimal)                                                      | `unsigned short*` | `unsigned int*` | `unsigned long*` |       --       |
|             `o`              | lee un entero sin signo (octal)                                                        | `unsigned short*` | `unsigned int*` | `unsigned long*` |       --       |
|           `x` `X`            | lee un entero sin signo (hexadecimal)                                                  | `unsigned short*` | `unsigned int*` | `unsigned long*` |       --       |
|             `n`              | retonra la cantidad de caracteres leídos hasta el momento                              |     `short*`      |     `int*`      |     `long*`      |       --       |
| `f` `F` `e` `E` `a`  `g` `G` | lee un nro. de punto flotante                                                          |        --         |    `double*`    |        --        | `long double*` |
|             `p`              | lee la direcciónn de un puntero                                                        |        --         |    `void**`     |        --        |       --       |

La diferencia entre las versiones "minúsculas" y "mayúsculas" (como `x` y `X`) es que leerá solo minúsculas o mayúsculas respectivamente (por ejemplo, `12ab5` y `12AB5`).

Para especificar caracteres en `[set]`, los mismos se escriben de corrido. Por ejemplo, para leer los caracteres `0`, `1` y `2`, se escribe `[012]`. Si el conjunto son varios caracteres seguidos según su representación ASCII, se puede escribir el rango `[0-9]` (todos los caracteres del `0` hasta el `9`). Para leer cualquier carácter _excepto_ los especificados, se agrega un `^` al inicio. Por ejemplo, `[^A-Z]` leerá cualquier carácter que no sea una mayúscula.

---

```c
int printf( const char *format, ... );
int fprintf( FILE *stream, const char *format, ... );
int sprintf( char *buffer, const char *format, ... );
```

Escriben texto de manera variable según un formato.

- `fprintf` lo escribe en un archivo,
- `sprintf` lo escribe en un string,
- y `printf(format, ...)` es equivalente a `fprintf(stdout, format, ...)`.

Retornan la cantidad de caracteres que logró escribir, o un número negativo si ocurrió un error.

El string `format` consiste de un texto a ser escrito con máscaras opcionales. Estas máscaras
- comienzan con `%`;
- (opcional) tienen modificadores:
  - `-` justifica el resultado a la izquierda,
  - `+` siempre muestra el signo del resultado,
  - ` ` (espacio) escribe un espacio si el resultado _no_ comienza con un signo,
  - `#` altera la forma de la conversión (ver tabla),
  - `0`, para enteros y puntos flotantes, agrega ceros a la izquierda en vez agregar espacios cuando una longitud mínima es especificada;
- (opcional) un entero o `*` que especifica la longitud mínima del resultado, la cual se alcanzará agregando espacios o `0` si el modificador `0` es especificado;
- (opcional) `.` seguido de un entero o `*` especifica la precisión de la conversión para punto flotante;
- (opcional) un modificador de longitud de la entrada que marca, por ejemplo, la diferencia entre un entero `d`, _short_ `hd` y _long_ `dl`;
- y el especificador de formato.

El especificador puede ser...

|  Esp.   | Explicación                                                                  |       `h`        |     (nada)     |       `l`       |      `L`      |
| :-----: | :--------------------------------------------------------------------------- | :--------------: | :------------: | :-------------: | :-----------: |
|   `%`   | escribe un literal `%`                                                       |        --        |       --       |       --        |      --       |
|   `c`   | escribe un carácter                                                          |        --        |     `int`      |    `wint_t`     |      --       |
|   `s`   | escribe un string                                                            |        --        |    `char*`     |   `wchar_t*`    |      --       |
| `d` `i` | escribe un entero con signo                                                  |     `short`      |     `int`      |     `long`      |      --       |
|   `u`   | escribe un entero sin signo (decimal)                                        | `unsigned short` | `unsigned int` | `unsigned long` |      --       |
|   `o`   | escribe un entero sin signo (octal)                                          | `unsigned short` | `unsigned int` | `unsigned long` |      --       |
| `x` `X` | escribe un entero sin signo (hexadecimal)                                    | `unsigned short` | `unsigned int` | `unsigned long` |      --       |
| `f` `F` | escribe un nro. de punto flotante (decimal)                                  |        --        |    `double`    |       --        | `long double` |
| `e` `E` | escribe un nro. de punto flotante (exponencial)                              |        --        |    `double`    |       --        | `long double` |
|   `a`   | escribe un nro. de punto flotante (exponencial hexadecimal)                  |        --        |    `double`    |       --        | `long double` |
| `g` `G` | escribe un nro. de punto flotante (decimal o exponencial según la presición) |        --        |    `double`    |       --        | `long double` |
|   `n`   | retonra la cantidad de caracteres escritos hasta el momento                  |     `short*`     |     `int*`     |     `long*`     |      --       |
|   `p`   | escribe la dirección de un puntero                                           |        --        |    `void*`     |       --        |      --       |

La diferencia entre las versiones "minúsculas" y "mayúsculas" (como `f` y `F`) es que el resultado querdará en minúsculas o mayúsculas respectivamente (por ejemplo, `infinity` y `INFINITY`).

---

```c
long ftell( FILE *stream );
```

Retorna la posición en el archivo o `-1L` si ocurrió un error.

---

```c
int fseek( FILE *stream, long offset, int origin );
void rewind( FILE *stream );

#define SEEK_SET     /*unspecified*/
#define SEEK_CUR     /*unspecified*/
#define SEEK_END     /*unspecified*/
```

Cambia la posición en el archivo. Se mueve según un `offset` desde un `origin`. Este último puede ser
- `SEEK_SET`, el inicio del archivo;
- `SEEK_CUR`, la posición actual;
- `SEEK_END`, el final del archivo.

`rewind` es equivalente `fseek(stream, 0, SEEK_SET)` y borra el indicador `eof`.

Retorna `0` si se movió correctamente y cualquier otro número de lo contrario.

---

```c
int feof( FILE *stream )
```

Retorna un valor distinto de cero si se alcanzó el fin del archivo, y `0` de lo contrario.

Nótese el marcador de _eof_ se activa cuando otra función intenta leer la marca de fin de archivo. Por ejemplo, si `fgetc` lee el último byte, `feof` retora `0`. Si se ejecuta `fgetc` de nuevo, este retornará `EOF` y `feof` retornará `!=0`.

### `<stdlib.h>`

Utilidades generales.

```c
void *malloc( size_t size );
void *calloc( size_t num, size_t size );
void *realloc( void *ptr, size_t new_size );
void free( void *ptr );
```

Funciones de manejo de memoria.

`malloc` reserva `size` bytes, retornando un puntero a la nueva dirección o `NULL` si no se pudo reservar el espacio.

`calloc` es equivalente a llamar a `malloc(num*size)` más poner la memoria reservada en `0`.

`realloc` modifica el tamaño de un espacio de memoria previamente reservado con `malloc`, `calloc` o `realloc`; ya sea alterando el espacio asignado o reservando un nuevo espacio, copiando los contendios y liberando el espacio anterior. Si `prt == NULL`, es equivalente a `malloc`. Retorna el nuevo puntero o `NULL` si ocurrió un error.

`free` libera la memoria reservada por las funciones anteriores.

---

```c
int rand();
void srand( unsigned seed );
#define RAND_MAX /*implementation defined*/
```

Números pseudoaleatorios.

`rand` retorna un número aleatorio entre `0` y `RAND_MAX` inclusive. `rand` utiliza un algoritmo basado en semillas. Por defecto, esta es `1`, pero se puede cambiar globalmente con `srand`.

---

```c
double atof( const char* str );
int atoi( const char *str );
long atol( const char *str );
```

Convierte un string en un número. Retorna el número o `0` (o `0.0`) si no se logró convertir.

---

```c
void qsort( void *ptr, size_t count, size_t size, int (*comp)(const void *a, const void *b) );
```

_Quicksort_.

Ordena un arreglo `ptr` de `count` elementos de `size` bytes cada uno en orden ascendente según `comp`.

`comp` es una función que recibe dos elementos `a`, `b` y retorna
- `<0` si `a` es _menor_ que `b`,
- `=0` si `a` es _igual_ que `b`,
- `>0` si `a` es _mayor_ que `b`.

---

```c
void* bsearch( const void *key, const void *ptr, size_t count, size_t size, int (*comp)(const void*a, const void*a) );
```

_Binary search_.

Encuentra un elemento `*key` en un arreglo `ptr` de `count` elementos de `size` bytes cada uno. El arreglo debe estar previamente ordenado según `comp` en orden ascendente.

`comp` es una función que recibe dos elementos `a`, `b` y retorna
- `<0` si `a` es _menor_ que `b`,
- `=0` si `a` es _igual_ que `b`,
- `>0` si `a` es _mayor_ que `b`.

Retorna un puntero a un elemento del arreglo que es _igual_ a `*key` o `NULL` si no se encontró ninguno.

### `<string.h>`

Strings terminados en null (`\0`).

```c
char *strcpy( char *dest, const char *src );
char *strncpy( char *dest, const char *src, size_t count );
```

Copia el contenido de `src` en `dest` (`\0` inclusive). `strncpy` permite copiar hasta el `\0` o hasta `count` caracteres (sin `\0`).

Retorna `dest`.

---

```c
char *strcat( char *dest, const char *src );
char *strncat( char *dest, const char *src, size_t count );
```

Adjunta el contenido de `src` en `dest` (`\0` inclusive). `strncat` permite copiar hasta el `\0` o hasta `count` caracteres (con `\0`).

Retorna `dest`.

---

```c
size_t strlen( const char *str );
```

Retorna la longitud de `str` (sin incluir `\0`).

---

```c
int strcmp( const char *lhs, const char *rhs );
int strncmp( const char *lhs, const char *rhs, size_t count );
```

Compara `lhs` con `rhs` lexicográficamente. Si
- retorna `<0`, `lhs` precede a `rhs`;
- retorna `0`, `lhs` es idéntico a `rhs`;
- retorna `>0`, `lhs` le sigue a `rhs`.

`strncmp` permite comparar hasta `count` caracteres.

### `<time.h>`

Fecha y hora.

```c
time_t time( time_t *arg );
```

Returna la fecha actual o `(time_t)(-1)` si ocurrió un error. Si `arg != NULL`, también se guardará en ese puntero.

---

```c
double difftime( time_t time_end, time_t time_beg );
```

Returna la diferencia `time_end - time_beg` en segundos.

## Precedencia de operadores

Operadores en orden decreciente de precedencia.

| Operador | Descripción                                        |    Asociatividad    |
| :------: | :------------------------------------------------- | :-----------------: |
|   `()`   | paréntesis                                         | izquierda a derecha |
|   `[]`   | subíndice de arreglo                               |          "          |
|   `.`    | selección de miembros mediante un objeto           |          "          |
|   `->`   | subíndice de miembros mediante un apuntador        |          "          |
|   `++`   | operador unario de preincremento                   | derecha a izquierda |
|   `--`   | operador unario de predecremento                   |          "          |
|   `+`    | suma unaria                                        |          "          |
|   `-`    | resta unaria                                       |          "          |
|   `!`    | negación lógica unaria                             |          "          |
|   `~`    | complemento unarioa a nivel de bits                |          "          |
| `(type)` | conversión de tipo                                 |          "          |
|   `*`    | desreferencia                                      |          "          |
|   `&`    | dirección                                          |          "          |
| `sizeof` | determina un tamaño en bytes                       |          "          |
|   `*`    | multiplicación                                     | izquierda a derecha |
|   `/`    | división                                           |          "          |
|   `%`    | módulo                                             |          "          |
|   `+`    | suma                                               |          "          |
|   `-`    | resta                                              |          "          |
|   `<<`   | desplazamiento a la izquierda a nivel de bits      |          "          |
|   `>>`   | desplazamiento a la derecha a nivel de bits        |          "          |
|   `<`    | menor que relacional                               |          "          |
|   `<=`   | menor o igual que relacional                       |          "          |
|   `>`    | mayor que relacional                               |          "          |
|   `>=`   | mayor o igual que relacional                       |          "          |
|   `==`   | igual que relacional                               |          "          |
|   `!=`   | no es igual que                                    |          "          |
|   `&`    | AND a nivel de bits                                |          "          |
|   `^`    | XOR a nivel de bits                                |          "          |
|   `\|`   | OR a nivel de bits                                 |          "          |
|   `&&`   | AND lógico                                         |          "          |
|  `\|\|`  | OR lógico                                          |          "          |
|   `?:`   | condicional ternario                               | derecha a izquierda |
|   `=`    | asignación                                         |          "          |
|   `+=`   | asignación de suma                                 |          "          |
|   `-=`   | asignación de resta                                |          "          |
|   `*=`   | asignación de multiplicación                       |          "          |
|   `/=`   | asignación de división                             |          "          |
|   `%=`   | asignación de módulo                               |          "          |
|   `&=`   | asignación de AND a nivel de bits                  |          "          |
|   `^=`   | asignación de XOR a nivel de bits                  |          "          |
|  `\|=`   | asignación de OR a nivel de bits                   |          "          |
|  `<<=`   | asignación de desp. a la izquierda a nivel de bits |          "          |
|  `>>=`   | asignación de desp. a la derecha a nivel de bits   |          "          |
|   `,`    | coma                                               | izquierda a derecha |
