-- =========================================================
-- TABLA: tbusers
-- =========================================================
CREATE TABLE tbusers (

    "PK_user" SERIAL PRIMARY KEY, -- ID UNICO DEL USUARIO

    "FK_privilege" INT NOT NULL, -- ID DEL PRIVILEGIO/ROL DEL USUARIO

    "firstName" VARCHAR(255) NOT NULL, -- NOMBRES DEL USUARIO

    "lastName" VARCHAR(255) NOT NULL, -- APELLIDOS DEL USUARIO

    "phoneNumber" VARCHAR(50), -- NUMERO DE TELEFONO

    email VARCHAR(255) NOT NULL UNIQUE, -- CORREO ELECTRONICO

    password TEXT NOT NULL, -- CONTRASEÑA ENCRIPTADA

    status BOOLEAN DEFAULT TRUE, -- ESTADO DEL USUARIO (TRUE = ACTIVO)

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- FECHA DE CREACION

    "actionHistory" JSONB -- HISTORIAL DE ACCIONES EN FORMATO JSON

);

-- =========================================================
-- TABLA: tbmarketplacecategories
-- =========================================================
CREATE TABLE tbmarketplacecategories (

    "PK_category" SERIAL PRIMARY KEY, -- ID UNICO DE LA CATEGORIA

    category VARCHAR(255) NOT NULL UNIQUE, -- NOMBRE DE LA CATEGORIA

    description TEXT, -- DESCRIPCION DE LA CATEGORIA

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- FECHA DE CREACION

);

-- =========================================================
-- TABLA: tbentrepreneurships
-- =========================================================
CREATE TABLE tbentrepreneurships (

    "PK_entrepreneurship" SERIAL PRIMARY KEY, -- ID UNICO DEL EMPRENDIMIENTO

    "FK_user" INT NOT NULL, -- USUARIO DUEÑO DEL EMPRENDIMIENTO

    "FK_category" INT NOT NULL, -- CATEGORIA DEL EMPRENDIMIENTO

    "businessName" VARCHAR(255) NOT NULL, -- NOMBRE DEL EMPRENDIMIENTO

    description TEXT NOT NULL, -- DESCRIPCION GENERAL

    "locationType" VARCHAR(100), -- TIPO DE UBICACION (CASA | VIRTUAL | ENTREGA | FERIA | TIENDA)

    address TEXT, -- DIRECCION FISICA

    "googleMapsUrl" TEXT, -- LINK DE GOOGLE MAPS

    "businessHours" TEXT, -- HORARIOS DE ATENCION

    "sustainableActivities" TEXT, -- ACTIVIDADES SOSTENIBLES

    "reduceNonBiodegradable" BOOLEAN, -- REDUCE MATERIALES NO BIODEGRADABLES

    "solvesEnvironmentalProblem" BOOLEAN, -- AYUDA A RESOLVER PROBLEMAS AMBIENTALES

    "additionalInfo" TEXT, -- INFORMACION EXTRA

    "mainImage" TEXT, -- IMAGEN PRINCIPAL

    images JSONB, -- ARRAY DE IMAGENES EN JSON

    "catalogPdf" TEXT, -- URL DEL CATALOGO PDF

    "socialNetworks" JSONB, -- REDES SOCIALES EN JSON

    "isVirtual" BOOLEAN DEFAULT FALSE, -- SI EL EMPRENDIMIENTO ES VIRTUAL

    "isActive" BOOLEAN DEFAULT TRUE, -- ESTADO DEL EMPRENDIMIENTO

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- FECHA DE CREACION

    "updatedAt" TIMESTAMP, -- FECHA DE ACTUALIZACION

    "actionHistory" JSONB, -- HISTORIAL DE CAMBIOS

    CONSTRAINT fk_tbentrepreneurships_user
        FOREIGN KEY ("FK_user")
        REFERENCES tbusers("PK_user"), -- RELACION CON USUARIOS

    CONSTRAINT fk_tbentrepreneurships_category
        FOREIGN KEY ("FK_category")
        REFERENCES tbmarketplacecategories("PK_category") -- RELACION CON CATEGORIAS

);

-- =========================================================
-- TABLA: tbmarketplaceproducts
-- =========================================================
CREATE TABLE tbmarketplaceproducts (

    "PK_product" SERIAL PRIMARY KEY, -- ID UNICO DEL PRODUCTO

    "FK_entrepreneurship" INT NOT NULL, -- EMPRENDIMIENTO DEL PRODUCTO

    "productName" VARCHAR(255) NOT NULL, -- NOMBRE DEL PRODUCTO

    description TEXT, -- DESCRIPCION DEL PRODUCTO

    "costPrice" NUMERIC(10,2), -- COSTO REAL DEL PRODUCTO

    "salePrice" NUMERIC(10,2), -- PRECIO DE VENTA

    "discountPrice" NUMERIC(10,2), -- PRECIO EN OFERTA

    stock INT DEFAULT 0, -- CANTIDAD DISPONIBLE

    "mainImage" TEXT, -- IMAGEN PRINCIPAL

    images JSONB, -- ARRAY DE IMAGENES

    "isAvailable" BOOLEAN DEFAULT TRUE, -- DISPONIBILIDAD DEL PRODUCTO

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- FECHA DE CREACION

    "updatedAt" TIMESTAMP, -- FECHA DE ACTUALIZACION

    "actionHistory" JSONB, -- HISTORIAL DE CAMBIOS

    CONSTRAINT fk_tbmarketplaceproducts_entrepreneurship
        FOREIGN KEY ("FK_entrepreneurship")
        REFERENCES tbentrepreneurships("PK_entrepreneurship") -- RELACION CON EMPRENDIMIENTOS

);

-- =========================================================
-- TABLA: tbmarketplacesales
-- =========================================================
CREATE TABLE tbmarketplacesales (

    "PK_sale" SERIAL PRIMARY KEY, -- ID UNICO DE LA VENTA

    "FK_product" INT NOT NULL, -- PRODUCTO VENDIDO

    quantity INT NOT NULL, -- CANTIDAD VENDIDA

    "unitPrice" NUMERIC(10,2) NOT NULL, -- PRECIO UNITARIO DE VENTA

    subtotal NUMERIC(10,2) NOT NULL, -- TOTAL DE LA VENTA

    status VARCHAR(50) DEFAULT 'PAGADO', -- ESTADO DE LA VENTA

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- FECHA DE LA VENTA

    CONSTRAINT fk_tbmarketplacesales_product
        FOREIGN KEY ("FK_product")
        REFERENCES tbmarketplaceproducts("PK_product") -- RELACION CON PRODUCTOS

);

-- =========================================================
-- TABLA: tbmarketplace10rs
-- =========================================================
CREATE TABLE tbmarketplace10rs (

    "PK_10r" SERIAL PRIMARY KEY, -- ID UNICO DE LA REGLA 10R

    number INT NOT NULL UNIQUE, -- NUMERO DE LA R

    title VARCHAR(255) NOT NULL, -- TITULO DE LA R

    description TEXT, -- DESCRIPCION DE LA R

    question TEXT NOT NULL, -- PREGUNTA PARA EL EMPRENDEDOR

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- FECHA DE CREACION

);

-- =========================================================
-- TABLA: tbmarketplaceproduct10revaluations
-- =========================================================
CREATE TABLE tbmarketplaceproduct10revaluations (

    "PK_evaluation" SERIAL PRIMARY KEY, -- ID UNICO DE LA EVALUACION

    "FK_product" INT NOT NULL, -- PRODUCTO EVALUADO

    "FK_10r" INT NOT NULL, -- REGLA 10R EVALUADA

    "FK_user" INT NOT NULL, -- ADMINISTRADOR QUE EVALUO

    "entrepreneurResponse" TEXT NOT NULL, -- RESPUESTA DEL EMPRENDEDOR

    "evaluatorResponse" TEXT, -- RESPUESTA DEL EVALUADOR

    qualification INT NOT NULL, -- CALIFICACION NUMERICA

    "reviewStatus" VARCHAR(50) DEFAULT 'PENDIENTE', -- ESTADO DE REVISION

    observation TEXT, -- OBSERVACIONES

    "evaluatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- FECHA DE EVALUACION

    CONSTRAINT fk_tbmarketplaceproduct10revaluations_product
        FOREIGN KEY ("FK_product")
        REFERENCES tbmarketplaceproducts("PK_product"), -- RELACION CON PRODUCTOS

    CONSTRAINT fk_tbmarketplaceproduct10revaluations_10r
        FOREIGN KEY ("FK_10r")
        REFERENCES tbmarketplace10rs("PK_10r"), -- RELACION CON 10R

    CONSTRAINT fk_tbmarketplaceproduct10revaluations_user
        FOREIGN KEY ("FK_user")
        REFERENCES tbusers("PK_user"), -- RELACION CON USUARIOS

    CONSTRAINT uq_tbmarketplaceproduct10revaluations
        UNIQUE ("FK_product", "FK_10r") -- EVITA DUPLICADOS POR PRODUCTO Y 10R

);
