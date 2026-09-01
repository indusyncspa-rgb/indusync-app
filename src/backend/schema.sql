-- Base de Datos INDUSYNC Enterprise v2026.4

-- 1. Tabla de Usuarios y Acceso Biométrico / RBAC
CREATE TABLE IF NOT EXISTS usuarios_mineros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    rol VARCHAR(50) NOT NULL, -- 'C-SUITE', 'OPERACIONES', 'HSEC', 'PROVEEDOR'
    mfa_habilitado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Licitaciones B2B Express
CREATE TABLE IF NOT EXISTS licitaciones_b2b (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    monto_estimado_usd NUMERIC(15, 2) NOT NULL,
    plazo_meses INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'ABIERTA', -- 'ABIERTA', 'EVALUANDO', 'ADJUDICADA'
    proveedor_adjudicado_id VARCHAR(100),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Marketplace B2B & Economía Circular
CREATE TABLE IF NOT EXISTS marketplace_excedentes (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- 'CHATARRA', 'MAQUINARIA', 'INSUMOS'
    valor_estimado_usd NUMERIC(12, 2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'DISPONIBLE', -- 'DISPONIBLE', 'EN_SUBASTA', 'VENDIDO'
    huella_co2_reducida_ton NUMERIC(10, 2) DEFAULT 0.00,
    fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Registro Audit Trail Ciberseguridad (NIST / IEC 62443)
CREATE TABLE IF NOT EXISTS logs_seguridad_ot (
    id SERIAL PRIMARY KEY,
    usuario_email VARCHAR(150),
    accion VARCHAR(100) NOT NULL,
    ip_origen VARCHAR(45),
    fecha_evento TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);