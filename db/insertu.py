import sqlite3

def insertar_usuario(usuario, contraseña):
    conn = sqlite3.connect('usuariosweb.db')
    cursor = conn.cursor()
    
    # Insertar usuario en la tabla
    cursor.execute('''
        INSERT INTO usuarios (usuario, contraseña)
        VALUES (?, ?)
    ''', (usuario, contraseña))
    
    conn.commit()
    conn.close()

# Ejemplos de usuarios y contraseñas ficticias
usuarios_contraseñas = [
    ('usuario1', 'password1'),
    ('usuario2', 'password2'),
    ('usuario3', 'password3'),
    ('usuario4', 'password4'),
    ('usuario5', 'password5'),
    ('usuario6', 'password6'),
    ('usuario7', 'password7'),
    ('usuario8', 'password8'),
    ('usuario9', 'password9'),
    ('usuario10', 'password10')
]

# Insertar usuarios ficticios en la base de datos
for usuario, contraseña in usuarios_contraseñas:
    insertar_usuario(usuario, contraseña)

print("Usuarios insertados correctamente.")
