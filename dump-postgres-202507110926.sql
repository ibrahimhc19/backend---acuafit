PGDMP  !        	            }            postgres    17.4     17.5 (Ubuntu 17.5-1.pgdg22.04+1) �    .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            1           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE postgres;
                     postgres    false            2           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    3889            3           0    0    DATABASE postgres    ACL     2   GRANT ALL ON DATABASE postgres TO dashboard_user;
                        postgres    false    3889            4           0    0    postgres    DATABASE PROPERTIES     >   ALTER DATABASE postgres SET "app.settings.jwt_exp" TO '3600';
                          postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            5           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    13            6           0    0    SCHEMA public    ACL     �   GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
                        pg_database_owner    false    13            �           1247    17555 
   dia_semana    TYPE     �   CREATE TYPE public.dia_semana AS ENUM (
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
);
    DROP TYPE public.dia_semana;
       public               postgres    false    13                       1259    17309 
   acudientes    TABLE     i  CREATE TABLE public.acudientes (
    id integer NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    tipo_documento character varying(10) NOT NULL,
    documento_identidad character varying(50) NOT NULL,
    telefono character varying(20),
    email character varying(100),
    rut character varying(100)
);
    DROP TABLE public.acudientes;
       public         heap r       postgres    false    13            7           0    0    TABLE acudientes    ACL     �   GRANT ALL ON TABLE public.acudientes TO anon;
GRANT ALL ON TABLE public.acudientes TO authenticated;
GRANT ALL ON TABLE public.acudientes TO service_role;
          public               postgres    false    277                       1259    17308    acudientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.acudientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.acudientes_id_seq;
       public               postgres    false    13    277            8           0    0    acudientes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.acudientes_id_seq OWNED BY public.acudientes.id;
          public               postgres    false    276            9           0    0    SEQUENCE acudientes_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.acudientes_id_seq TO anon;
GRANT ALL ON SEQUENCE public.acudientes_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.acudientes_id_seq TO service_role;
          public               postgres    false    276                       1259    17324    cache    TABLE     �   CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache;
       public         heap r       postgres    false    13            :           0    0    TABLE cache    ACL     �   GRANT ALL ON TABLE public.cache TO anon;
GRANT ALL ON TABLE public.cache TO authenticated;
GRANT ALL ON TABLE public.cache TO service_role;
          public               postgres    false    279                       1259    17317    cache_locks    TABLE     �   CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache_locks;
       public         heap r       postgres    false    13            ;           0    0    TABLE cache_locks    ACL     �   GRANT ALL ON TABLE public.cache_locks TO anon;
GRANT ALL ON TABLE public.cache_locks TO authenticated;
GRANT ALL ON TABLE public.cache_locks TO service_role;
          public               postgres    false    278            6           1259    17632 
   categorias    TABLE     g   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap r       postgres    false    13            <           0    0    TABLE categorias    ACL     �   GRANT ALL ON TABLE public.categorias TO anon;
GRANT ALL ON TABLE public.categorias TO authenticated;
GRANT ALL ON TABLE public.categorias TO service_role;
          public               postgres    false    310            5           1259    17631    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public               postgres    false    310    13            =           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public               postgres    false    309            >           0    0    SEQUENCE categorias_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.categorias_id_seq TO anon;
GRANT ALL ON SEQUENCE public.categorias_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.categorias_id_seq TO service_role;
          public               postgres    false    309                       1259    17270    dias_semana    TABLE     h   CREATE TABLE public.dias_semana (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL
);
    DROP TABLE public.dias_semana;
       public         heap r       postgres    false    13            ?           0    0    TABLE dias_semana    ACL     �   GRANT ALL ON TABLE public.dias_semana TO anon;
GRANT ALL ON TABLE public.dias_semana TO authenticated;
GRANT ALL ON TABLE public.dias_semana TO service_role;
          public               postgres    false    273                       1259    17269    dias_semana_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dias_semana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dias_semana_id_seq;
       public               postgres    false    273    13            @           0    0    dias_semana_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dias_semana_id_seq OWNED BY public.dias_semana.id;
          public               postgres    false    272            A           0    0    SEQUENCE dias_semana_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.dias_semana_id_seq TO anon;
GRANT ALL ON SEQUENCE public.dias_semana_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.dias_semana_id_seq TO service_role;
          public               postgres    false    272                       1259    17332    estudiantes    TABLE     q  CREATE TABLE public.estudiantes (
    id integer NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    tipo_documento character varying(10) NOT NULL,
    edad integer NOT NULL,
    documento_identidad character varying(50) NOT NULL,
    acudiente_id integer,
    fecha_inscripcion date NOT NULL,
    correo character varying(100),
    direccion character varying(255),
    telefono character varying(20),
    rut character varying(100),
    autoriza_uso_imagen boolean DEFAULT false NOT NULL,
    acepta_reglamento boolean DEFAULT false NOT NULL,
    observaciones text
);
    DROP TABLE public.estudiantes;
       public         heap r       postgres    false    13            B           0    0    TABLE estudiantes    ACL     �   GRANT ALL ON TABLE public.estudiantes TO anon;
GRANT ALL ON TABLE public.estudiantes TO authenticated;
GRANT ALL ON TABLE public.estudiantes TO service_role;
          public               postgres    false    281                       1259    17331    estudiantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estudiantes_id_seq;
       public               postgres    false    281    13            C           0    0    estudiantes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estudiantes_id_seq OWNED BY public.estudiantes.id;
          public               postgres    false    280            D           0    0    SEQUENCE estudiantes_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.estudiantes_id_seq TO anon;
GRANT ALL ON SEQUENCE public.estudiantes_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.estudiantes_id_seq TO service_role;
          public               postgres    false    280                       1259    17348    facturas    TABLE     �  CREATE TABLE public.facturas (
    id integer NOT NULL,
    estudiante_id integer NOT NULL,
    pagado_por character varying(25) NOT NULL,
    tipo_documento_pagador character varying(25) NOT NULL,
    documento_pagador character varying(50) NOT NULL,
    correo_pagador character varying(100),
    direccion_pagador character varying(255),
    celular_pagador character varying(20),
    concepto character varying(25) NOT NULL,
    categoria_pago character varying(25) NOT NULL,
    valor_curso numeric(10,2) NOT NULL,
    valor_matricula numeric(10,2) DEFAULT '0'::numeric,
    sede_id integer NOT NULL,
    fecha_limite_exoneracion date,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.facturas;
       public         heap r       postgres    false    13            E           0    0    TABLE facturas    ACL     �   GRANT ALL ON TABLE public.facturas TO anon;
GRANT ALL ON TABLE public.facturas TO authenticated;
GRANT ALL ON TABLE public.facturas TO service_role;
          public               postgres    false    283                       1259    17347    facturas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.facturas_id_seq;
       public               postgres    false    13    283            F           0    0    facturas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;
          public               postgres    false    282            G           0    0    SEQUENCE facturas_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.facturas_id_seq TO anon;
GRANT ALL ON SEQUENCE public.facturas_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.facturas_id_seq TO service_role;
          public               postgres    false    282                       1259    17361    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap r       postgres    false    13            H           0    0    TABLE failed_jobs    ACL     �   GRANT ALL ON TABLE public.failed_jobs TO anon;
GRANT ALL ON TABLE public.failed_jobs TO authenticated;
GRANT ALL ON TABLE public.failed_jobs TO service_role;
          public               postgres    false    285                       1259    17360    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public               postgres    false    13    285            I           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public               postgres    false    284            J           0    0    SEQUENCE failed_jobs_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.failed_jobs_id_seq TO anon;
GRANT ALL ON SEQUENCE public.failed_jobs_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.failed_jobs_id_seq TO service_role;
          public               postgres    false    284            8           1259    17641    grupos    TABLE     �   CREATE TABLE public.grupos (
    id integer NOT NULL,
    categoria_id integer NOT NULL,
    sede_id integer NOT NULL,
    horario_id integer NOT NULL
);
    DROP TABLE public.grupos;
       public         heap r       postgres    false    13            K           0    0    TABLE grupos    ACL     �   GRANT ALL ON TABLE public.grupos TO anon;
GRANT ALL ON TABLE public.grupos TO authenticated;
GRANT ALL ON TABLE public.grupos TO service_role;
          public               postgres    false    312            7           1259    17640    grupos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grupos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.grupos_id_seq;
       public               postgres    false    312    13            L           0    0    grupos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.grupos_id_seq OWNED BY public.grupos.id;
          public               postgres    false    311            M           0    0    SEQUENCE grupos_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.grupos_id_seq TO anon;
GRANT ALL ON SEQUENCE public.grupos_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.grupos_id_seq TO service_role;
          public               postgres    false    311            4           1259    17592    horario_dias    TABLE     j   CREATE TABLE public.horario_dias (
    horario_id integer NOT NULL,
    dia public.dia_semana NOT NULL
);
     DROP TABLE public.horario_dias;
       public         heap r       postgres    false    13    1177            N           0    0    TABLE horario_dias    ACL     �   GRANT ALL ON TABLE public.horario_dias TO anon;
GRANT ALL ON TABLE public.horario_dias TO authenticated;
GRANT ALL ON TABLE public.horario_dias TO service_role;
          public               postgres    false    308                       1259    17373    horarios    TABLE     �   CREATE TABLE public.horarios (
    id integer NOT NULL,
    hora_inicio time(0) without time zone NOT NULL,
    hora_fin time(0) without time zone NOT NULL
);
    DROP TABLE public.horarios;
       public         heap r       postgres    false    13            O           0    0    TABLE horarios    ACL     �   GRANT ALL ON TABLE public.horarios TO anon;
GRANT ALL ON TABLE public.horarios TO authenticated;
GRANT ALL ON TABLE public.horarios TO service_role;
          public               postgres    false    287                       1259    17372    horarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.horarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.horarios_id_seq;
       public               postgres    false    287    13            P           0    0    horarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.horarios_id_seq OWNED BY public.horarios.id;
          public               postgres    false    286            Q           0    0    SEQUENCE horarios_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.horarios_id_seq TO anon;
GRANT ALL ON SEQUENCE public.horarios_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.horarios_id_seq TO service_role;
          public               postgres    false    286                        1259    17381    job_batches    TABLE     d  CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);
    DROP TABLE public.job_batches;
       public         heap r       postgres    false    13            R           0    0    TABLE job_batches    ACL     �   GRANT ALL ON TABLE public.job_batches TO anon;
GRANT ALL ON TABLE public.job_batches TO authenticated;
GRANT ALL ON TABLE public.job_batches TO service_role;
          public               postgres    false    288            "           1259    17389    jobs    TABLE     �   CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);
    DROP TABLE public.jobs;
       public         heap r       postgres    false    13            S           0    0 
   TABLE jobs    ACL     �   GRANT ALL ON TABLE public.jobs TO anon;
GRANT ALL ON TABLE public.jobs TO authenticated;
GRANT ALL ON TABLE public.jobs TO service_role;
          public               postgres    false    290            !           1259    17388    jobs_id_seq    SEQUENCE     t   CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.jobs_id_seq;
       public               postgres    false    13    290            T           0    0    jobs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;
          public               postgres    false    289            U           0    0    SEQUENCE jobs_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.jobs_id_seq TO anon;
GRANT ALL ON SEQUENCE public.jobs_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.jobs_id_seq TO service_role;
          public               postgres    false    289                       1259    17302 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap r       postgres    false    13            V           0    0    TABLE migrations    ACL     �   GRANT ALL ON TABLE public.migrations TO anon;
GRANT ALL ON TABLE public.migrations TO authenticated;
GRANT ALL ON TABLE public.migrations TO service_role;
          public               postgres    false    275                       1259    17301    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public               postgres    false    13    275            W           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public               postgres    false    274            X           0    0    SEQUENCE migrations_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.migrations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.migrations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.migrations_id_seq TO service_role;
          public               postgres    false    274            #           1259    17398    model_has_permissions    TABLE     �   CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);
 )   DROP TABLE public.model_has_permissions;
       public         heap r       postgres    false    13            Y           0    0    TABLE model_has_permissions    ACL     �   GRANT ALL ON TABLE public.model_has_permissions TO anon;
GRANT ALL ON TABLE public.model_has_permissions TO authenticated;
GRANT ALL ON TABLE public.model_has_permissions TO service_role;
          public               postgres    false    291            $           1259    17404    model_has_roles    TABLE     �   CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);
 #   DROP TABLE public.model_has_roles;
       public         heap r       postgres    false    13            Z           0    0    TABLE model_has_roles    ACL     �   GRANT ALL ON TABLE public.model_has_roles TO anon;
GRANT ALL ON TABLE public.model_has_roles TO authenticated;
GRANT ALL ON TABLE public.model_has_roles TO service_role;
          public               postgres    false    292            &           1259    17411    pagos    TABLE     L  CREATE TABLE public.pagos (
    id integer NOT NULL,
    facturacion_id integer NOT NULL,
    estudiante_id integer NOT NULL,
    monto numeric(10,2) NOT NULL,
    fecha_pago date NOT NULL,
    metodo_pago character varying(25) NOT NULL,
    numero_referencia_pago character varying(100),
    soporte_pago character varying(255)
);
    DROP TABLE public.pagos;
       public         heap r       postgres    false    13            [           0    0    TABLE pagos    ACL     �   GRANT ALL ON TABLE public.pagos TO anon;
GRANT ALL ON TABLE public.pagos TO authenticated;
GRANT ALL ON TABLE public.pagos TO service_role;
          public               postgres    false    294            %           1259    17410    pagos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.pagos_id_seq;
       public               postgres    false    13    294            \           0    0    pagos_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;
          public               postgres    false    293            ]           0    0    SEQUENCE pagos_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.pagos_id_seq TO anon;
GRANT ALL ON SEQUENCE public.pagos_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.pagos_id_seq TO service_role;
          public               postgres    false    293            '           1259    17419    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap r       postgres    false    13            ^           0    0    TABLE password_reset_tokens    ACL     �   GRANT ALL ON TABLE public.password_reset_tokens TO anon;
GRANT ALL ON TABLE public.password_reset_tokens TO authenticated;
GRANT ALL ON TABLE public.password_reset_tokens TO service_role;
          public               postgres    false    295            )           1259    17427    permissions    TABLE     �   CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.permissions;
       public         heap r       postgres    false    13            _           0    0    TABLE permissions    ACL     �   GRANT ALL ON TABLE public.permissions TO anon;
GRANT ALL ON TABLE public.permissions TO authenticated;
GRANT ALL ON TABLE public.permissions TO service_role;
          public               postgres    false    297            (           1259    17426    permissions_id_seq    SEQUENCE     {   CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.permissions_id_seq;
       public               postgres    false    297    13            `           0    0    permissions_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;
          public               postgres    false    296            a           0    0    SEQUENCE permissions_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.permissions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.permissions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.permissions_id_seq TO service_role;
          public               postgres    false    296            +           1259    17438    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap r       postgres    false    13            b           0    0    TABLE personal_access_tokens    ACL     �   GRANT ALL ON TABLE public.personal_access_tokens TO anon;
GRANT ALL ON TABLE public.personal_access_tokens TO authenticated;
GRANT ALL ON TABLE public.personal_access_tokens TO service_role;
          public               postgres    false    299            *           1259    17437    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public               postgres    false    299    13            c           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public               postgres    false    298            d           0    0 &   SEQUENCE personal_access_tokens_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.personal_access_tokens_id_seq TO anon;
GRANT ALL ON SEQUENCE public.personal_access_tokens_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.personal_access_tokens_id_seq TO service_role;
          public               postgres    false    298            ,           1259    17449    role_has_permissions    TABLE     m   CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL
);
 (   DROP TABLE public.role_has_permissions;
       public         heap r       postgres    false    13            e           0    0    TABLE role_has_permissions    ACL     �   GRANT ALL ON TABLE public.role_has_permissions TO anon;
GRANT ALL ON TABLE public.role_has_permissions TO authenticated;
GRANT ALL ON TABLE public.role_has_permissions TO service_role;
          public               postgres    false    300            .           1259    17456    roles    TABLE     �   CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.roles;
       public         heap r       postgres    false    13            f           0    0    TABLE roles    ACL     �   GRANT ALL ON TABLE public.roles TO anon;
GRANT ALL ON TABLE public.roles TO authenticated;
GRANT ALL ON TABLE public.roles TO service_role;
          public               postgres    false    302            -           1259    17455    roles_id_seq    SEQUENCE     u   CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public               postgres    false    13    302            g           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public               postgres    false    301            h           0    0    SEQUENCE roles_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.roles_id_seq TO anon;
GRANT ALL ON SEQUENCE public.roles_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.roles_id_seq TO service_role;
          public               postgres    false    301            0           1259    17467    sedes    TABLE     �   CREATE TABLE public.sedes (
    id integer NOT NULL,
    nombre character varying(100),
    direccion character varying(255)
);
    DROP TABLE public.sedes;
       public         heap r       postgres    false    13            i           0    0    TABLE sedes    ACL     �   GRANT ALL ON TABLE public.sedes TO anon;
GRANT ALL ON TABLE public.sedes TO authenticated;
GRANT ALL ON TABLE public.sedes TO service_role;
          public               postgres    false    304            /           1259    17466    sedes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sedes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.sedes_id_seq;
       public               postgres    false    304    13            j           0    0    sedes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.sedes_id_seq OWNED BY public.sedes.id;
          public               postgres    false    303            k           0    0    SEQUENCE sedes_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.sedes_id_seq TO anon;
GRANT ALL ON SEQUENCE public.sedes_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.sedes_id_seq TO service_role;
          public               postgres    false    303            1           1259    17473    sessions    TABLE     �   CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);
    DROP TABLE public.sessions;
       public         heap r       postgres    false    13            l           0    0    TABLE sessions    ACL     �   GRANT ALL ON TABLE public.sessions TO anon;
GRANT ALL ON TABLE public.sessions TO authenticated;
GRANT ALL ON TABLE public.sessions TO service_role;
          public               postgres    false    305            3           1259    17483    users    TABLE     g  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    google_id character varying(255),
    avatar_url character varying(255),
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100)
);
    DROP TABLE public.users;
       public         heap r       postgres    false    13            m           0    0    TABLE users    ACL     �   GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;
          public               postgres    false    307            2           1259    17482    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    307    13            n           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    306            o           0    0    SEQUENCE users_id_seq    ACL     �   GRANT ALL ON SEQUENCE public.users_id_seq TO anon;
GRANT ALL ON SEQUENCE public.users_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.users_id_seq TO service_role;
          public               postgres    false    306            �           2604    17312    acudientes id    DEFAULT     n   ALTER TABLE ONLY public.acudientes ALTER COLUMN id SET DEFAULT nextval('public.acudientes_id_seq'::regclass);
 <   ALTER TABLE public.acudientes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    276    277    277                       2604    17635    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    310    309    310            �           2604    17273    dias_semana id    DEFAULT     p   ALTER TABLE ONLY public.dias_semana ALTER COLUMN id SET DEFAULT nextval('public.dias_semana_id_seq'::regclass);
 =   ALTER TABLE public.dias_semana ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    272    273    273            �           2604    17335    estudiantes id    DEFAULT     p   ALTER TABLE ONLY public.estudiantes ALTER COLUMN id SET DEFAULT nextval('public.estudiantes_id_seq'::regclass);
 =   ALTER TABLE public.estudiantes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    281    280    281                       2604    17351    facturas id    DEFAULT     j   ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);
 :   ALTER TABLE public.facturas ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    283    282    283                       2604    17364    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    284    285    285                       2604    17644 	   grupos id    DEFAULT     f   ALTER TABLE ONLY public.grupos ALTER COLUMN id SET DEFAULT nextval('public.grupos_id_seq'::regclass);
 8   ALTER TABLE public.grupos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    312    311    312                       2604    17376    horarios id    DEFAULT     j   ALTER TABLE ONLY public.horarios ALTER COLUMN id SET DEFAULT nextval('public.horarios_id_seq'::regclass);
 :   ALTER TABLE public.horarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    286    287    287                       2604    17392    jobs id    DEFAULT     b   ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);
 6   ALTER TABLE public.jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    290    289    290            �           2604    17305    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    274    275    275            	           2604    17414    pagos id    DEFAULT     d   ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);
 7   ALTER TABLE public.pagos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    294    293    294            
           2604    17430    permissions id    DEFAULT     p   ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);
 =   ALTER TABLE public.permissions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    296    297    297                       2604    17441    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    298    299    299                       2604    17459    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    301    302    302                       2604    17470    sedes id    DEFAULT     d   ALTER TABLE ONLY public.sedes ALTER COLUMN id SET DEFAULT nextval('public.sedes_id_seq'::regclass);
 7   ALTER TABLE public.sedes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    304    303    304                       2604    17486    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    306    307    307                      0    17309 
   acudientes 
   TABLE DATA           w   COPY public.acudientes (id, nombres, apellidos, tipo_documento, documento_identidad, telefono, email, rut) FROM stdin;
    public               postgres    false    277   �!      
          0    17324    cache 
   TABLE DATA           7   COPY public.cache (key, value, expiration) FROM stdin;
    public               postgres    false    279   �!      	          0    17317    cache_locks 
   TABLE DATA           =   COPY public.cache_locks (key, owner, expiration) FROM stdin;
    public               postgres    false    278   �!      )          0    17632 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public               postgres    false    310   �!                0    17270    dias_semana 
   TABLE DATA           1   COPY public.dias_semana (id, nombre) FROM stdin;
    public               postgres    false    273   "                0    17332    estudiantes 
   TABLE DATA           �   COPY public.estudiantes (id, nombres, apellidos, tipo_documento, edad, documento_identidad, acudiente_id, fecha_inscripcion, correo, direccion, telefono, rut, autoriza_uso_imagen, acepta_reglamento, observaciones) FROM stdin;
    public               postgres    false    281   ."                0    17348    facturas 
   TABLE DATA             COPY public.facturas (id, estudiante_id, pagado_por, tipo_documento_pagador, documento_pagador, correo_pagador, direccion_pagador, celular_pagador, concepto, categoria_pago, valor_curso, valor_matricula, sede_id, fecha_limite_exoneracion, created_at) FROM stdin;
    public               postgres    false    283   K"                0    17361    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public               postgres    false    285   h"      +          0    17641    grupos 
   TABLE DATA           G   COPY public.grupos (id, categoria_id, sede_id, horario_id) FROM stdin;
    public               postgres    false    312   �"      '          0    17592    horario_dias 
   TABLE DATA           7   COPY public.horario_dias (horario_id, dia) FROM stdin;
    public               postgres    false    308   �"                0    17373    horarios 
   TABLE DATA           =   COPY public.horarios (id, hora_inicio, hora_fin) FROM stdin;
    public               postgres    false    287   �"                0    17381    job_batches 
   TABLE DATA           �   COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
    public               postgres    false    288   �"                0    17389    jobs 
   TABLE DATA           c   COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
    public               postgres    false    290   �"                0    17302 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public               postgres    false    275   #                0    17398    model_has_permissions 
   TABLE DATA           T   COPY public.model_has_permissions (permission_id, model_type, model_id) FROM stdin;
    public               postgres    false    291   �&                0    17404    model_has_roles 
   TABLE DATA           H   COPY public.model_has_roles (role_id, model_type, model_id) FROM stdin;
    public               postgres    false    292   �&                0    17411    pagos 
   TABLE DATA           �   COPY public.pagos (id, facturacion_id, estudiante_id, monto, fecha_pago, metodo_pago, numero_referencia_pago, soporte_pago) FROM stdin;
    public               postgres    false    294   �&                0    17419    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public               postgres    false    295   �&                0    17427    permissions 
   TABLE DATA           S   COPY public.permissions (id, name, guard_name, created_at, updated_at) FROM stdin;
    public               postgres    false    297   '                0    17438    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public               postgres    false    299   +'                0    17449    role_has_permissions 
   TABLE DATA           F   COPY public.role_has_permissions (permission_id, role_id) FROM stdin;
    public               postgres    false    300   H'      !          0    17456    roles 
   TABLE DATA           M   COPY public.roles (id, name, guard_name, created_at, updated_at) FROM stdin;
    public               postgres    false    302   e'      #          0    17467    sedes 
   TABLE DATA           6   COPY public.sedes (id, nombre, direccion) FROM stdin;
    public               postgres    false    304   �'      $          0    17473    sessions 
   TABLE DATA           _   COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
    public               postgres    false    305   �'      &          0    17483    users 
   TABLE DATA           t   COPY public.users (id, name, email, google_id, avatar_url, email_verified_at, password, remember_token) FROM stdin;
    public               postgres    false    307   �'      p           0    0    acudientes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.acudientes_id_seq', 1, false);
          public               postgres    false    276            q           0    0    categorias_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);
          public               postgres    false    309            r           0    0    dias_semana_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.dias_semana_id_seq', 1, false);
          public               postgres    false    272            s           0    0    estudiantes_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.estudiantes_id_seq', 1, false);
          public               postgres    false    280            t           0    0    facturas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.facturas_id_seq', 1, false);
          public               postgres    false    282            u           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public               postgres    false    284            v           0    0    grupos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.grupos_id_seq', 1, false);
          public               postgres    false    311            w           0    0    horarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.horarios_id_seq', 1, false);
          public               postgres    false    286            x           0    0    jobs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);
          public               postgres    false    289            y           0    0    migrations_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.migrations_id_seq', 123, true);
          public               postgres    false    274            z           0    0    pagos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.pagos_id_seq', 1, false);
          public               postgres    false    293            {           0    0    permissions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);
          public               postgres    false    296            |           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public               postgres    false    298            }           0    0    roles_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.roles_id_seq', 1, false);
          public               postgres    false    301            ~           0    0    sedes_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sedes_id_seq', 1, true);
          public               postgres    false    303                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public               postgres    false    306                       2606    17316 (   acudientes acudiente_documento_identidad 
   CONSTRAINT     r   ALTER TABLE ONLY public.acudientes
    ADD CONSTRAINT acudiente_documento_identidad UNIQUE (documento_identidad);
 R   ALTER TABLE ONLY public.acudientes DROP CONSTRAINT acudiente_documento_identidad;
       public                 postgres    false    277                       2606    17314    acudientes acudientes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.acudientes
    ADD CONSTRAINT acudientes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.acudientes DROP CONSTRAINT acudientes_pkey;
       public                 postgres    false    277                       2606    17323    cache_locks cache_locks_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);
 F   ALTER TABLE ONLY public.cache_locks DROP CONSTRAINT cache_locks_pkey;
       public                 postgres    false    278                       2606    17330    cache cache_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);
 :   ALTER TABLE ONLY public.cache DROP CONSTRAINT cache_pkey;
       public                 postgres    false    279            \           2606    17639     categorias categorias_nombre_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);
 J   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_nombre_key;
       public                 postgres    false    310            ^           2606    17637    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public                 postgres    false    310                       2606    17277 "   dias_semana dias_semana_nombre_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.dias_semana
    ADD CONSTRAINT dias_semana_nombre_key UNIQUE (nombre);
 L   ALTER TABLE ONLY public.dias_semana DROP CONSTRAINT dias_semana_nombre_key;
       public                 postgres    false    273                       2606    17275    dias_semana dias_semana_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.dias_semana
    ADD CONSTRAINT dias_semana_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.dias_semana DROP CONSTRAINT dias_semana_pkey;
       public                 postgres    false    273            !           2606    17343 *   estudiantes estudiante_documento_identidad 
   CONSTRAINT     t   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiante_documento_identidad UNIQUE (documento_identidad);
 T   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiante_documento_identidad;
       public                 postgres    false    281            #           2606    17341    estudiantes estudiantes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_pkey;
       public                 postgres    false    281            '           2606    17357    facturas facturas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_pkey;
       public                 postgres    false    283            )           2606    17369    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public                 postgres    false    285            +           2606    17371 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public                 postgres    false    285            `           2606    17646    grupos grupos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_pkey;
       public                 postgres    false    312            Z           2606    17596    horario_dias horario_dias_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.horario_dias
    ADD CONSTRAINT horario_dias_pkey PRIMARY KEY (horario_id, dia);
 H   ALTER TABLE ONLY public.horario_dias DROP CONSTRAINT horario_dias_pkey;
       public                 postgres    false    308    308            -           2606    17379    horarios horarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.horarios DROP CONSTRAINT horarios_pkey;
       public                 postgres    false    287            /           2606    17387    job_batches job_batches_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.job_batches DROP CONSTRAINT job_batches_pkey;
       public                 postgres    false    288            1           2606    17396    jobs jobs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.jobs DROP CONSTRAINT jobs_pkey;
       public                 postgres    false    290                       2606    17307    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public                 postgres    false    275            5           2606    17403 0   model_has_permissions model_has_permissions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type);
 Z   ALTER TABLE ONLY public.model_has_permissions DROP CONSTRAINT model_has_permissions_pkey;
       public                 postgres    false    291    291    291            8           2606    17409 $   model_has_roles model_has_roles_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type);
 N   ALTER TABLE ONLY public.model_has_roles DROP CONSTRAINT model_has_roles_pkey;
       public                 postgres    false    292    292    292            <           2606    17416    pagos pagos_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_pkey;
       public                 postgres    false    294            >           2606    17425 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public                 postgres    false    295            @           2606    17436 .   permissions permissions_name_guard_name_unique 
   CONSTRAINT     u   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name);
 X   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_name_guard_name_unique;
       public                 postgres    false    297    297            B           2606    17434    permissions permissions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
       public                 postgres    false    297            D           2606    17445 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public                 postgres    false    299            F           2606    17448 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public                 postgres    false    299            I           2606    17453 .   role_has_permissions role_has_permissions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id);
 X   ALTER TABLE ONLY public.role_has_permissions DROP CONSTRAINT role_has_permissions_pkey;
       public                 postgres    false    300    300            L           2606    17465 "   roles roles_name_guard_name_unique 
   CONSTRAINT     i   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name);
 L   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_name_guard_name_unique;
       public                 postgres    false    302    302            N           2606    17463    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public                 postgres    false    302            P           2606    17472    sedes sedes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sedes
    ADD CONSTRAINT sedes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sedes DROP CONSTRAINT sedes_pkey;
       public                 postgres    false    304            S           2606    17479    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public                 postgres    false    305            V           2606    17492    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public                 postgres    false    307            X           2606    17490    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    307                       1259    17344    estudiante_acudiente_id    INDEX     W   CREATE INDEX estudiante_acudiente_id ON public.estudiantes USING btree (acudiente_id);
 +   DROP INDEX public.estudiante_acudiente_id;
       public                 postgres    false    281            $           1259    17358    factura_estudiante_id    INDEX     S   CREATE INDEX factura_estudiante_id ON public.facturas USING btree (estudiante_id);
 )   DROP INDEX public.factura_estudiante_id;
       public                 postgres    false    283            %           1259    17359    factura_sede_id    INDEX     G   CREATE INDEX factura_sede_id ON public.facturas USING btree (sede_id);
 #   DROP INDEX public.factura_sede_id;
       public                 postgres    false    283            9           1259    17417    fk_pagos_facturacion    INDEX     P   CREATE INDEX fk_pagos_facturacion ON public.pagos USING btree (facturacion_id);
 (   DROP INDEX public.fk_pagos_facturacion;
       public                 postgres    false    294            2           1259    17397    jobs_queue_index    INDEX     B   CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);
 $   DROP INDEX public.jobs_queue_index;
       public                 postgres    false    290            3           1259    17401 /   model_has_permissions_model_id_model_type_index    INDEX     �   CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);
 C   DROP INDEX public.model_has_permissions_model_id_model_type_index;
       public                 postgres    false    291    291            6           1259    17407 )   model_has_roles_model_id_model_type_index    INDEX     u   CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);
 =   DROP INDEX public.model_has_roles_model_id_model_type_index;
       public                 postgres    false    292    292            :           1259    17418    pagos_estudiante_id    INDEX     N   CREATE INDEX pagos_estudiante_id ON public.pagos USING btree (estudiante_id);
 '   DROP INDEX public.pagos_estudiante_id;
       public                 postgres    false    294            G           1259    17446 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public                 postgres    false    299    299            J           1259    17454 $   role_has_permissions_role_id_foreign    INDEX     h   CREATE INDEX role_has_permissions_role_id_foreign ON public.role_has_permissions USING btree (role_id);
 8   DROP INDEX public.role_has_permissions_role_id_foreign;
       public                 postgres    false    300            Q           1259    17481    sessions_last_activity_index    INDEX     Z   CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);
 0   DROP INDEX public.sessions_last_activity_index;
       public                 postgres    false    305            T           1259    17480    sessions_user_id_index    INDEX     N   CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);
 *   DROP INDEX public.sessions_user_id_index;
       public                 postgres    false    305            a           2606    17493    estudiantes estudiantes_ibfk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_ibfk_1 FOREIGN KEY (acudiente_id) REFERENCES public.acudientes(id) ON UPDATE RESTRICT ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_ibfk_1;
       public               postgres    false    277    3610    281            b           2606    17508    facturas facturas_ibfk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_ibfk_1 FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_ibfk_1;
       public               postgres    false    283    281    3619            c           2606    17513    facturas facturas_ibfk_2    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_ibfk_2 FOREIGN KEY (sede_id) REFERENCES public.sedes(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_ibfk_2;
       public               postgres    false    304    3664    283            f           2606    17533    pagos fk_pagos_facturacion    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT fk_pagos_facturacion FOREIGN KEY (facturacion_id) REFERENCES public.facturas(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.pagos DROP CONSTRAINT fk_pagos_facturacion;
       public               postgres    false    283    294    3623            k           2606    17647    grupos grupos_categoria_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);
 I   ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_categoria_id_fkey;
       public               postgres    false    312    310    3678            l           2606    17657    grupos grupos_horario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES public.horarios(id);
 G   ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_horario_id_fkey;
       public               postgres    false    312    3629    287            m           2606    17652    grupos grupos_sede_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_sede_id_fkey FOREIGN KEY (sede_id) REFERENCES public.sedes(id);
 D   ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_sede_id_fkey;
       public               postgres    false    304    3664    312            j           2606    17597 )   horario_dias horario_dias_horario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.horario_dias
    ADD CONSTRAINT horario_dias_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES public.horarios(id);
 S   ALTER TABLE ONLY public.horario_dias DROP CONSTRAINT horario_dias_horario_id_fkey;
       public               postgres    false    287    3629    308            d           2606    17523 A   model_has_permissions model_has_permissions_permission_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 k   ALTER TABLE ONLY public.model_has_permissions DROP CONSTRAINT model_has_permissions_permission_id_foreign;
       public               postgres    false    291    297    3650            e           2606    17528 /   model_has_roles model_has_roles_role_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.model_has_roles DROP CONSTRAINT model_has_roles_role_id_foreign;
       public               postgres    false    302    3662    292            g           2606    17538    pagos pagos_ibfk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_ibfk_1 FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_ibfk_1;
       public               postgres    false    294    3619    281            h           2606    17543 ?   role_has_permissions role_has_permissions_permission_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.role_has_permissions DROP CONSTRAINT role_has_permissions_permission_id_foreign;
       public               postgres    false    300    3650    297            i           2606    17548 9   role_has_permissions role_has_permissions_role_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.role_has_permissions DROP CONSTRAINT role_has_permissions_role_id_foreign;
       public               postgres    false    302    300    3662            Q	           826    16488     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
          public               postgres    false    13            R	           826    16489     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
          public               supabase_admin    false    13            P	           826    16487     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;
          public               postgres    false    13            T	           826    16491     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;
          public               supabase_admin    false    13            O	           826    16486    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     y  ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;
          public               postgres    false    13            S	           826    16490    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     �  ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;
          public               supabase_admin    false    13                  x������ � �      
      x������ � �      	      x������ � �      )      x������ � �            x������ � �            x������ � �            x������ � �            x������ � �      +      x������ � �      '      x������ � �            x������ � �            x������ � �            x������ � �         t  x����n�0D���)��u� �q�8�!�(��eЋ�]��O~��E��Xc[ozO��Yk�i�a�>��%�ָ�5�^�5VW���=��t���=�?�Q�eM���hu�[8��9l�i/�8���&�u��4��2m�Aצ3�kX�7���MGF~Nc���t�{�?/�r�n���q��5{*L��]� �{X���<�9.q�����|�� ��~�n��y��"�
������ y�� �%�� _"{ �?�t�M)1�>����x9��G���b�ݱ�w�,�d%��S�J�u'�����;�$ge8����2u��bC��S?���N��O�̞2�*'=!���|	�����K���p����e ����Y��Eb�9O�Nן��}ʤ�.���?��o @Y���ca�#�Z��h�:%' [oP� �yi�`Ek���q��1\�d�A���go����4-@��"��|-�R`&��Z$�୘ES[�_q�����v�YPܸ����1%�V�C9�,M+¢�`8�"Ht8��Kӑ./���{�ri�ҋ�鎺��4]��ka�:]/���H,��t=�x�ti5�= *��8kK���{@ש`�� nY�`�K���{ �;K���`_���/�f ��� {�4�L�<�4筙ES�_s����vr�Y�ܸ���1%u��P���h6Nǃԧ}i�R&/���(	e�4���Ћ�q<2���4�G%����x82�ȯ�(�ri)��2N�sδ�\�L�ؐHkkC�e�Lq�� �Z�� �ey� �xr� �ջ��3:D�>,6H{o"P��/���\"	����I�u��.�LB�ʋI2uc��V��n�i��	�;��2)�X���M����[�4�HF�Z            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �      !      x������ � �      #      x�3�tN,.���I������� 7�      $      x������ � �      &   k   x�3��L*J����̄�Ɇ�鹉�9z����1~P�bT�bh��l�����`������e��[h�����hb�Rj��gRj��WQP������ T$ �     