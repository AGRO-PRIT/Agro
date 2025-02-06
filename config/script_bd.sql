-- ainda n tem nada... ;( 
-- mas aqui ficara os codigos sql das tabelas quando finalizarmos

-- exemplo:

--  CREATE TABLE `produtos` (
-- 	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
-- 	`nomeProduto` VARCHAR(255),
-- 	`descricao` TEXT(65535),
-- 	`preco` DOUBLE,
-- 	`categorias_id` INT,
-- 	`fornecedor_id` INT,
-- 	PRIMARY KEY(`id`)
-- );


-- CREATE TABLE `categorias` (
-- 	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
-- 	`nomeCategoria` VARCHAR(255),
-- 	PRIMARY KEY(`id`)
-- );


-- CREATE TABLE `pedidos` (
-- 	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
-- 	`dataPedido` DATETIME,
-- 	`cliente_id` INT,
-- 	`quantidade` INT,
-- 	`statusPedido` ENUM("delivered", "received", "processing"),
-- 	`produto_id` INT,
-- 	PRIMARY KEY(`id`)
-- );

-- e assim vai seguindo