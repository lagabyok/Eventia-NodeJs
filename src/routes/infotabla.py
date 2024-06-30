import sqlite3
import os

# Ruta a la base de datos
db_path = r"./usuariosweb.db"

# Verificar que la base de datos existe
if not os.path.exists(db_path):
    print("La base de datos no se encuentra en la ruta especificada.")
else:
    # Conexión a la base de datos
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Listar todas las tablas en la base de datos
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tablas en la base de datos:")
    for table in tables:
        print(table[0])

    # Mostrar la estructura de la tabla usuarios
    print("\nEstructura de la tabla 'usuarios':")
    cursor.execute("PRAGMA table_info(usuarios);")
    usuarios_info = cursor.fetchall()
    for info in usuarios_info:
        print(info)

    # Mostrar datos de la tabla usuarios
    print("\nDatos de la tabla 'usuarios':")
    cursor.execute("SELECT id, usuario, contraseña FROM usuarios;")
    usuarios_data = cursor.fetchall()
    for row in usuarios_data:
        print(row)

    # Cerrar la conexión
    conn.close()
