export interface Question { q: string; opts: string[]; correct: number; explain: string }

export const QUESTIONS: Question[] = [
  {
    q: '¿Por qué la máquina Enigma original era vulnerable matemáticamente a pesar de sus millones de combinaciones?',
    opts: ['Porque los rotores se trababan', 'Porque una letra nunca se cifraba como sí misma', 'Porque usaba electricidad estática', 'Porque los mensajes eran muy cortos'],
    correct: 1,
    explain: 'El reflector de Enigma garantizaba que una letra A nunca se cifrara como A. Esto fue un fallo criptográfico crucial que permitió a Alan Turing y su equipo descartar millones de combinaciones imposibles.',
  },
  {
    q: 'En AES-128, ¿cuál de estas operaciones matemáticas se encarga de lograr una "alta difusión" mezclando la información matricial?',
    opts: ['SubBytes', 'ShiftRows', 'MixColumns', 'AddRoundKey'],
    correct: 2,
    explain: 'MixColumns mezcla cada columna de la matriz utilizando matemáticas de Galois. Esto asegura que cambiar un solo bit en la entrada afecte a todos los bytes resultantes (Efecto Avalancha).',
  },
  {
    q: 'Si cifras una imagen con ECB (Electronic Codebook), ¿qué problema de seguridad vas a notar inmediatamente?',
    opts: ['El archivo se vuelve más pesado', 'La imagen pierde calidad', 'Se pueden ver los patrones originales de la imagen', 'El cifrado tarda demasiado'],
    correct: 2,
    explain: 'ECB cifra cada bloque idéntico de la misma forma (M₁=M₂ → C₁=C₂). Si cifras una imagen con grandes áreas del mismo color (como el pingüino), verás su silueta en el ciphertext.',
  },
  {
    q: 'En la criptografía RSA, la clave pública se genera multiplicando dos números (p × q). ¿Por qué un atacante no puede deducir la clave privada?',
    opts: ['Porque el resultado se guarda en la nube', 'Porque factorizar un número primo gigante es matemáticamente inviable', 'Porque los números se borran después', 'Porque se necesita conexión a internet'],
    correct: 1,
    explain: 'La seguridad de RSA radica en la "Factorización de Enteros". Multiplicar dos primos gigantes toma milisegundos, pero factorizar el resultado (volver atrás) le tomaría a las supercomputadoras miles de años.',
  },
  {
    q: 'En el algoritmo de Diffie-Hellman (la mezcla de colores), ¿qué representa el color final resultante que ambos comparten?',
    opts: ['La clave pública de Alice', 'El algoritmo de hashing', 'La clave simétrica compartida para cifrar los datos', 'La firma digital del mensaje'],
    correct: 2,
    explain: 'El objetivo de Diffie-Hellman no es cifrar mensajes, sino establecer un secreto matemático (color final) a través de un canal público inseguro. Ese secreto se usa luego como clave para cifrar con AES.',
  },
  {
    q: 'Al entrar a un sitio web seguro (HTTPS), ¿qué estrategia de cifrado se utiliza en la práctica hoy en día?',
    opts: ['Solo cifrado simétrico (AES)', 'Solo cifrado asimétrico (RSA)', 'Ninguno, usa hashing puro', 'Cifrado Híbrido (Asimétrico para la clave, Simétrico para los datos)'],
    correct: 3,
    explain: 'Se usa cifrado Asimétrico al principio porque resuelve el problema de compartir la clave de forma segura, pero luego se cambia a Simétrico (AES) porque es miles de veces más rápido para transmitir todos los datos.',
  },
]

export const OPT_COLORS = ['#60a5fa', '#34d399', '#f59e0b', '#a78bfa']
