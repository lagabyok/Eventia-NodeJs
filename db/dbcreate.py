import sqlite3

# Conectar a la base de datos (se creará si no existe)
conn = sqlite3.connect('usuariosweb.db')

# Crear un cursor para ejecutar comandos SQL
cursor = conn.cursor()

# Crear la tabla de usuarios
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL,
        contraseña TEXT NOT NULL
    )
''')

# Guardar los cambios
conn.commit()

# Cerrar la conexión
conn.close()

print("Base de datos 'usuariosweb.db' creada exitosamente.")
