-- Escrito en PostgreSQL

CREATE USER API WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    REPLICATION; -- ejecutar solo

alter user API with password 'RubberDuck'; -- ejecutar solo

CREATE DATABASE RubberService; -- ejecutar solo

-- Una vez creada la base de datos crear un SCRIPT dentro de ella y ejecutar:

create table public.clientes(
    id_cliente serial not null,
    nombre varchar(100) not null,
    correo varchar(50) not null,
    contraseña varchar(30) not null,
    PRIMARY KEY (id_cliente)
);

create table public.solicitudes(
    id_solicitud serial not null,
    categoria varchar(40) not null,
    fecha date not null default current_date,
    asunto varchar(50) not null,
    problema varchar(500) not null,
    cliente serial not null,
    archivo text,
    tecnico int,
    estado int default 0,
    primary key (id_solicitud),
    foreign   key   (cliente)   references   public.clientes(id_cliente) 
);                                                                                

create table public.tecnicos(
    id_tecnico serial not null,
    nombre varchar(100),
    correo varchar(50),
    contraseña varchar(30),
    calificacion int default 0,
    solicitudes_finalizadas int default 0,
    primary key (id_tecnico)
);

create table public.mensajes(
    id_mensaje serial not null,
    emisor int not null,
    texto varchar(500),
    solicitud int,
    hora timestamp default current_timestamp,
    primary key (id_mensaje),
    foreign   key   (solicitud)   references   public.solicitudes(id_solicitud)
);
                                          -- ejecutar solo

Insert into public.clientes(id_cliente,nombre,correo,contraseña) values(0,'nombre','correo@dominio.cl','contraseña'); 
Insert into public.tecnicos(id_tecnico,nombre,correo,contraseña,calificaion,solicitudes_finalizadas) values(0,'nombre','correo@dominio.cl','contraseña',0,0)  -- ejecutar solo