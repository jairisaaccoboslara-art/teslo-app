import * as bcrypt from 'bcrypt';

interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'hombre'|'mujer'|'niño'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedUser {
    email:    string;
    fullName: string;
    password: string;
    roles:     string[];
}


interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'test1@google.com',
            fullName: 'Test One',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['admin']
        },
        {
            email: 'test2@google.com',
            fullName: 'Test Two',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['user','super']
        }
    ],

    products: [
  {
    description: "Presentamos la colección Tesla Chill. La sudadera de cuello redondo Chill para hombre cuenta con un exterior premium y resistente y un interior de suave tejido polar para mayor comodidad en cualquier época del año. La sudadera luce un sutil logotipo de la T de poliuretano termoplástico en el pecho y la marca Tesla debajo del cuello. Está confeccionada con 60 % algodón y 40 % poliéster reciclado.",
    images: [
      '1740176-00-A_0_2000.jpg',
      '1740176-00-A_1.jpg',
    ],
    stock: 7,
    price: 75000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "sudadera_de_cuello_redondo_chill_para_hombre",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera de cuello redondo Chill para hombre",
    gender: 'hombre'
  },
  {
    description: "La chaqueta acolchada tipo camisa para hombre presenta un diseño acolchado con ajuste único que brinda abrigo y movilidad en climas fríos. Con una estética urbana y moderna, la chaqueta incorpora discretos logotipos de Tesla en silicona inyectada debajo del cuello trasero y en la manga derecha, además de tiradores de cierre metálicos mate personalizados. Fabricada con 87 % nailon y 13 % poliuretano.",
    images: [
      '1740507-00-A_0_2000.jpg',
      '1740507-00-A_1.jpg',
    ],
    stock: 5,
    price: 200000,
    sizes: ['XS','S','M','XL','XXL'],
    slug: "chaqueta_acolchada_tipo_camisa_para_hombre",
    type: 'hoodies',
    tags: ['chaqueta', 'acolchada'],
    title: "Chaqueta acolchada tipo camisa para hombre",
    gender: 'hombre'
  },
  {
    description: "Presentamos la colección Tesla Raven. La chaqueta bomber ligera con cierre para hombre Raven cuenta con una silueta moderna y premium, fabricada con una mezcla sostenible de bambú y algodón para mayor versatilidad en cualquier temporada. Incluye discretos logotipos de Tesla en poliuretano termoplástico en el pecho izquierdo y debajo del cuello trasero, un bolsillo oculto en el pecho con cierre personalizado y un interior de felpa francesa. Fabricada con 70 % bambú y 30 % algodón.",
    images: [
      '1740250-00-A_0_2000.jpg',
      '1740250-00-A_1.jpg'
    ],
    stock: 10,
    price: 130000,
    sizes: ['S','M','L','XL','XXL'],
    slug: "chaqueta_bomber_ligera_raven_para_hombre",
    type: 'hoodies',
    tags: ['chaqueta', 'bomber'],
    title: "Chaqueta bomber ligera con cierre Raven para hombre",
    gender: 'hombre'
  },
  {
    description: "Presentamos la colección Tesla Turbine. Diseñada para estilo, comodidad y uso diario, la camiseta de manga larga Turbine para hombre presenta un sutil logotipo T a base de agua en el pecho izquierdo y el nombre Tesla debajo del cuello trasero. El material liviano está teñido dos veces, creando un estilo suave y casual ideal para cualquier temporada. Fabricada con 50 % algodón y 50 % poliéster.",
    images: [
      '1740280-00-A_0_2000.jpg',
      '1740280-00-A_1.jpg',
    ],
    stock: 50,
    price: 45000,
    sizes: ['XS','S','M','L'],
    slug: "camiseta_turbine_manga_larga_para_hombre",
    type: 'shirts',
    tags: ['camiseta', 'manga_larga'],
    title: "Camiseta Turbine de manga larga para hombre",
    gender: 'hombre'
  },


{
  description: "Presentamos la colección Tesla Turbine. Diseñada para estilo, comodidad y uso diario, la camiseta Turbine de manga corta para hombre cuenta con un discreto logotipo Tesla a base de agua en el pecho y el logotipo T debajo del cuello trasero. El material liviano está teñido dos veces, creando un estilo suave y casual ideal para cualquier temporada. Fabricada con 50 % algodón y 50 % poliéster.",
  images: [
    '1741416-00-A_0_2000.jpg',
    '1741416-00-A_1.jpg',
  ],
  stock: 50,
  price: 40000,
  sizes: ['M','L','XL','XXL'],
  slug: "camiseta_turbine_manga_corta_para_hombre",
  type: 'shirts',
  tags: ['camiseta', 'manga_corta'],
  title: "Camiseta Turbine de manga corta para hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para comodidad, la camiseta Cybertruck Owl está hecha de 100% algodón y presenta nuestro icónico logotipo Cybertruck en la espalda.",
  images: [
    '7654393-00-A_2_2000.jpg',
    '7654393-00-A_3.jpg',
  ],
  stock: 0,
  price: 35000,
  sizes: ['M','L','XL','XXL'],
  slug: "camiseta_cybertruck_owl_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Cybertruck Owl para hombre",
  gender: 'hombre'
},
{
  description: "Inspirada en nuestro sistema integrado de energía solar y almacenamiento para el hogar, la camiseta Tesla Solar Roof promueve la energía limpia y sostenible dondequiera que vayas. Diseñada para ajuste, comodidad y estilo, la camiseta presenta una vista aérea de nuestro diseño Solar Roof sin fisuras en el frente con nuestro logotipo T característico encima de 'Solar Roof' en la espalda. Hecha de 100% algodón peruano.",
  images: [
    '1703767-00-A_0_2000.jpg',
    '1703767-00-A_1.jpg',
  ],
  stock: 15,
  price: 35000,
  sizes: ['S','M','L','XL'],
  slug: "camiseta_solar_roof_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Solar Roof para hombre",
  gender: 'hombre'
},
{
  description: "Inspirada en el recurso más ilimitado del mundo, la camiseta Let the Sun Shine destaca nuestro sistema integrado de energía solar y almacenamiento para el hogar. Diseñada para ajuste, comodidad y estilo, la camiseta presenta un gráfico de atardecer junto con la marca Tesla en el frente y nuestro logotipo T característico impreso encima de 'Solar Roof' en la espalda. Hecha de 100% algodón peruano.",
  images: [
    '1700280-00-A_0_2000.jpg',
    '1700280-00-A_1.jpg',
  ],
  stock: 17,
  price: 35000,
  sizes: ['XS','S','XL','XXL'],
  slug: "camiseta_deja_que_el_sol_brille_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Deja que el Sol Brille para hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para ajuste, comodidad y estilo, la camiseta 3D Large Wordmark para hombre está hecha de 100% algodón peruano con una marca Tesla impresa en silicona 3D en el pecho.",
  images: [
    '8764734-00-A_0_2000.jpg',
    '8764734-00-A_1.jpg',
  ],
  stock: 12,
  price: 35000,
  sizes: ['XS','S','M'],
  slug: "camiseta_3d_marca_grande_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta 3D Marca Grande para hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para ajuste, comodidad y estilo, la camiseta Tesla T Logo está hecha de 100% algodón peruano y presenta un logotipo T impreso en silicona en el pecho izquierdo.",
  images: [
    '7652426-00-A_0_2000.jpg',
    '7652426-00-A_1.jpg',
  ],
  stock: 5,
  price: 35000,
  sizes: ['XS','S'],
  slug: "camiseta_logotipo_t_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Logotipo T para hombre",
  gender: 'hombre'
},

        {
  description: "Diseñada para comodidad y estilo en cualquier talla, la camiseta Tesla Small Wordmark está hecha de 100% algodón peruano y presenta una marca impresa en silicona 3D en el pecho izquierdo.",
  images: [
    '8528839-00-A_0_2000.jpg',
    '8528839-00-A_2.jpg',
  ],
  stock: 2,
  price: 35000,
  sizes: ['XS','S','M'],
  slug: "camiseta_3d_marca_pequena_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta 3D Marca Pequeña para Hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para celebrar el increíble modo de rendimiento de Tesla, la camiseta Plaid Mode ofrece un gran ajuste, comodidad y estilo. Hecha de 100% algodón, es lo más cercano a ir de pasajero en el Nürburgring.",
  images: [
    '1549268-00-A_0_2000.jpg',
    '1549268-00-A_2.jpg',
  ],
  stock: 82,
  price: 35000,
  sizes: ['XS','S','M','L','XL','XXL'],
  slug: "camiseta_modo_plaid_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Modo Plaid para Hombre",
  gender: 'hombre'
},
{
  description: "Inspirada en nuestra popular batería para el hogar, la camiseta Tesla Powerwall está hecha de 100% algodón y presenta la frase 'Energía Pura' bajo nuestro logotipo característico en la espalda. Diseñada para ajuste, comodidad y estilo, la camiseta exclusiva promueve la energía sostenible en cualquier entorno.",
  images: [
    '9877034-00-A_0_2000.jpg',
    '9877034-00-A_2.jpg',
  ],
  stock: 24,
  price: 35000,
  sizes: ['XL','XXL'],
  slug: "camiseta_powerwall_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Powerwall para Hombre",
  gender: 'hombre'
},
{
  description: "Inspirada en el Día de la Batería de Tesla y presentando la celda de batería sin pestañas revelada, la camiseta Battery Day celebra el futuro del almacenamiento de energía y la fabricación de celdas. Diseñada para ajuste, comodidad y estilo, la camiseta Battery Day está hecha de 100% algodón con una celda estilizada impresa en el pecho. Hecha en Perú.",
  images: [
    '1633802-00-A_0_2000.jpg',
    '1633802-00-A_2.jpg',
  ],
  stock: 5,
  price: 30000,
  sizes: ['XS','S','XXL'],
  slug: "camiseta_dia_de_la_bateria_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Día de la Batería para Hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para comodidad excepcional e inspirada en el evento de presentación del Cybertruck, la camiseta Cybertruck Bulletproof está hecha de 100% algodón y presenta nuestro icónico logotipo Cybertruck en la espalda.",
  images: [
    '7654399-00-A_0_2000.jpg',
    '7654399-00-A_1.jpg',
  ],
  stock: 150,
  price: 30000,
  sizes: ['M','L'],
  slug: "camiseta_cybertruck_a_prueba_de_balas_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Cybertruck a Prueba de Balas para Hombre",
  gender: 'hombre'
},
{
  description: "Inspirada en el gráfico de confirmación de pedido del Model Y, la edición limitada Haha Yes Tee está diseñada para comodidad y estilo. Hecha de 100% algodón peruano y presentando la marca Tesla en el pecho, la camiseta exclusiva conmemorará tu pedido durante años.",
  images: [
    '7652410-00-A_0.jpg',
    '7652410-00-A_1_2000.jpg',
  ],
  stock: 10,
  price: 35000,
  sizes: ['XS','S','M','L','XL','XXL'],
  slug: "camiseta_haha_yes_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Haha Yes para Hombre",
  gender: 'hombre'
},
{
  description: "Diseñada para ajuste, comodidad y estilo, la edición limitada S3XY Tee está hecha de 100% algodón con un logotipo “S3XY” impreso en silicona 3D en el pecho. Hecha en Perú. Disponible en negro.",
  images: [
    '8764600-00-A_0_2000.jpg',
    '8764600-00-A_2.jpg',
  ],
  stock: 34,
  price: 35000,
  sizes: ['XS','S','M','L'],
  slug: "camiseta_s3xy_para_hombre",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta S3XY para Hombre",
  gender: 'hombre'
},

        {
    description: "Diseñada para ajuste, comodidad y estilo, la camiseta 3D Wordmark Long Sleeve para hombre está hecha de 100% algodón y presenta un logotipo de marca discreto en el pecho izquierdo.",
    images: [
        '8764813-00-A_0_2000.jpg',
        '8764813-00-A_1.jpg',
    ],
    stock: 15,
    price: 40000,
    sizes: ['XL','XXL'],
    slug: "camiseta_3d_marca_manga_larga_para_hombre",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta 3D Marca Manga Larga para Hombre",
    gender: 'hombre'
},
{
    description: "Diseñada para ajuste, comodidad y estilo, la camiseta 3D T Logo Long Sleeve para hombre está hecha de 100% algodón y presenta un logotipo T discreto en el pecho izquierdo.",
    images: [
        '8529198-00-A_0_2000.jpg',
        '8529198-00-A_1.jpg',
    ],
    stock: 12,
    price: 40000,
    sizes: ['XS','XXL'],
    slug: "camiseta_3d_logotipo_t_manga_larga_para_hombre",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta 3D Logotipo T Manga Larga para Hombre",
    gender: 'hombre'
},
{
    description: "Presentamos la colección Tesla Raven. La sudadera ligera Raven para hombre tiene una silueta premium y relajada hecha de una mezcla sostenible de bambú y algodón. La sudadera presenta logotipos sutiles de poliuretano termoplástico Tesla en el pecho y en la manga con un interior de felpa francesa para versatilidad en cualquier temporada. Hecha de 70% bambú y 30% algodón.",
    images: [
        '1740245-00-A_0_2000.jpg',
        '1740245-00-A_1.jpg',
    ],
    stock: 10,
    price: 115000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "sudadera_ligera_raven_para_hombre",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera Ligera Raven para Hombre",
    gender: 'hombre'
},
{
    description: "Presentamos la colección Tesla Chill. La sudadera con capucha Chill tiene un exterior premium y pesado y un interior de felpa suave para comodidad en cualquier temporada. La sudadera unisex presenta logotipos sutiles de poliuretano termoplástico Tesla en el pecho y en la manga, una capucha de costura simple de doble capa y bolsillos con tiradores de cremallera mate personalizados. Hecha de 60% algodón y 40% poliéster reciclado.",
    images: [
        '1740051-00-A_0_2000.jpg',
        '1740051-00-A_1.jpg',
    ],
    stock: 10,
    price: 130000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "sudadera_con_capucha_chill",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera con Capucha Chill",
    gender: 'unisex'
},
{
    description: "Presentamos la colección Tesla Chill. La sudadera con cierre completo Chill para hombre tiene un exterior premium y pesado y un interior de felpa suave para comodidad en cualquier temporada. La sudadera presenta logotipos sutiles de poliuretano termoplástico Tesla en el pecho izquierdo y manga, una capucha de costura simple de doble capa y bolsillos con tiradores de cremallera mate personalizados. Hecha de 60% algodón y 40% poliéster reciclado.",
    images: [
        '1741111-00-A_0_2000.jpg',
        '1741111-00-A_1.jpg',
    ],
    stock: 100,
    price: 85000,
    sizes: ['XS','L','XL','XXL'],
    slug: "sudadera_con_cierre_completo_chill_para_hombre",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Sudadera con Cierre Completo Chill para Hombre",
    gender: 'hombre'
},
{
    description: "Presentamos la colección Tesla Chill. La sudadera con cierre cuarto Chill para hombre tiene un exterior premium y pesado y un interior de felpa suave para comodidad en cualquier temporada. La sudadera presenta logotipos sutiles de poliuretano termoplástico Tesla en el pecho izquierdo y debajo del cuello trasero, así como un tirador de cremallera personalizado. Hecha de 60% algodón y 40% poliéster reciclado.",
    images: [
        '1740140-00-A_0_2000.jpg',
        '1740140-00-A_1.jpg',
    ],
    stock: 7,
    price: 85000,
    sizes: ['XS','S','M'],
    slug: "sudadera_con_cierre_cuarto_chill_para_hombre_-_gris",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Sudadera con Cierre Cuarto Chill para Hombre - Gris",
    gender: 'hombre'
},
{
    description: "Presentamos la colección Tesla Chill. La sudadera con cierre cuarto Chill para hombre tiene un exterior premium y pesado y un interior de felpa suave para comodidad en cualquier temporada. La sudadera presenta logotipos sutiles de poliuretano termoplástico Tesla en el pecho izquierdo y debajo del cuello trasero, así como un tirador de cremallera personalizado. Hecha de 60% algodón y 40% poliéster reciclado.",
    images: [
        '1740145-00-A_2_2000.jpg',
        '1740145-00-A_1.jpg',
    ],
    stock: 15,
    price: 85000,
    sizes: ['XS','S','M','L'],
    slug: "sudadera_con_cierre_cuarto_chill_para_hombre_-_blanco",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Sudadera con Cierre Cuarto Chill para Hombre - Blanco",
    gender: 'hombre'
},

        {
    description: "La sudadera con capucha 3D Large Wordmark unisex presenta felpa suave y una capucha ajustable forrada de jersey para comodidad y cobertura. Diseñada en estilo unisex, la sudadera con capucha incluye una marca impresa en silicona 3D tono sobre tono en el pecho.",
    images: [
        '8529107-00-A_0_2000.jpg',
        '8529107-00-A_1.jpg',
    ],
    stock: 15,
    price: 70000,
    sizes: ['XS','S','XL','XXL'],
    slug: "sudadera_con_capucha_3d_marca_grande",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera con Capucha 3D Marca Grande",
    gender: 'unisex'
},
{
    description: "Al igual que el icónico logotipo de Tesla, la sudadera Graffiti Cybertruck es un clásico en proceso. Estilo unisex con felpa suave y capucha ajustable forrada de jersey para cobertura cómoda.",
    images: [
        '7654420-00-A_0_2000.jpg',
        '7654420-00-A_1_2000.jpg',
    ],
    stock: 13,
    price: 60000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "sudadera_graffiti_cybertruck",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera Graffiti Cybertruck",
    gender: 'unisex'
},
{
    description: "La gorra Logotipo T Relajada es una silueta clásica combinada con detalles modernos, presentando un logotipo T 3D y un cierre de hebilla metálica personalizado. El diseño ultrasuave es flexible y resistente a la abrasión, mientras que la banda interior incluye acolchado acolchado para comodidad extra y absorción de humedad. La visera está completamente hecha de botellas de plástico recicladas. 100% Algodón.",
    images: [
        '1657932-00-A_0_2000.jpg',
        '1657932-00-A_1.jpg',
    ],
    stock: 11,
    price: 30000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "gorra_logotipo_t_relajada",
    type: 'hats',
    tags: ['gorras'],
    title: "Gorra Logotipo T Relajada",
    gender: 'unisex'
},
{
    description: "El gorro térmico con puños es una silueta clásica combinada con detalles modernos, presentando un logotipo T 3D y un cierre de hebilla metálica personalizado. El diseño ultrasuave es flexible y resistente a la abrasión, mientras que la banda interior incluye acolchado acolchado para comodidad extra y absorción de humedad. La visera está completamente hecha de botellas de plástico recicladas. 100% Algodón.",
    images: [
        '1740417-00-A_0_2000.jpg',
        '1740417-00-A_1.jpg',
    ],
    stock: 13,
    price: 35000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "gorro_termico_con_punos",
    type: 'hats',
    tags: ['gorras'],
    title: "Gorro Térmico con Puños",
    gender: 'unisex'
},
{
    description: "La chaqueta puffer recortada para mujer presenta una silueta única recortada para el estilo perfecto en el camino durante la temporada acogedora por venir. La chaqueta puffer presenta logotipos de silicona inyectada Tesla sutiles debajo del cuello trasero y en la manga derecha, tiradores de cremallera metálicos mate personalizados y un cuello forrado de felpa suave. Hecha de 87% nailon y 13% poliuretano.",
    images: [
        '1740535-00-A_0_2000.jpg',
        '1740535-00-A_1.jpg',
    ],
    stock: 85,
    price: 225000,
    sizes: ['XS','S','M'],
    slug: "chaqueta_puffer_recortada_para_mujer",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Chaqueta Puffer Recortada para Mujer",
    gender: 'mujer'
},
{
    description: "Presentamos la colección Tesla Chill. La sudadera con cierre medio recortada Chill para mujer tiene un exterior de felpa suave y premium y silueta recortada para comodidad en el estilo de vida diario. La sudadera presenta un dobladillo elástico que se reúne en la cintura, logotipos sutiles de poliuretano termoplástico Tesla a lo largo de la capucha y en la manga, una capucha de costura simple de doble capa y un tirador de anillo de cremallera personalizado. Hecha de 60% algodón y 40% poliéster reciclado.",
    images: [
        '1740226-00-A_0_2000.jpg',
        '1740226-00-A_1.jpg',
    ],
    stock: 10,
    price: 130000,
    sizes: ['XS','S','M','XXL'],
    slug: "sudadera_con_cierre_medio_recortada_chill_para_mujer",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera con Cierre Medio Recortada Chill para Mujer",
    gender: 'mujer'
},

        {
    description: "Presentamos la colección Tesla Raven. La sudadera crew holgada Raven para mujer tiene una silueta premium y relajada hecha de una mezcla sostenible de bambú y algodón. La crew holgada presenta una marca Tesla de poliuretano termoplástico sutil en la manga izquierda y un interior de felpa francesa para un aspecto y sensación cómodos en cada temporada. Combínala con tus Joggers Raven o tu ajuste favorito en el camino. Hecha de 70% bambú y 30% algodón.",
    images: [
        '1740260-00-A_0_2000.jpg',
        '1740260-00-A_1.jpg',
    ],
    stock: 9,
    price: 110000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "sudadera_crew_holgada_raven_para_mujer",
    type: 'hoodies',
    tags: ['sudadera'],
    title: "Sudadera Crew Holgada Raven para Mujer",
    gender: 'mujer'
},
{
    description: "Presentamos la colección Tesla Turbine. Diseñada para estilo, comodidad y estilo de vida diario, la camiseta recortada de manga larga Turbine para mujer presenta una marca Tesla a base de agua sutil en el pecho y nuestro logotipo T debajo del cuello trasero. El material liviano está teñido dos veces, creando un estilo suave y casual con silueta recortada. Hecha de 50% algodón y 50% poliéster.",
    images: [
        '1740290-00-A_0_2000.jpg',
        '1740290-00-A_1.jpg',
    ],
    stock: 10,
    price: 45000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "camiseta_turbine_recortada_manga_larga_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Turbine Recortada de Manga Larga para Mujer",
    gender: 'mujer'
},
{
    description: "Presentamos la colección Tesla Turbine. Diseñada para estilo, comodidad y estilo de vida diario, la camiseta recortada de manga corta Turbine para mujer presenta una marca Tesla a base de agua sutil en el pecho y nuestro logotipo T debajo del cuello trasero. El material liviano está teñido dos veces, creando un estilo suave y casual con silueta recortada. Hecha de 50% algodón y 50% poliéster.",
    images: [
        '1741441-00-A_0_2000.jpg',
        '1741441-00-A_1.jpg',
    ],
    stock: 0,
    price: 40000,
    sizes: ['XS','S'],
    slug: "camiseta_turbine_recortada_manga_corta_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Turbine Recortada de Manga Corta para Mujer",
    gender: 'mujer'
},
{
    description: "Diseñada para estilo y comodidad, la ultrasuave camiseta Logotipo T de Manga Corta con Cuello Escotado para Mujer presenta un logotipo T tonal 3D impreso en silicona en el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.",
    images: [
        '8765090-00-A_0_2000.jpg',
        '8765090-00-A_1.jpg',
    ],
    stock: 30,
    price: 35000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "camiseta_logotipo_t_manga_corta_cuello_escotado_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Logotipo T de Manga Corta con Cuello Escotado para Mujer",
    gender: 'mujer'
},
{
    description: "Diseñada para estilo y comodidad, la ultrasuave camiseta Logotipo T de Manga Larga con Cuello Escotado para Mujer presenta un logotipo T tonal 3D impreso en silicona en el pecho izquierdo. Hecha de 50% algodón peruano y 50% viscosa peruana.",
    images: [
        '8765100-00-A_0_2000.jpg',
        '8765100-00-A_1.jpg',
    ],
    stock: 16,
    price: 40000,
    sizes: ['XS','S','L','XL','XXL'],
    slug: "camiseta_logotipo_t_manga_larga_cuello_escotado_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Logotipo T de Manga Larga con Cuello Escotado para Mujer",
    gender: 'mujer'
},
{
    description: "Diseñada para estilo y comodidad, la camiseta Marca Pequeña de Manga Corta con Cuello en V para Mujer presenta una marca tonal 3D impresa en silicona en el pecho izquierdo. Hecha de 100% algodón peruano.",
    images: [
        '8765120-00-A_0_2000.jpg',
        '8765120-00-A_1.jpg',
    ],
    stock: 18,
    price: 35000,
    sizes: ['XS','S','M','L','XL','XXL'],
    slug: "camiseta_marca_pequena_manga_corta_cuello_v_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Marca Pequeña de Manga Corta con Cuello en V para Mujer",
    gender: 'mujer'
},
{
    description: "Diseñada para estilo y comodidad, la camiseta Marca Grande de Manga Corta con Cuello Redondo para Mujer presenta una marca tonal 3D impresa en silicona en el pecho. Hecha de 100% pima peruano.",
    images: [
        '8765115-00-A_0_2000.jpg',
        '8765115-00-A_1.jpg',
    ],
    stock: 5,
    price: 35000,
    sizes: ['XL','XXL'],
    slug: "camiseta_marca_grande_manga_corta_cuello_redondo_para_mujer",
    type: 'shirts',
    tags: ['camiseta'],
    title: "Camiseta Marca Grande de Manga Corta con Cuello Redondo para Mujer",
    gender: 'mujer'
},

        {
            description: "Diseñada para celebrar el increíble modo de alto rendimiento de Tesla, la camiseta Plaid Mode ofrece un excelente ajuste, comodidad y estilo. Fabricada en algodón 100 %, es lo más parecido a viajar como copiloto en el Nürburgring.",
            images: [
    '1549275-00-A_0_2000.jpg',
    '1549275-00-A_1.jpg',
  ],
  stock: 16,
  price: 180000,
  sizes: ['S','M'],
  slug: "women_plaid_mode_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Plaid Mode para mujer",
  gender: 'mujer'
},
{
  description: "Inspirada en nuestra popular batería doméstica, la camiseta Tesla Powerwall está hecha de algodón 100 % y presenta la frase “Energía Pura” debajo de nuestro logotipo característico en la parte posterior. Diseñada para brindar ajuste, comodidad y estilo.",
  images: [
    '9877040-00-A_0_2000.jpg',
    '9877040-00-A_1.jpg',
  ],
  stock: 10,
  price: 220000,
  sizes: ['XS','S','M','L','XL','XXL'],
  slug: "women_powerwall_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Powerwall para mujer",
  gender: 'mujer'
},
{
  description: "La chaqueta corporativa para mujer presenta un diseño exclusivo con el logotipo “T” de Tesla impreso en silicona en el pecho izquierdo y un llamativo logotipo de Tesla en la espalda.",
  images: [
    '5645680-00-A_0_2000.jpg',
    '5645680-00-A_3.jpg',
  ],
  stock: 3,
  price: 350000,
  sizes: ['M','L','XL','XXL'],
  slug: "women_corp_jacket",
  type: 'shirts',
  tags: ['chaqueta'],
  title: "Chaqueta corporativa para mujer",
  gender: 'mujer'
},
{
  description: "Parte de la colección Tesla Raven, los joggers Raven para mujer ofrecen una silueta relajada de alta calidad, fabricados con una mezcla sostenible de bambú y algodón. Ideales para cualquier temporada.",
  images: [
    '1740270-00-A_0_2000.jpg',
    '1740270-00-A_1.jpg',
  ],
  stock: 162,
  price: 240000,
  sizes: ['XS','S','M','L','XL','XXL'],
  slug: "women_raven_joggers",
  type: 'shirts',
  tags: ['pantalón'],
  title: "Joggers Raven para mujer",
  gender: 'mujer'
},
{
  description: "Diseñada para brindar comodidad y estilo, la camiseta de manga larga Cybertruck Graffiti para niños cuenta con un diseño gráfico de Cybertruck en el pecho y el logotipo de Tesla en la manga izquierda.",
  images: [
    '1742694-00-A_1_2000.jpg',
    '1742694-00-A_3.jpg',
  ],
  stock: 10,
  price: 120000,
  sizes: ['XS','S','M'],
  slug: "kids_cybertruck_long_sleeve_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Cybertruck de manga larga para niños",
  gender: 'niño'
},
{
  description: "La camiseta Scribble T Logo para niños está confeccionada en algodón peruano 100 % y presenta un logotipo de Tesla dibujado a mano, ideal para jóvenes creativos.",
  images: [
    '8529312-00-A_0_2000.jpg',
    '8529312-00-A_1.jpg',
  ],
  stock: 0,
  price: 95000,
  sizes: ['XS','S','M'],
  slug: "kids_scribble_t_logo_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Scribble T Logo para niños",
  gender: 'niño'
},
{
  description: "La camiseta Cybertruck para niños presenta el icónico logotipo gráfico del Cybertruck y está fabricada en algodón peruano 100 % para máxima comodidad.",
  images: [
    '8529342-00-A_0_2000.jpg',
    '8529342-00-A_1.jpg',
  ],
  stock: 10,
  price: 100000,
  sizes: ['XS','S','M'],
  slug: "kids_cybertruck_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Cybertruck para niños",
  gender: 'niño'
},
{
  description: "La camiseta Racing Stripe para niños está hecha de algodón peruano 100 % y cuenta con una franja deportiva renovada y el logotipo de Tesla, perfecta para los pequeños amantes de la velocidad.",
  images: [
    '8529354-00-A_0_2000.jpg',
    '8529354-00-A_1.jpg',
  ],
  stock: 10,
  price: 110000,
  sizes: ['XS','S','M'],
  slug: "kids_racing_stripe_tee",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Racing Stripe para niños",
  gender: 'niño'
},

       {
  description: "Diseñada para brindar ajuste, comodidad y estilo, la camiseta con logotipo T 3D para niños está confeccionada en algodón peruano 100 % y cuenta con un logotipo T impreso en silicona en el pecho izquierdo.",
  images: [
    '7652465-00-A_0_2000.jpg',
    '7652465-00-A_1.jpg',
  ],
  stock: 10,
  price: 30,
  sizes: ['XS','S','M'],
  slug: "camiseta_logo_t_3d_ninos",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta Logo T 3D para niños",
  gender: 'niño'
},
{
  description: "La camiseta a cuadros está hecha de algodón peruano de fibra larga, libre de OGM. Perú es el único país del mundo donde el algodón se recoge a mano a gran escala. Esta tradición milenaria evita dañar la fibra durante la cosecha y elimina la necesidad de usar químicos, dando como resultado un algodón suave, resistente y brillante que se vuelve aún más cómodo con cada lavado.",
  images: [
    '100042307_0_2000.jpg',
    '100042307_alt_2000.jpg',
  ],
  stock: 10,
  price: 30,
  sizes: ['XS','S','M'],
  slug: "camiseta_cuadros_ninos",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Camiseta a cuadros para niños",
  gender: 'niño'
},
{
  description: "Para el futuro viajero espacial con gusto exigente, este body suave de algodón cuenta con cierre de broches en la parte inferior. Incluye etiquetado claro en caso de contacto con una nueva civilización espacial. Fabricado en algodón 100 % y hecho en Perú.",
  images: [
    '1473809-00-A_1_2000.jpg',
    '1473809-00-A_alt.jpg',
  ],
  stock: 16,
  price: 25,
  sizes: ['XS','S'],
  slug: "body_hecho_en_la_tierra_por_humanos",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Body Hecho en la Tierra por Humanos",
  gender: 'niño'
},
{
  description: "El body Scribble con logotipo T para niños está confeccionado en algodón peruano 100 % y presenta un logotipo T de Tesla dibujado a mano, ideal para pequeños artistas.",
  images: [
    '8529387-00-A_0_2000.jpg',
    '8529387-00-A_1.jpg',
  ],
  stock: 0,
  price: 30,
  sizes: ['XS','S'],
  slug: "body_logo_t_dibujado_ninos",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Body Logo T Dibujado para niños",
  gender: 'niño'
},
{
  description: "Demuestra tu compromiso con la energía sostenible con este divertido body para los más pequeños. Nota: no previene emisiones. Fabricado en algodón 100 % y hecho en Perú.",
  images: [
    '1473834-00-A_2_2000.jpg',
    '1473829-00-A_2_2000.jpg',
  ],
  stock: 10,
  price: 30,
  sizes: ['XS','S'],
  slug: "body_cero_emisiones_casi",
  type: 'shirts',
  tags: ['camiseta'],
  title: "Body Cero Emisiones (Casi)",
  gender: 'niño'
},
{
  description: "La chaqueta bomber Cyberquad para niños es ideal para las aventuras en el Cyberquad. Presenta una ilustración estilo graffiti del Cyberquad y el logotipo de Tesla. Incluye tres bolsillos con cremallera y detalles del logotipo T y la marca Tesla en las mangas. Fabricada con 60 % algodón y 40 % poliéster.",
  images: [
    '1742702-00-A_0_2000.jpg',
    '1742702-00-A_1.jpg',
  ],
  stock: 10,
  price: 65,
  sizes: ['XS','S','M'],
  slug: "chaqueta_bomber_cyberquad_ninos",
  type: 'shirts',
  tags: ['chaqueta'],
  title: "Chaqueta Bomber Cyberquad para niños",
  gender: 'niño'
},
{
  description: "Recorre el parque con estilo gracias a la chaqueta corporativa para niños. Inspirada en la chaqueta corporativa original de Tesla, ofrece el mismo diseño sobrio y materiales de alta calidad en una versión infantil.",
  images: [
    '1506211-00-A_0_2000.jpg',
    '1506211-00-A_1_2000.jpg',
  ],
  stock: 10,
  price: 30,
  sizes: ['XS','S','M'],
  slug: "chaqueta_corporativa_ninos",
  type: 'shirts',
  tags: ['chaqueta'],
  title: "Chaqueta Corporativa para niños",
  gender: 'niño'
},

    ]
}