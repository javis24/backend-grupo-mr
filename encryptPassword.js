const bcrypt = require('bcrypt');

async function encryptPassword() {
    const plainPassword = '123456'; // La contraseña que quieres encriptar
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log(hashedPassword); // Imprime la contraseña encriptada
}

encryptPassword();
