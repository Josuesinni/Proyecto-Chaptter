import bcrypt


def hash_password(password: str) -> bytes:
    """
    Genera un hash seguro para la contraseña usando bcrypt.
    """
    print(password)
    if not isinstance(password, str) or not password:
        raise ValueError("La contraseña debe ser una cadena no vacía.")

    # Convertir a bytes
    password_bytes = password.encode('utf-8')

    salt = bcrypt.gensalt(rounds=12) 
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed

def verify_password(password: str, hashed: str) -> bool:
    """
    Verifica si la contraseña coincide con el hash almacenado.
    """
    if not isinstance(password, str) or not password:
        raise ValueError("La contraseña debe ser una cadena no vacía.")
    if not isinstance(hashed, (bytes, bytearray)):
        raise ValueError("El hash debe ser de tipo bytes.")

    password_bytes = password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed)