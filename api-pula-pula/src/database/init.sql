-- Força a remoção para garantir uma instalação limpa
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS produtos CASCADE;

-- 1. Criação da tabela de Usuários (Clientes) - tudo minúsculo forçado
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Criação da tabela de Produtos (Brinquedos para alugar)
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco_por_hora DECIMAL(10, 2) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Função que valida os dados do usuário antes de salvar
CREATE OR REPLACE FUNCTION valida_dados_usuario()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(TRIM(NEW.nome)) < 3 THEN
        RAISE EXCEPTION '❌ Erro de validação: O nome do usuário deve ter pelo menos 3 caracteres!';
    END IF;

    IF NEW.email !~* '^[A-Za-ñ0-9._%+-]+@[A-Za-ñ0-9.-]+\.[A-Z]{2,}$' THEN
        RAISE EXCEPTION '❌ Erro de validação: O formato do e-mail é inválido!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de usuários
CREATE TRIGGER trigger_valida_usuario
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION valida_dados_usuario();

-- 4. Função que valida o preço do produto antes de salvar
CREATE OR REPLACE FUNCTION valida_preco_produto()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.preco_por_hora <= 0 THEN
        RAISE EXCEPTION '❌ Erro de validação: O preço por hora deve ser maior que zero!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de produtos
CREATE TRIGGER trigger_valida_preco
BEFORE INSERT OR UPDATE ON produtos
FOR EACH ROW
EXECUTE FUNCTION valida_preco_produto();